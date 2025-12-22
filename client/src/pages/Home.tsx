import { SEOMetadata } from "@/components/SEOMetadata";
import { GlitchText, Typewriter } from "@/components/TerminalUI";
import { Button } from "@/components/ui/button";
import { fetchRSS, BlogPost } from "@/lib/rss";
import { useEffect, useState } from "react";
import { ArrowRight, Code, ExternalLink, Github, Terminal, X, Menu } from "lucide-react";
import React from "react";



export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchRSS("https://note.com/sikino_sito/rss", "note");
        setBlogPosts(posts.slice(0, 3));
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      <SEOMetadata />

      {/* CRT Effects */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="scanline"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30 bg-black/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-widest text-primary">&gt;_SIQI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-mono">
            <button onClick={() => scrollToSection("hero")} className="hover:text-neon-magenta transition-colors text-primary/80">./HOME</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-neon-magenta transition-colors text-primary/80">./PROFILE</button>
            <button onClick={() => scrollToSection("works")} className="hover:text-neon-magenta transition-colors text-primary/80">./WORKS</button>
            <button onClick={() => scrollToSection("blog")} className="hover:text-neon-magenta transition-colors text-primary/80">./LOGS</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-neon-magenta transition-colors text-primary/80">./CONTACT</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary hover:text-neon-magenta transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Button variant="outline" size="sm" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-black font-mono rounded-none">
            SYS.STATUS: ONLINE
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl border-t border-primary/20 md:hidden flex flex-col items-center justify-start pt-12 gap-8 animate-in slide-in-from-top-5 fade-in duration-200 h-[calc(100vh-4rem)] overflow-y-auto">
            <button onClick={() => scrollToSection("hero")} className="text-xl font-display text-primary hover:text-neon-magenta tracking-widest">./HOME</button>
            <button onClick={() => scrollToSection("about")} className="text-xl font-display text-primary hover:text-neon-magenta tracking-widest">./PROFILE</button>
            <button onClick={() => scrollToSection("works")} className="text-xl font-display text-primary hover:text-neon-magenta tracking-widest">./WORKS</button>
            <button onClick={() => scrollToSection("blog")} className="text-xl font-display text-primary hover:text-neon-magenta tracking-widest">./LOGS</button>
            <button onClick={() => scrollToSection("contact")} className="text-xl font-display text-primary hover:text-neon-magenta tracking-widest">./CONTACT</button>
          </div>
        )}
      </nav>

      <main className="flex-1 relative z-10 pt-16">

        {/* Hero Section - Typography Focused */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen grayscale contrast-125">
              <img src="/images/avatar-ui-demo.gif" alt="Hero Background" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
          </div>

          <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">

            {/* Main Typography Logo */}
            <div className="relative mb-12 flex flex-col items-center">
              <h1
                className="font-syne font-extrabold text-[15vw] md:text-[12rem] leading-none tracking-tighter select-none text-white"
              >
                SIQI
              </h1>
              <p className="font-mono text-sm md:text-xl text-white/90 mix-blend-difference tracking-widest mt-8">
                &gt; Building the future, pixel by pixel._
              </p>
            </div>

            {/* Minimal Action */}
            <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
              <Button
                onClick={() => scrollToSection("works")}
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 font-mono text-sm tracking-widest uppercase transition-all duration-300"
              >
                [ View Works ]
              </Button>
            </div>

          </div>

          {/* Fade Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        </section>

        {/* Works Section (Avatar UI) - MOVED TO TOP */}
        <section id="works" className="py-24 relative border-b border-primary/20">
          <div className="absolute inset-0 z-0 opacity-30">
            <img src="/images/avatar-section-bg.png" alt="Works Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80"></div>
          </div>

          <div className="container relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                <span className="text-primary">01.</span> FEATURED_PROJECT
              </h2>
              <p className="font-mono text-primary/60 max-w-2xl">
                最新のOSSプロジェクトを紹介します。
              </p>
            </div>

            <div className="flex flex-col gap-16">
              {/* Demo Display - MOVED TO TOP */}
              <div className="w-full">
                <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_50px_rgba(0,255,65,0.15)] bg-black/50">
                  {/* Using img tag directly to ensure full visibility without cropping */}
                  <img
                    src="/images/avatar-ui-demo.gif"
                    alt="Avatar UI Demo"
                    className="w-full h-auto block"
                  />
                </div>
              </div>

              {/* Project Info - Bottom */}
              <div className="space-y-8 max-w-3xl">
                <div className="flex items-center gap-4">
                  <h3 className="text-5xl font-display text-neon-magenta">Avatar UI</h3>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono border border-primary/50">v0.1.0</span>
                </div>

                <p className="font-mono text-gray-300 leading-relaxed text-lg">
                  人とAIが共存する次世代インターフェース基盤。Gemini・GPT・Claude対応。デスクトップで動くエージェントUI。検索エージェントを標準搭載し、MCP連携やツール追加も可能です。
                </p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3 text-sm font-mono text-primary/80">
                    <Code className="w-4 h-4" />
                    <span>Multi-LLM Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-mono text-primary/80">
                    <Terminal className="w-4 h-4" />
                    <span>Desktop Agent</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-mono text-primary/80">
                    <ArrowRight className="w-4 h-4" />
                    <span>MIT License</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/siqidev/avatar-ui" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono h-12 px-6">
                      VIEW_REPO <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                  <a href="https://github.com/siqidev/avatar-ui" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono h-12 px-6">
                      git clone ...
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - MOVED TO SECOND */}
        <section id="about" className="py-24 relative border-b border-primary/20 bg-black">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="/images/profile-bg.png" alt="Profile Background" className="w-full h-full object-cover" />
          </div>

          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative group w-48 h-48 md:w-64 md:h-64">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <img
                    src="/images/shikino-icon.png"
                    alt="Shikino Shito"
                    className="w-full h-full rounded-full border-2 border-primary/50 relative z-10 shadow-[0_0_30px_rgba(0,255,65,0.3)] object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-8">
                <h2 className="text-4xl md:text-5xl font-display text-white">
                  <span className="text-primary">02.</span> PROFILE_DATA
                </h2>

                <div className="space-y-6 font-mono text-lg text-gray-300 leading-relaxed">
                  <p>
                    <span className="text-primary">{">"}</span> 作家兼個人開発者として活動するクリエイター。デジタルとアナログの境界線を探求し、物語性と機能性を融合させた作品を制作しています。
                  </p>
                  <p>
                    <span className="text-primary">{">"}</span> 主な経歴：HelveticaBooks短編小説賞 奨励賞を受賞。
                  </p>
                  <div className="space-y-1">
                    <p>
                      <span className="text-primary">{">"}</span> キャラクターSPECTRAが第三者によりミームコイン化、取引総額6億円超*
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight opacity-70">
                      *これは第三者の行為によるもので、私の承認を伴うものではなく、投資に関する責任は一切負いません。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border border-primary/30 p-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <h3 className="font-display text-xl text-neon-magenta mb-2">SKILLS</h3>
                    <ul className="font-mono text-sm space-y-1 text-primary/80">
                      <li>Vibe Coding</li>
                      <li>Prompt Engineering</li>
                      <li>Creative Direction</li>
                      <li>Storytelling</li>
                    </ul>
                  </div>
                  <div className="border border-primary/30 p-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <h3 className="font-display text-xl text-neon-amber mb-2">INTERESTS</h3>
                    <ul className="font-mono text-sm space-y-1 text-primary/80">
                      <li>Cyberpunk, Retro future</li>
                      <li>Generative Art</li>
                      <li>Open Source Culture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 relative border-b border-primary/20 bg-black">
          <div className="container relative z-10">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                  <span className="text-primary">03.</span> TRANSMISSIONS
                </h2>
                <p className="font-mono text-primary/60 max-w-2xl">
                  技術記事、考察、日々の記録。
                </p>
              </div>
              <div className="hidden md:flex gap-4">
                <Button variant="outline" size="sm" className="font-mono text-xs border-primary/30 text-primary/60 hover:text-primary hover:border-primary">
                  RSS_FEED.XML
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {loading ? (
                // Loading Skeletons
                [...Array(3)].map((_, i) => (
                  <div key={i} className="border border-primary/20 bg-black/40 p-6 space-y-4 animate-pulse">
                    <div className="h-4 bg-primary/20 w-1/3"></div>
                    <div className="h-6 bg-primary/20 w-3/4"></div>
                    <div className="h-20 bg-primary/10 w-full"></div>
                  </div>
                ))
              ) : blogPosts.length > 0 ? (
                blogPosts.map((post, i) => (
                  <a
                    key={i}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono px-2 py-0.5 border border-green-400 text-green-400">
                        {post.source}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{post.pubDate}</span>
                    </div>
                    <h3 className="text-lg font-display text-white group-hover:text-primary transition-colors line-clamp-2 mb-4">
                      {post.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
                  </a>
                ))
              ) : (
                // Fallback if no posts loaded
                <p className="text-primary/60 font-mono col-span-3 text-center py-8">
                  記事を読み込めませんでした。
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative bg-black">
          <div className="container relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
              <span className="text-primary">04.</span> ESTABLISH_UPLINK
            </h2>
            <p className="font-mono text-gray-400 mb-12">
              プロジェクトの依頼、コラボレーションの提案、または単なる挨拶まで。<br />
              常に通信回線を開いています。
            </p>

            <div className="flex justify-center gap-6">
              <a href="https://x.com/Sikino_Sito" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-16 h-16 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300">
                  <X className="w-6 h-6" />
                </Button>
              </a>
              <a href="https://github.com/sito-sikino" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-16 h-16 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300">
                  <Github className="w-6 h-6" />
                </Button>
              </a>
              <a href="https://github.com/siqidev/avatar-ui" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-16 h-16 rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300">
                  <Code className="w-6 h-6" />
                </Button>
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-primary/20">
              <p className="font-mono text-xs text-primary/40">
                © 2025 SIQI LABEL. ALL RIGHTS RESERVED.<br />
                SYSTEM VERSION 1.0.0 // BUILD 20251215
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
