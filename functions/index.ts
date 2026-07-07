// Cloudflare Pages Function: ルート "/" のみを処理し、Accept-Language を見て
// /ja または /en へ 302 リダイレクトする。中間キャッシュによる別言語固定を防ぐため
// Vary: Accept-Language と Cache-Control: no-store を必ず付与する。

// Cloudflare Pages Functions の型は最小限だけ自前定義する（any 禁止）。
interface PagesFunctionContext {
  request: Request;
}

type PagesFunction = (context: PagesFunctionContext) => Response;

/**
 * Accept-Language ヘッダを解析し、"ja" の優先度（q値）が "en" の優先度より
 * 高い場合に true を返す。ヘッダが無い、または ja が見つからない場合は false。
 */
function isJapanesePreferred(acceptLanguage: string | null): boolean {
  if (!acceptLanguage) return false;

  const entries = acceptLanguage.split(",").map(part => {
    const [rawTag, ...params] = part.trim().split(";");
    const tag = rawTag.trim().toLowerCase();
    const qParam = params
      .map(p => p.trim())
      .find(p => p.startsWith("q="));
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1;
    return { tag, q: Number.isNaN(q) ? 1 : q };
  });

  const scoreFor = (prefix: string): number => {
    const match = entries.find(e => e.tag === prefix || e.tag.startsWith(`${prefix}-`));
    return match ? match.q : -1;
  };

  const jaScore = scoreFor("ja");
  const enScore = scoreFor("en");

  return jaScore > enScore;
}

export const onRequestGet: PagesFunction = ({ request }) => {
  const acceptLanguage = request.headers.get("Accept-Language");
  const locale = isJapanesePreferred(acceptLanguage) ? "ja" : "en";
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
