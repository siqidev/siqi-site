import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneHandle = {
    dispose: () => void;
};

// 阿頼耶識アーキの聖龕模型（正本: siqi/projects/project-006/alaya-sanctum.html）
// 核=金の十二面体（不動・無配線）／種子層=八面体格子の輝点／履歴=十二面体の稜を渡る閉じない螺旋階段／
// 現在相=外殻の一部が毎ターン別方位に凝って消える。12秒で1ターンが光として巡る。
const COL = {
    gold: 0xb8a46a,
    chain: 0x6f9fb1,
    amber: 0xa89058,
    green: 0x78d8a4,
    white: 0xeafff2,
};

type LabelDef = {
    text: string;
    color: string;
    dx: number;
    dy: number;
    anchor: () => THREE.Vector3;
};

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));
const P = (t: number, a: number, b: number): number => clamp01((t - a) / (b - a));
const ease = (x: number): number => x * x * (3 - 2 * x);
const breath = (p: number): number => (p <= 0 || p >= 1 ? 0 : Math.sin(p * Math.PI));

type ShellData = {
    base: THREE.Color;
    baseLevel: number;
    dirs: THREE.Vector3[];
};

type ShellWave = { dir: THREE.Vector3; radius: number; width: number; amt: number };

type ShellPaintOpts = {
    waves?: ShellWave[];
    locusDir?: THREE.Vector3 | null;
    locusAmt?: number;
    breathAmt?: number;
};

function disposeObject(object: THREE.Object3D): void {
    object.traverse((item) => {
        const mesh = item as THREE.Mesh | THREE.Line | THREE.LineSegments | THREE.Points | THREE.Sprite;
        if ("geometry" in mesh && mesh.geometry) {
            mesh.geometry.dispose();
        }
        if ("material" in mesh && mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => material.dispose());
        }
    });
}

function buildSanctumScene(container: HTMLDivElement, labelSvg: SVGSVGElement): SceneHandle {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.dataset.testid = "alaya-architecture-canvas";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(3.4, 2.1, 6.2);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // 核（不動・無配線）
    group.add(
        new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(0.3, 0)),
            new THREE.LineBasicMaterial({
                color: COL.gold,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        ),
    );
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = 64;
    haloCanvas.height = 64;
    const haloCtx = haloCanvas.getContext("2d");
    if (haloCtx) {
        const grd = haloCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
        grd.addColorStop(0, "rgba(246,238,214,.95)");
        grd.addColorStop(1, "rgba(246,238,214,0)");
        haloCtx.fillStyle = grd;
        haloCtx.fillRect(0, 0, 64, 64);
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const coreHalo = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: haloTex,
            transparent: true,
            opacity: 0.75,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        }),
    );
    coreHalo.scale.setScalar(0.5);
    group.add(coreHalo);

    // 頂点色ワイヤ殻（流れ＝格子自身の明るさの波）
    const glowShell = (geo: THREE.BufferGeometry, baseColor: number, baseLevel: number): THREE.LineSegments => {
        const edges = new THREE.EdgesGeometry(geo);
        geo.dispose();
        const pos = edges.attributes.position;
        edges.setAttribute("color", new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3));
        const mesh = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 1,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        );
        const dirs: THREE.Vector3[] = [];
        for (let i = 0; i < pos.count; i += 1) {
            dirs.push(new THREE.Vector3().fromBufferAttribute(pos, i).normalize());
        }
        mesh.userData = { base: new THREE.Color(baseColor), baseLevel, dirs } satisfies ShellData;
        group.add(mesh);
        return mesh;
    };
    const paintShell = (mesh: THREE.LineSegments, opts: ShellPaintOpts): void => {
        const { base, baseLevel, dirs } = mesh.userData as ShellData;
        const colors = mesh.geometry.attributes.color as THREE.BufferAttribute;
        const inv = new THREE.Quaternion().setFromEuler(mesh.rotation).invert();
        const locus = opts.locusDir ? opts.locusDir.clone().applyQuaternion(inv) : null;
        const waves = (opts.waves ?? []).map((w) => ({ ...w, d: w.dir.clone().applyQuaternion(inv) }));
        for (let i = 0; i < dirs.length; i += 1) {
            let level = baseLevel + (opts.breathAmt ?? 0);
            if (locus && (opts.locusAmt ?? 0) > 0) {
                level += (opts.locusAmt ?? 0) * Math.pow(Math.max(dirs[i].dot(locus), 0), 14);
            }
            for (const w of waves) {
                if (w.amt <= 0) continue;
                const ang = Math.acos(Math.max(-1, Math.min(1, dirs[i].dot(w.d))));
                level += w.amt * Math.exp(-Math.pow((ang - w.radius) / w.width, 2));
            }
            colors.setXYZ(i, base.r * level, base.g * level, base.b * level);
        }
        colors.needsUpdate = true;
    };
    const seedShell = glowShell(new THREE.OctahedronGeometry(0.82, 1), COL.amber, 0.3);
    seedShell.rotation.set(0.2, 0, 0.1);
    const midShell = glowShell(new THREE.IcosahedronGeometry(1.86, 0), COL.chain, 0.2);
    midShell.rotation.set(0, 0.1, 0);
    const outerShell = glowShell(new THREE.IcosahedronGeometry(2.28, 1), COL.green, 0.13);
    outerShell.rotation.set(0.1, -0.18, 0.22);
    const baseZ = { outer: outerShell.rotation.z, seed: seedShell.rotation.z };

    // 種子輝点（二車線＝輝度差のみ）
    const glint = (dir: THREE.Vector3, color: number, opacity: number, scale: number): THREE.Sprite => {
        const s = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: haloTex,
                color,
                transparent: true,
                opacity,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            }),
        );
        s.position.copy(dir.clone().normalize().multiplyScalar(0.82));
        s.scale.setScalar(scale);
        seedShell.add(s);
        return s;
    };
    const audSeeds = [
        [0.5, 0.7, 0.4],
        [-0.55, 0.6, 0.35],
        [0.15, 0.75, -0.5],
        [0.6, -0.4, 0.5],
        [-0.4, -0.15, -0.72],
    ].map((v) => glint(new THREE.Vector3(v[0], v[1], v[2]), COL.amber, 0.7, 0.26));
    [
        [0.7, 0.2, -0.3],
        [-0.3, 0.4, 0.66],
        [0.1, -0.72, -0.3],
        [-0.6, -0.5, 0.2],
    ].forEach((v) => glint(new THREE.Vector3(v[0], v[1], v[2]), COL.chain, 0.2, 0.17));
    const freshSeed = glint(new THREE.Vector3(0.3, 0.62, 0.55), COL.amber, 0, 0.26);
    const derivedSeed = glint(new THREE.Vector3(0.05, 0.1, 0.9), COL.amber, 0, 0.3);

    // 現在相の凝り面（外殻の実在面・毎ターン別方位）
    const icoGeo = new THREE.IcosahedronGeometry(2.28, 1);
    const posA = icoGeo.attributes.position;
    const faces: { a: THREE.Vector3; b: THREE.Vector3; c: THREE.Vector3; cen: THREE.Vector3 }[] = [];
    for (let i = 0; i < posA.count; i += 3) {
        const a = new THREE.Vector3().fromBufferAttribute(posA, i);
        const b = new THREE.Vector3().fromBufferAttribute(posA, i + 1);
        const c = new THREE.Vector3().fromBufferAttribute(posA, i + 2);
        faces.push({ a, b, c, cen: a.clone().add(b).add(c).divideScalar(3) });
    }
    icoGeo.dispose();
    type FaceGroup = {
        grp: THREE.Group;
        outline: THREE.Line;
        inner: THREE.Line;
        fill: THREE.Mesh;
        center: THREE.Vector3;
    };
    const facePool: FaceGroup[] = [];
    for (let i = 0; i < 6; i += 1) {
        const grp = new THREE.Group();
        const mkLine = (): THREE.Line =>
            new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                    new THREE.Vector3(),
                ]),
                new THREE.LineBasicMaterial({
                    color: COL.green,
                    transparent: true,
                    opacity: 0,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                }),
            );
        const outline = mkLine();
        const inner = mkLine();
        // 凝り面の視認性を上げる薄い面色（現在相だけがわずかに「面」を持つ）
        const fill = new THREE.Mesh(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
            new THREE.MeshBasicMaterial({
                color: COL.green,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        );
        grp.add(outline, inner, fill);
        group.add(grp);
        facePool.push({ grp, outline, inner, fill, center: new THREE.Vector3(2.28, 0, 0) });
    }
    const echoLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
        ]),
        new THREE.LineBasicMaterial({
            color: COL.green,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        }),
    );
    group.add(echoLine);
    const lociY = [0.5, -0.3, 0.15, -0.55, 0.4, 0.0, -0.2, 0.6];
    const loci = lociY.map((y, i) => {
        const a = (i / lociY.length) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a), y, Math.sin(a)).normalize();
    });
    let currentLocus = loci[0];
    const setLocus = (cycle: number): void => {
        currentLocus = loci[cycle % loci.length];
        const rot = new THREE.Quaternion().setFromEuler(outerShell.rotation);
        const scored = faces
            .map((f) => ({ f, d: f.cen.clone().normalize().applyQuaternion(rot).dot(currentLocus) }))
            .sort((x, y) => y.d - x.d)
            .slice(0, 6);
        scored.forEach(({ f }, i) => {
            const fg = facePool[i];
            const mid = (u: THREE.Vector3, v: THREE.Vector3): THREE.Vector3 => u.clone().add(v).multiplyScalar(0.5);
            fg.outline.geometry.setFromPoints([f.a, f.b, f.c, f.a]);
            fg.inner.geometry.setFromPoints([mid(f.a, f.b), mid(f.b, f.c), mid(f.c, f.a), mid(f.a, f.b)]);
            fg.fill.geometry.setFromPoints([f.a, f.b, f.c]);
            fg.grp.rotation.copy(outerShell.rotation);
            fg.center = f.cen.clone().applyEuler(outerShell.rotation);
            fg.grp.position.set(0, 0, 0);
        });
    };
    setLocus(0);
    const faceOpacity = (k: number, flash: number): void =>
        facePool.forEach((fg, i) => {
            const kk = clamp01(k * 6 - i * 0.6);
            (fg.outline.material as THREE.LineBasicMaterial).opacity = 0.85 * kk + flash;
            (fg.inner.material as THREE.LineBasicMaterial).opacity = 0.42 * kk + flash * 0.7;
            (fg.fill.material as THREE.MeshBasicMaterial).opacity = 0.12 * kk + flash * 0.16;
            (fg.outline.material as THREE.LineBasicMaterial).color.setHex(flash > 0.4 ? COL.white : COL.green);
            (fg.inner.material as THREE.LineBasicMaterial).color.setHex(flash > 0.4 ? COL.white : COL.green);
            (fg.fill.material as THREE.MeshBasicMaterial).color.setHex(flash > 0.4 ? COL.white : COL.green);
        });

    // 履歴＝多面体螺旋階段: 十二面体の実在の稜だけを渡り、閉環直前に一段外の相似層へずれる
    const buildStairHistory = (): THREE.Vector3[] => {
        const PHI = (1 + Math.sqrt(5)) / 2;
        const raw: number[][] = [];
        for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) raw.push([x, y, z]);
        for (const a of [-1, 1]) {
            for (const b of [-1, 1]) {
                raw.push([0, a / PHI, b * PHI]);
                raw.push([a / PHI, b * PHI, 0]);
                raw.push([a * PHI, 0, b / PHI]);
            }
        }
        const verts = raw.map((v) => new THREE.Vector3(v[0], v[1], v[2]).normalize());
        const adj: number[][] = verts.map(() => []);
        const EDGE = 2 / PHI / Math.sqrt(3) + 0.02;
        for (let i = 0; i < 20; i += 1) {
            for (let j = i + 1; j < 20; j += 1) {
                if (verts[i].distanceTo(verts[j]) < EDGE) {
                    adj[i].push(j);
                    adj[j].push(i);
                }
            }
        }
        const RADII = [1.28, 1.36, 1.44, 1.52];
        const pts: THREE.Vector3[] = [];
        let vi = 0;
        for (const r of RADII) {
            const visited = new Set([vi]);
            pts.push(verts[vi].clone().multiplyScalar(r));
            for (let s = 0; s < 9; s += 1) {
                const cands = adj[vi].filter((n) => !visited.has(n));
                if (!cands.length) break;
                cands.sort((a, b) => verts[b].distanceTo(verts[0]) - verts[a].distanceTo(verts[0]) || a - b);
                vi = cands[0];
                visited.add(vi);
                pts.push(verts[vi].clone().multiplyScalar(r));
            }
        }
        pts.push(verts[adj[vi][0]].clone().multiplyScalar(RADII[RADII.length - 1]));
        return pts;
    };
    const histPts = buildStairHistory();
    const histN = histPts.length;
    const histGeo = new THREE.BufferGeometry().setFromPoints(histPts);
    histGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(histN * 3), 3));
    const histLine = new THREE.Line(
        histGeo,
        new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        }),
    );
    group.add(histLine);
    const paintHist = (appendK: number, runK: number): void => {
        const colors = histGeo.attributes.color as THREE.BufferAttribute;
        for (let i = 0; i < histN; i += 1) {
            const s = i / (histN - 1);
            let k = s < 0.15 ? 0.05 + (s / 0.15) * 0.3 : 0.35 + 0.55 * Math.pow((s - 0.15) / 0.85, 1.3);
            if (i >= histN - 3) k += 0.25;
            const c = new THREE.Color(COL.chain).multiplyScalar(k);
            if (runK >= 0) {
                c.lerp(new THREE.Color(COL.white), clamp01(Math.exp(-Math.pow(s - runK, 2) / 0.002)));
            }
            colors.setXYZ(i, c.r, c.g, c.b);
        }
        colors.needsUpdate = true;
        histGeo.setDrawRange(0, histN - 1 + Math.round(appendK));
    };
    paintHist(0, -1);
    const histTip = histPts[histN - 2];

    // 光脈の道（上昇・薫習だけ一時的に灯る＝常設配線なし）
    const mkPath = (color: number): THREE.Line => {
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
            new THREE.LineBasicMaterial({
                color,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        );
        group.add(line);
        return line;
    };
    const returnPath = mkPath(COL.white);
    const imprintPath = mkPath(COL.amber);

    // HUDラベル（引き出し線＋英語名称・画面オーバーレイ）
    const svgNS = "http://www.w3.org/2000/svg";
    const labelDefs: LabelDef[] = [
        {
            text: "EXISTENCE CORE",
            color: "#b8a46a",
            dx: -0.2,
            dy: -0.14,
            anchor: () => new THREE.Vector3(0, 0.22, 0).applyMatrix4(group.matrixWorld),
        },
        {
            text: "SEED STORE",
            color: "#a89058",
            dx: 0.19,
            dy: -0.17,
            anchor: () => audSeeds[0].getWorldPosition(new THREE.Vector3()),
        },
        {
            text: "CAUSAL CHAIN",
            color: "#6f9fb1",
            dx: -0.19,
            dy: 0.16,
            anchor: () => histPts[Math.floor(histN * 0.45)].clone().applyMatrix4(group.matrixWorld),
        },
        {
            text: "PRESENT PHASE",
            color: "#78d8a4",
            dx: 0.18,
            dy: 0.16,
            anchor: () => facePool[0].center.clone().applyMatrix4(group.matrixWorld),
        },
    ];
    const labelNodes = labelDefs.map((def) => {
        const dot = document.createElementNS(svgNS, "circle");
        dot.setAttribute("r", "2");
        dot.setAttribute("fill", def.color);
        dot.setAttribute("fill-opacity", "0.75");
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("stroke", def.color);
        path.setAttribute("stroke-opacity", "0.55");
        path.setAttribute("stroke-width", "1");
        path.setAttribute("fill", "none");
        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("fill", def.color);
        label.setAttribute("fill-opacity", "0.85");
        label.textContent = def.text;
        labelSvg.append(path, dot, label);
        return { def, dot, path, label };
    });
    const updateLabels = (): void => {
        const W = Math.max(1, container.clientWidth);
        const H = Math.max(1, container.clientHeight);
        for (const node of labelNodes) {
            const projected = node.def.anchor().project(camera);
            if (projected.z > 1) {
                node.path.setAttribute("d", "");
                node.label.setAttribute("fill-opacity", "0");
                node.dot.setAttribute("fill-opacity", "0");
                continue;
            }
            const ax = (projected.x * 0.5 + 0.5) * W;
            const ay = (-projected.y * 0.5 + 0.5) * H;
            // ラベルが枠外へ出ないよう内側へクランプ（水平線22px+余白6px+文字約105pxを確保）
            const textRoom = 136;
            let ex = ax + node.def.dx * W;
            ex = node.def.dx > 0 ? Math.min(ex, W - textRoom) : Math.max(ex, textRoom);
            const ey = Math.min(H - 30, Math.max(34, ay + node.def.dy * H));
            const hx = ex + Math.sign(node.def.dx) * 22;
            node.dot.setAttribute("cx", String(ax));
            node.dot.setAttribute("cy", String(ay));
            node.dot.setAttribute("fill-opacity", "0.75");
            node.path.setAttribute("d", `M ${ax} ${ay} L ${ex} ${ey} L ${hx} ${ey}`);
            node.label.setAttribute("x", String(hx + Math.sign(node.def.dx) * 6));
            node.label.setAttribute("y", String(ey + 3.5));
            node.label.setAttribute("text-anchor", node.def.dx > 0 ? "start" : "end");
            node.label.setAttribute("fill-opacity", "0.85");
        }
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = reducedMotion ? 0.25 : 1;
    const CYCLE = 12;
    let lastCycle = -1;
    let frame = 0;
    let disposed = false;

    const resize = (): void => {
        const width = Math.max(1, container.clientWidth);
        const height = Math.max(1, container.clientHeight);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const animate = (): void => {
        if (disposed) return;
        const time = performance.now() * 0.001;
        const t = (time % CYCLE) / CYCLE;
        const cycle = Math.floor(time / CYCLE);
        if (cycle !== lastCycle) {
            lastCycle = cycle;
            setLocus(cycle);
        }
        const l = currentLocus;

        // 殻の運動（位相同期・一撃=完全静止・意図=外殻先行）
        const freeze = t > 0.3 && t < 0.33 ? 0 : 1;
        const syncSeed = 1 + 1.6 * breath(P(t, 0.08, 0.26));
        const lead = 1 + 2.4 * breath(P(t, 0.36, 0.46));
        seedShell.rotation.y += 0.00048 * syncSeed * freeze * motion;
        midShell.rotation.y += 0.0002 * freeze * motion;
        outerShell.rotation.y += 0.00024 * lead * freeze * motion;
        group.rotation.y += 0.00012 * motion;
        outerShell.rotation.z = baseZ.outer + (t < 0.08 ? 0.05 * Math.sin(P(t, 0, 0.08) * Math.PI * 2) * motion : 0);
        seedShell.rotation.z = baseZ.seed + 0.02 * breath(P(t, 0.78, 0.95)) * motion;

        // 光脈（縁→熟す→組立→一撃→下降）
        const readK = P(t, 0.06, 0.2);
        const seedWaves: ShellWave[] = audSeeds.slice(0, 3).map((s, i) => ({
            dir: s.position.clone().normalize().applyEuler(seedShell.rotation),
            radius: ease(P(readK, i * 0.12, 0.7 + i * 0.12)) * 1.4,
            width: 0.3,
            amt: 0.9 * breath(P(readK, i * 0.12, 0.9)),
        }));
        const asm = ease(P(t, 0.2, 0.3)) * (1 - ease(P(t, 0.82, 0.94)));
        const oneCall = breath(P(t, 0.3, 0.36));
        const down = P(t, 0.42, 0.58);
        paintShell(seedShell, { waves: seedWaves, breathAmt: oneCall * 0.3 });
        paintShell(midShell, { breathAmt: breath(P(t, 0.24, 0.32)) * 0.3 + oneCall * 0.3 });
        paintShell(outerShell, {
            waves:
                down > 0 && down < 1
                    ? [{ dir: l, radius: ease(down) * 2.9, width: 0.35, amt: 0.85 * (1 - down * 0.5) }]
                    : [],
            locusDir: l,
            locusAmt: 1.4 * asm,
            breathAmt: oneCall * 0.4 + (t < 0.08 ? breath(P(t, 0, 0.08)) * 0.25 : 0),
        });
        faceOpacity(asm, oneCall * 0.7);
        audSeeds.forEach((s, i) => {
            (s.material as THREE.SpriteMaterial).opacity =
                0.45 + 0.2 * Math.sin(time * 0.9 + i * 2.1) * 0.5 + (i < 3 ? 0.4 * breath(P(readK, i * 0.12, 0.9)) : 0);
        });

        // 意図=凝り面の迫り出し／下降=複像の剥離
        const intent = ease(P(t, 0.36, 0.42)) * (1 - ease(P(t, 0.52, 0.6)));
        facePool.forEach((fg) => {
            fg.grp.position.copy(fg.center.clone().normalize().multiplyScalar(intent * 0.15));
        });
        const f0 = facePool[0];
        echoLine.geometry.copy(f0.outline.geometry);
        echoLine.rotation.copy(f0.grp.rotation);
        echoLine.position.copy(f0.center.clone().normalize().multiplyScalar(ease(down) * 0.65));
        (echoLine.material as THREE.LineBasicMaterial).opacity = down > 0 && down < 1 ? 0.5 * (1 - ease(down)) : 0;

        // 上昇=別方位の稜から入り層間を通って履歴の最新頂点へ
        const up = P(t, 0.56, 0.72);
        const returnDir = l.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -2.4).normalize();
        const entry = returnDir.clone().multiplyScalar(2.28);
        const midP = entry
            .clone()
            .lerp(histTip, 0.5)
            .normalize()
            .multiplyScalar((2.28 + histTip.length()) / 2);
        const upHead = up < 0.5 ? entry.clone().lerp(midP, ease(up * 2)) : midP.clone().lerp(histTip, ease((up - 0.5) * 2));
        returnPath.geometry.setFromPoints([entry, upHead.clone().lerp(entry, 0.4), upHead]);
        (returnPath.material as THREE.LineBasicMaterial).opacity = up > 0 && up < 1 ? 0.7 * breath(up) : 0;

        // 追記=次の一稜を光が走り青灰へ冷える
        const append = P(t, 0.7, 0.8);
        paintHist(ease(append), append > 0 && append < 1 ? 0.97 + append * 0.03 : -1);

        // 薫習=琥珀の光が別の細道を遅れて種子層へ／再編=3周期毎idle
        const im = P(t, 0.78, 0.94);
        const dest = freshSeed.getWorldPosition(new THREE.Vector3());
        const imHead = histTip.clone().lerp(dest, ease(im));
        imprintPath.geometry.setFromPoints([histTip, imHead.clone().lerp(histTip, 0.4), imHead]);
        (imprintPath.material as THREE.LineBasicMaterial).opacity = im > 0 && im < 1 ? 0.45 * breath(im) : 0;
        (freshSeed.material as THREE.SpriteMaterial).opacity =
            0.8 * ease(P(t, 0.86, 0.97)) * (1 - ease(P(t, 0.99, 1)));
        const cons = cycle % 3 === 2 ? breath(P(t, 0.94, 1)) : 0;
        const derivedMat = derivedSeed.material as THREE.SpriteMaterial;
        derivedMat.opacity = Math.max(derivedMat.opacity * 0.995, 0.7 * cons);
        (coreHalo.material as THREE.SpriteMaterial).opacity = 0.7 + oneCall * 0.45;

        renderer.render(scene, camera);
        group.updateMatrixWorld();
        updateLabels();
        frame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    animate();

    return {
        dispose: () => {
            disposed = true;
            window.cancelAnimationFrame(frame);
            observer.disconnect();
            disposeObject(group);
            haloTex.dispose();
            renderer.dispose();
            renderer.domElement.remove();
            labelSvg.replaceChildren();
        },
    };
}

export function AlayaArchitectureModel() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const labelSvgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!containerRef.current || !labelSvgRef.current) return undefined;
        const handle = buildSanctumScene(containerRef.current, labelSvgRef.current);
        return () => handle.dispose();
    }, []);

    return (
        <div className="relative aspect-square w-full overflow-hidden bg-[#020403] shadow-[0_0_34px_rgba(0,255,65,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,216,164,0.13),transparent_48%),linear-gradient(180deg,rgba(0,255,65,0.055),transparent_24%,transparent_76%,rgba(168,144,88,0.045))]" />
            <div
                ref={containerRef}
                className="absolute inset-0"
                aria-label="阿頼耶識アーキテクチャの3D模型（核・種子層・因果鎖・現在相）"
            />
            <svg
                ref={labelSvgRef}
                className="pointer-events-none absolute inset-0 h-full w-full font-mono text-[9px] tracking-[0.2em]"
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute left-4 right-4 top-3 flex items-center justify-between border-b border-primary/15 pb-2 font-mono text-[9px] tracking-[0.22em] text-primary/38">
                <span>ALAYA INDEX</span>
                <span>LIVE MODEL</span>
            </div>
            <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-primary/25" />
            <div className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-primary/20" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-primary/18" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-neon-amber/18" />
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.24em] text-primary/28">
                LOW VELOCITY SCAN
            </div>
        </div>
    );
}
