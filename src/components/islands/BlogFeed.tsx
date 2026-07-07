import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { fetchRSS, type BlogPost } from "../../lib/rss";

// client/src/pages/Home.tsx Blog Section の RSS 取得部分のみを島として切り出したもの。
// タイトル・サブタイトル等の静的文言は src/components/home/Blog.astro 側で描画する。

export interface BlogFeedProps {
  noPostText: string;
}

export default function BlogFeed({ noPostText }: BlogFeedProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      const posts = await fetchRSS("https://note.com/sikino_sito/rss", "note");
      if (cancelled) return;
      setBlogPosts(posts.slice(0, 3));
      setLoading(false);
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-primary/20 bg-black/40 p-6 space-y-4 animate-pulse"
          >
            <div className="h-4 bg-primary/20 w-1/3"></div>
            <div className="h-6 bg-primary/20 w-3/4"></div>
            <div className="h-20 bg-primary/10 w-full"></div>
          </div>
        ))}
      </>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <p className="text-primary/60 font-mono col-span-3 text-center py-8">
        {noPostText}
      </p>
    );
  }

  return (
    <>
      {blogPosts.map((post, i) => (
        <a
          key={i}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block neon-shimmer border border-primary/20 bg-black transition-all duration-300 p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-2 opacity-50">
            <ExternalLink className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono px-2 py-0.5 border border-green-400 text-green-400">
              {post.source}
            </span>
            <span className="text-xs font-mono text-gray-500">
              {post.pubDate}
            </span>
          </div>
          <h3 className="text-lg font-display text-white group-hover:text-primary transition-colors line-clamp-2 mb-4">
            {post.title}
          </h3>
          <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
        </a>
      ))}
    </>
  );
}
