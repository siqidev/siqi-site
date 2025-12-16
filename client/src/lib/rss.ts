import { XMLParser } from "fast-xml-parser";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  source: "note" | "zenn";
  thumbnail?: string;
}

// Multiple CORS proxies for fallback
const CORS_PROXIES = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
];

async function fetchWithProxy(url: string): Promise<string | null> {
  for (const getProxyUrl of CORS_PROXIES) {
    try {
      const proxyUrl = getProxyUrl(url);
      const response = await fetch(proxyUrl);

      if (!response.ok) continue;

      const data = await response.json();
      // Handle different proxy response formats
      const content = data.contents || data;
      if (typeof content === 'string' && content.includes('<?xml')) {
        return content;
      }
    } catch {
      continue;
    }
  }
  return null;
}

export async function fetchRSS(url: string, source: "note" | "zenn"): Promise<BlogPost[]> {
  try {
    const content = await fetchWithProxy(url);
    if (!content) return [];

    const parser = new XMLParser();
    const xml = parser.parse(content);
    const items = xml.rss?.channel?.item || [];

    // Normalize data
    return (Array.isArray(items) ? items : [items]).slice(0, 3).map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate).toLocaleDateString("ja-JP"),
      source,
      thumbnail: item["media:thumbnail"] || item.enclosure?.url || null
    }));
  } catch (error) {
    console.error(`Failed to fetch RSS from ${source}:`, error);
    return [];
  }
}
