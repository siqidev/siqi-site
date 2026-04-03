import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Roblox() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title={t("roblox.seo.title")}
                description={t("roblox.seo.description")}
            />

            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="scanline"></div>
            </div>

            <Header variant="page" />

            <main className="flex-1 relative z-10 pt-16">
                <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
                    <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">
                        <h1
                            className="font-syne font-extrabold leading-none tracking-tighter text-white mb-8"
                            style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)" }}
                        >
                            {t("roblox.hero.tagline")}
                        </h1>
                        <p className="font-mono text-sm text-primary/60 max-w-2xl mb-16">
                            {t("roblox.hero.description")}
                        </p>

                        {/* Steal from Elyth */}
                        <div className="max-w-2xl w-full border border-primary/30 bg-black p-8 text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-3xl font-display text-white">{t("roblox.sfe.title")}</h2>
                                <span className="px-2 py-0.5 text-[10px] font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10">
                                    {t("roblox.sfe.status")}
                                </span>
                            </div>
                            <p className="font-mono text-sm text-gray-400 leading-relaxed mb-6">
                                {t("roblox.sfe.desc")}
                            </p>
                            <a
                                href="https://www.roblox.com/games/118630117741072"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 rounded-none font-mono"
                                >
                                    {t("roblox.sfe.play")}
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
