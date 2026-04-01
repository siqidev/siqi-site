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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-magenta/10 border border-neon-magenta/30 rounded-full mb-8">
                            <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse"></span>
                            <span className="font-mono text-sm text-neon-magenta">Roblox Game</span>
                        </div>

                        <h1
                            className="font-syne font-extrabold leading-none tracking-tighter text-white mb-8"
                            style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
                        >
                            Steal from Elyth
                        </h1>
                        <p className="font-mono text-lg md:text-xl text-white/80 max-w-2xl mb-4">
                            {t("roblox.hero.tagline")}
                        </p>
                        <p className="font-mono text-sm text-primary/60 max-w-2xl mb-12">
                            {t("roblox.hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://www.roblox.com/games/steal-from-elyth"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono h-12 px-8 text-base">
                                    {t("roblox.cta.play")}
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </Button>
                            </a>
                            <a
                                href="https://github.com/siqidev/steal-from-elyth"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono h-12 px-8 text-base"
                                >
                                    GitHub
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
