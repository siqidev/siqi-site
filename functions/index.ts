// Cloudflare Pages Function: ルート "/" のみを処理し、Accept-Language を見て
// /ja または /en へ 302 リダイレクトする。中間キャッシュによる別言語固定を防ぐため
// Vary: Accept-Language と Cache-Control: no-store を必ず付与する。
// GET/HEAD 両方に応答する（curl -I や一部ボットは HEAD を使う）。

// Cloudflare Pages Functions の型は最小限だけ自前定義する（any 禁止）。
interface PagesFunctionContext {
  request: Request;
}

type PagesFunction = (context: PagesFunctionContext) => Response;

interface LangCandidate {
  tag: string;
  q: number;
  index: number;
}

/**
 * Accept-Language ヘッダを解析してロケールを決める。
 * - 各言語（ja / en）について最大の q 値を採用する（q<=0 は「不可」なので除外）
 * - q が同点の場合はヘッダ内で先に出現した方を優先する（一般的なUAの並び順に従う）
 * - ja が有効で en が無効なら ja、どちらも無効・ヘッダ無しなら en
 */
function pickLocale(acceptLanguage: string | null): "ja" | "en" {
  if (!acceptLanguage) return "en";

  const entries: LangCandidate[] = acceptLanguage.split(",").map((part, index) => {
    const [rawTag, ...params] = part.trim().split(";");
    const tag = rawTag.trim().toLowerCase();
    const qParam = params.map(p => p.trim()).find(p => p.startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
    return { tag, q: Number.isNaN(q) ? 1 : q, index };
  });

  const bestFor = (prefix: string): LangCandidate | null => {
    let best: LangCandidate | null = null;
    for (const e of entries) {
      if (e.q <= 0) continue;
      if (e.tag !== prefix && !e.tag.startsWith(`${prefix}-`)) continue;
      if (!best || e.q > best.q || (e.q === best.q && e.index < best.index)) {
        best = e;
      }
    }
    return best;
  };

  const ja = bestFor("ja");
  const en = bestFor("en");

  if (!ja) return "en";
  if (!en) return "ja";
  if (ja.q !== en.q) return ja.q > en.q ? "ja" : "en";
  return ja.index < en.index ? "ja" : "en";
}

export const onRequest: PagesFunction = ({ request }) => {
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    return new Response(null, {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const locale = pickLocale(request.headers.get("Accept-Language"));
  const destination = new URL(`/${locale}`, request.url);

  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      Vary: "Accept-Language",
      "Cache-Control": "no-store",
    },
  });
};
