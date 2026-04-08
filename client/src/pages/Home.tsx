import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { GlitchText, Typewriter } from "@/components/TerminalUI";
import { Button } from "@/components/ui/button";
import { fetchRSS, BlogPost } from "@/lib/rss";
import { useEffect, useState } from "react";
import { Code, ExternalLink, Github, X, ArrowRight, Bot, Radio, Database, Gamepad2, Users, Brain, Award, BookOpen, Sparkles, Shield, Swords, Hash } from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects, ProjectMeta } from "@/data/projectsData";
import { communities } from "@/data/communityData";

const iconMap: Record<string, React.ElementType> = {
  Code, ArrowRight, Bot, Radio, Database, Gamepad2, Users, Brain, Award, BookOpen, Sparkles, Shield, Swords, Hash,
};

// Tailwind JITは動的クラス名を検出できないため、完全なクラス名を返す
const accentTextClass: Record<string, string> = {
  "neon-magenta": "text-neon-magenta",
  "primary": "text-primary",
  "neon-amber": "text-neon-amber",
  "neon-cyan": "text-neon-cyan",
};
const accentBgClass: Record<string, string> = {
  "neon-magenta": "bg-neon-magenta",
  "primary": "bg-primary",
  "neon-amber": "bg-neon-amber",
  "neon-cyan": "bg-neon-cyan",
};
const accentHoverBgClass: Record<string, string> = {
  "neon-magenta": "hover:bg-neon-magenta/80",
  "primary": "hover:bg-primary/80",
  "neon-amber": "hover:bg-neon-amber/80",
  "neon-cyan": "hover:bg-neon-cyan/80",
};



export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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
      <Header variant="home" />

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
                {t("home.hero.tagline")}
              </p>
            </div>

            {/* Minimal Action */}
            <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
              <Button
                onClick={() => scrollToSection("works")}
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 font-mono text-sm tracking-widest uppercase transition-all duration-300"
              >
                {t("home.hero.viewWorks")}
              </Button>
            </div>

          </div>

          {/* Fade Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        </section>

        {/* Profile Section */}
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
                  <span className="text-primary">01.</span> {t("home.profile.title")}
                </h2>

                <div className="space-y-6 font-mono text-lg text-gray-300 leading-relaxed">
                  <p>
                    <span className="text-primary">{">"}</span> {t("home.profile.intro")}
                  </p>
                  <div className="space-y-2">
                    <p><span className="text-primary">{">"}</span> {t("home.profile.career")}</p>
                    <div className="pl-4 space-y-3">
                      <p className="text-base">{t("home.profile.award1")}</p>
                      <p className="text-base">{t("home.profile.award2")}</p>
                      <p className="text-base">{t("home.profile.community")}</p>
                      <div className="space-y-1">
                        <p className="text-base">{t("home.profile.memecoin")}</p>
                        <p className="text-[10px] text-gray-500 leading-tight opacity-70">
                          {t("home.profile.disclaimer")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border border-primary/30 p-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <h3 className="font-display text-xl text-neon-magenta mb-2">{t("home.profile.skills")}</h3>
                    <ul className="font-mono text-sm space-y-1 text-primary/80">
                      <li>Vibe Coding</li>
                      <li>Prompt Engineering</li>
                      <li>Creative Direction</li>
                      <li>Storytelling</li>
                    </ul>
                  </div>
                  <div className="border border-primary/30 p-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <h3 className="font-display text-xl text-neon-amber mb-2">{t("home.profile.interests")}</h3>
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

        {/* Projects Section */}
        <section id="works" className="relative border-b border-primary/20">
          {/* Avatar UI — フルサイズ表示 */}
          {(() => {
            const featured = projects[0];
            return (
              <div className="py-24 relative border-b border-primary/20">
                {featured.image && (
                  <div className="absolute inset-0 z-0 opacity-30">
                    <img src={featured.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/80"></div>
                  </div>
                )}

                <div className="container relative z-10">
                  <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                      <span className="text-primary">02.</span> {t("home.projects.title")}
                    </h2>
                    <p className="font-mono text-primary/60 max-w-2xl">
                      {t("home.projects.subtitle")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-16">
                    {featured.image && (
                      <div className="w-full">
                        <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_50px_rgba(0,255,65,0.15)] bg-black/50">
                          <img src={featured.image} alt={t(featured.titleKey)} className="w-full h-auto block" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-8 max-w-3xl">
                      <div className="flex items-center gap-4">
                        <h3 className={`text-5xl font-display ${accentTextClass[featured.accentColor]}`}>
                          {t(featured.titleKey)}
                        </h3>
                        {featured.version && (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono border border-primary/50">
                            {featured.version}
                          </span>
                        )}
                      </div>

                      <p className="font-mono text-gray-300 leading-relaxed text-lg">
                        {t(featured.descKey)}
                      </p>

                      <div className="flex flex-wrap gap-6">
                        {featured.tags.map((tag) => {
                          const IconComp = iconMap[tag.icon];
                          return (
                            <div key={tag.labelKey} className="flex items-center gap-3 text-sm font-mono text-primary/80">
                              {IconComp && <IconComp className="w-4 h-4" />}
                              <span>{t(tag.labelKey)}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-4">
                        {featured.buttons.map((btn) => (
                          <a key={btn.href + btn.labelKey} href={btn.href} target="_blank" rel="noopener noreferrer">
                            {btn.variant === "primary" ? (
                              <Button className={`${accentBgClass[featured.accentColor]} text-white ${accentHoverBgClass[featured.accentColor]} border-none rounded-none font-mono h-12 px-6`}>
                                {t(btn.labelKey)} <ExternalLink className="ml-2 w-4 h-4" />
                              </Button>
                            ) : (
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono h-12 px-6">
                                {t(btn.labelKey)} <ExternalLink className="ml-2 w-4 h-4" />
                              </Button>
                            )}
                          </a>
                        ))}
                        {featured.badges?.map((badge) => (
                          <a key={badge.href} href={badge.href} target="_blank" rel="noopener noreferrer">
                            <img src={badge.src} alt={badge.alt} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 残りのプロジェクト — カード表示 */}
          <div className="py-24">
            <div className="container">
              <div className="grid md:grid-cols-3 gap-6">
                {projects.slice(1).map((project) => (
                  <a
                    key={project.id}
                    href={project.path}
                    className="group block border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-mono px-2 py-0.5 border ${
                        accentTextClass[project.accentColor]
                      } border-current`}>
                        {t(project.categoryKey)}
                      </span>
                    </div>

                    <h3 className={`text-xl font-display ${accentTextClass[project.accentColor]} group-hover:brightness-125 transition-all mb-4`}>
                      {t(project.titleKey)}
                    </h3>

                    <p className="font-mono text-sm text-gray-400 leading-relaxed mb-4">
                      {t(project.descKey)}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => {
                        const IconComp = iconMap[tag.icon];
                        return (
                          <div key={tag.labelKey} className="flex items-center gap-1.5 text-xs font-mono text-primary/60">
                            {IconComp && <IconComp className="w-3 h-3" />}
                            <span>{t(tag.labelKey)}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-24 relative border-b border-primary/20 bg-black">
          <div className="container relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                <span className="text-primary">03.</span> {t("home.community.title")}
              </h2>
              <p className="font-mono text-primary/60 max-w-2xl">
                {t("home.community.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {communities.map((c) => {
                const IconComp = iconMap[c.icon];
                return (
                  <a
                    key={c.id}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-mono px-2 py-0.5 border ${
                        c.roleKey === "community.role.founded"
                          ? "border-neon-magenta text-neon-magenta"
                          : "border-primary text-primary"
                      }`}>
                        {t(c.roleKey)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      {IconComp && <IconComp className={`w-5 h-5 ${accentTextClass[c.accentColor]}`} />}
                      <h3 className={`text-xl font-display ${accentTextClass[c.accentColor]} group-hover:brightness-125 transition-all`}>
                        {t(c.titleKey)}
                      </h3>
                    </div>

                    <p className="font-mono text-sm text-gray-400 leading-relaxed">
                      {t(c.descKey)}
                    </p>

                    <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 relative border-b border-primary/20 bg-black">
          <div className="container relative z-10">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                  <span className="text-primary">04.</span> {t("home.blog.title")}
                </h2>
                <p className="font-mono text-primary/60 max-w-2xl">
                  {t("home.blog.subtitle")}
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
                  {t("home.blog.noPost")}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative bg-black">
          <div className="container relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
              <span className="text-primary">05.</span> {t("home.contact.title")}
            </h2>
            <p className="font-mono text-gray-400 mb-12">
              {t("home.contact.subtitle")}<br />
              {t("home.contact.subtitle2")}
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
                © 2025-2026 SIQI LABEL. ALL RIGHTS RESERVED.<br />
                SYSTEM VERSION 1.0.0 // BUILD 20251215
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
