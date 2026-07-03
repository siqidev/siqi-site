import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneHandle = {
    dispose: () => void;
};

const CORE_COLOR = 0xb8a46a;
const MEMORY_COLOR = 0x78d8a4;
const TRACE_COLOR = 0x6f9fb1;
const SEED_COLOR = 0xa89058;

function makeLine(points: THREE.Vector3[], color: number, opacity: number): THREE.Line {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(geometry, material);
}

function makeWireSphere(radius: number, color: number, opacity: number): THREE.LineSegments {
    const geometry = new THREE.SphereGeometry(radius, 32, 16);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
    });
    geometry.dispose();
    return new THREE.LineSegments(edges, material);
}

function makeOrbit(radius: number, tilt: THREE.Euler, color: number): THREE.Line {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 160; i += 1) {
        const theta = (i / 160) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const line = makeLine(points, color, 0.36);
    line.rotation.copy(tilt);
    return line;
}

function makeParticles(count: number): THREE.Points {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
        new THREE.Color(MEMORY_COLOR),
        new THREE.Color(TRACE_COLOR),
        new THREE.Color(SEED_COLOR),
    ];

    for (let i = 0; i < count; i += 1) {
        const radius = 1.25 + Math.random() * 1.45;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.cos(phi) * 0.78;
        positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

        const color = palette[i % palette.length];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.76,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    return new THREE.Points(geometry, material);
}

function makePulse(color: number): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(0.055, 16, 8);
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.86,
        blending: THREE.AdditiveBlending,
    });
    return new THREE.Mesh(geometry, material);
}

function disposeObject(object: THREE.Object3D): void {
    object.traverse((item) => {
        const mesh = item as THREE.Mesh | THREE.Line | THREE.LineSegments | THREE.Points;
        if ("geometry" in mesh && mesh.geometry) {
            mesh.geometry.dispose();
        }
        if ("material" in mesh && mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => material.dispose());
        }
    });
}

function buildArchitectureScene(container: HTMLDivElement): SceneHandle {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.dataset.testid = "alaya-architecture-canvas";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.04, 6.1);
    camera.lookAt(0, 0, 0);

    const root = new THREE.Group();
    root.scale.setScalar(0.82);
    scene.add(root);

    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.48, 1),
        new THREE.MeshBasicMaterial({
            color: CORE_COLOR,
            wireframe: true,
            transparent: true,
            opacity: 0.94,
            blending: THREE.AdditiveBlending,
        }),
    );
    root.add(core);

    root.add(makeWireSphere(1.15, MEMORY_COLOR, 0.34));
    root.add(makeWireSphere(1.85, TRACE_COLOR, 0.24));
    root.add(makeWireSphere(2.58, MEMORY_COLOR, 0.16));
    root.add(makeOrbit(1.55, new THREE.Euler(0.62, 0, 0.22), MEMORY_COLOR));
    root.add(makeOrbit(2.05, new THREE.Euler(-0.35, 0.12, 1.04), TRACE_COLOR));
    root.add(makeOrbit(2.42, new THREE.Euler(0.2, 0.74, -0.55), SEED_COLOR));

    const particles = makeParticles(170);
    root.add(particles);

    const pulses = [
        { mesh: makePulse(SEED_COLOR), radius: 1.55, speed: 0.55, phase: 0, tilt: new THREE.Euler(0.62, 0, 0.22) },
        { mesh: makePulse(TRACE_COLOR), radius: 2.05, speed: 0.42, phase: 2.1, tilt: new THREE.Euler(-0.35, 0.12, 1.04) },
        { mesh: makePulse(MEMORY_COLOR), radius: 2.42, speed: 0.33, phase: 4.2, tilt: new THREE.Euler(0.2, 0.74, -0.55) },
    ];
    pulses.forEach((pulse) => root.add(pulse.mesh));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let disposed = false;

    const resize = () => {
        const width = Math.max(1, container.clientWidth);
        const height = Math.max(1, container.clientHeight);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const updatePulses = (time: number) => {
        pulses.forEach((pulse) => {
            const theta = time * pulse.speed + pulse.phase;
            const position = new THREE.Vector3(Math.cos(theta) * pulse.radius, 0, Math.sin(theta) * pulse.radius);
            position.applyEuler(pulse.tilt);
            pulse.mesh.position.copy(position);
        });
    };

    const animate = () => {
        if (disposed) return;
        const time = performance.now() * 0.001;
        const speed = reducedMotion ? 0.018 : 0.085;
        root.rotation.y = time * speed;
        root.rotation.x = Math.sin(time * 0.17) * 0.08;
        core.rotation.x = time * 0.34;
        core.rotation.y = -time * 0.28;
        particles.rotation.y = -time * 0.045;
        updatePulses(time);
        renderer.render(scene, camera);
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
            disposeObject(root);
            renderer.dispose();
            renderer.domElement.remove();
        },
    };
}

export function AlayaArchitectureModel() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return undefined;
        const handle = buildArchitectureScene(containerRef.current);
        return () => handle.dispose();
    }, []);

    return (
        <div className="relative aspect-square w-full overflow-hidden bg-[#020403] shadow-[0_0_34px_rgba(0,255,65,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,216,164,0.13),transparent_48%),linear-gradient(180deg,rgba(0,255,65,0.055),transparent_24%,transparent_76%,rgba(168,144,88,0.045))]" />
            <div
                ref={containerRef}
                className="absolute inset-0"
                aria-label="阿頼耶識アーキテクチャの抽象3D模型"
            />
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path d="M52 41 L72 22 L91 22" stroke="rgba(120,216,164,0.46)" strokeWidth="0.18" fill="none" />
                <path d="M43 58 L22 75 L9 75" stroke="rgba(111,159,177,0.48)" strokeWidth="0.18" fill="none" />
                <path d="M59 58 L77 74 L94 74" stroke="rgba(168,144,88,0.48)" strokeWidth="0.18" fill="none" />
                <path d="M42 38 L25 27 L8 27" stroke="rgba(120,216,164,0.36)" strokeWidth="0.18" fill="none" />
                <circle cx="52" cy="41" r="0.75" fill="rgba(120,216,164,0.72)" />
                <circle cx="43" cy="58" r="0.75" fill="rgba(111,159,177,0.72)" />
                <circle cx="59" cy="58" r="0.75" fill="rgba(168,144,88,0.72)" />
                <circle cx="42" cy="38" r="0.65" fill="rgba(120,216,164,0.58)" />
            </svg>
            <div className="pointer-events-none absolute left-4 right-4 top-3 flex items-center justify-between border-b border-primary/15 pb-2 font-mono text-[9px] tracking-[0.22em] text-primary/38">
                <span>ALAYA INDEX</span>
                <span>LIVE MODEL</span>
            </div>
            <div className="pointer-events-none absolute right-4 top-[18%] font-mono text-[9px] tracking-[0.2em] text-primary/60">
                MEMORY
            </div>
            <div className="pointer-events-none absolute left-4 top-[24%] font-mono text-[9px] tracking-[0.2em] text-primary/45">
                EXPERIENCE
            </div>
            <div className="pointer-events-none absolute left-4 top-[72%] font-mono text-[9px] tracking-[0.2em] text-[#6f9fb1]/70">
                TRACE
            </div>
            <div className="pointer-events-none absolute right-4 top-[71%] font-mono text-[9px] tracking-[0.2em] text-[#a89058]/75">
                SEED / INTENT
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
