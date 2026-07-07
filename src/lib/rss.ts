import { XMLParser } from "fast-xml-parser";

// client/src/lib/rss.ts の移植。any を排除し unknown + 型ガードで安全化。
// 失敗時は console.error を出さず、空配列を返して呼び出し側のフォールバック表示に委ねる。

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  source: "note" | "zenn";
  thumbnail?: string;
}

// Multiple CORS proxies for fallback
const CORS_PROXIES: Array<(url: string) => string> = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function fetchWithProxy(url: string): Promise<string | null> {
  for (const getProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = getProxyUrl(url);
      const response = await fetch(proxyUrl);

      if (!response.ok) continue;

      const data: unknown = await response.json();
      // Handle different proxy response formats
      const content =
        isRecord(data) && typeof data.contents === "string"
          ? data.contents
          : data;
      if (typeof content === "string" && content.includes("<?xml")) {
        return content;
      }
    } catch {
      continue;
    }
  }
  return null;
}

interface RssItem {
  title?: unknown;
  link?: unknown;
  pubDate?: unknown;
  "media:thumbnail"?: unknown;
  enclosure?: unknown;
}

function isRssItem(value: unknown): value is RssItem {
  return isRecord(value);
}

function toStringField(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function extractThumbnail(item: RssItem): string | undefined {
  const thumbnail = item["media:thumbnail"];
  if (typeof thumbnail === "string") return thumbnail;

  const enclosure = item.enclosure;
  if (isRecord(enclosure) && typeof enclosure.url === "string") {
    return enclosure.url;
  }

  return undefined;
}

export async function fetchRSS(
  url: string,
  source: "note" | "zenn"
): Promise<BlogPost[]> {
  try {
    const content = await fetchWithProxy(url);
    if (!content) return [];

    const parser = new XMLParser();
    const xml: unknown = parser.parse(content);

    const channel =
      isRecord(xml) && isRecord(xml.rss) && isRecord(xml.rss.channel)
        ? xml.rss.channel
        : undefined;
    const rawItems = channel?.item;
    const items = Array.isArray(rawItems)
      ? rawItems
      : rawItems !== undefined
        ? [rawItems]
        : [];

    // Normalize data
    return items
      .filter(isRssItem)
      .slice(0, 3)
      .map(item => ({
        title: toStringField(item.title),
        link: toStringField(item.link),
        pubDate: new Date(
          toStringField(item.pubDate)
        ).toLocaleDateString("ja-JP"),
        source,
        thumbnail: extractThumbnail(item),
      }));
  } catch {
    return [];
  }
}
