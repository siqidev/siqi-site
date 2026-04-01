import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Novels() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title={t("novels.seo.title")}
                description={t("novels.seo.description")}
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
                            {t("novels.hero.tagline")}
                        </h1>
                        <p className="font-mono text-sm text-primary/60 max-w-2xl mb-16">
                            {t("novels.hero.description")}
                        </p>

                        {/* 虚球 */}
                        <div className="max-w-2xl w-full border border-primary/30 bg-black p-8 text-left">
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-3xl font-display text-white">{t("novels.kyokyuu.title")}</h2>
                                <span className="px-2 py-0.5 text-[10px] font-mono border border-primary text-primary bg-primary/10">
                                    {t("novels.kyokyuu.award")}
                                </span>
                            </div>
                            <p className="font-mono text-sm text-gray-400 leading-relaxed mb-6">
                                {t("novels.kyokyuu.desc")}
                            </p>
                            <a
                                href="https://helveticabooks.com/award/2nd/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono"
                                >
                                    {t("novels.kyokyuu.read")}
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
