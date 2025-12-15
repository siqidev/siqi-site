import { XMLParser } from "fast-xml-parser";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  source: "note" | "zenn";
  thumbnail?: string;
}

export async function fetchRSS(url: string, source: "note" | "zenn"): Promise<BlogPost[]> {
  try {
    // Note: In a real production environment, you would need a proxy to avoid CORS issues.
    // For this static site demo, we'll simulate the data or use a CORS proxy if available.
    // Using a public CORS proxy for demonstration purposes.
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) return [];

    const parser = new XMLParser();
    const xml = parser.parse(data.contents);
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
