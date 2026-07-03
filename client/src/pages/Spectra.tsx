import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { AlayaArchitectureModel } from "@/components/AlayaArchitectureModel";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Spectra() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title={t("spectra.seo.title")}
                description={t("spectra.seo.description")}
            />

            {/* CRT Effects */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="scanline"></div>
            </div>

            <Header variant="page" />

            <main className="flex-1 relative z-10 pt-16">
                {/* Hero Section - Same style as main page with GIF background */}
                <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
                    {/* Background - Same as Home */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 w-full h-full opacity-50 mix-blend-screen grayscale contrast-125">
                            <video
                                src="/images/avatar-ui-demo.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                    </div>

                    <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-magenta/10 border border-neon-magenta/30 rounded-full mb-8">
                            <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse"></span>
                            <span className="font-mono text-sm text-neon-magenta">AITuber Project</span>
                        </div>

                        {/* Responsive Hero Text - uses clamp for dynamic sizing */}
                        <h1
                            className="font-syne font-extrabold leading-none tracking-tighter text-white mb-8"
                            style={{ fontSize: "clamp(2.5rem, 12vw, 10rem)" }}
                        >
                            SPECTRA
                        </h1>
                        <h2
                            className="font-display text-neon-magenta mb-8"
                            style={{ fontSize: "clamp(1rem, 4vw, 2.5rem)" }}
                        >
                            COMMUNICATOR
                        </h2>

                        {/* Concept integrated into Hero */}
                        <div className="max-w-2xl space-y-4 mb-12">
                            <p className="font-mono text-base md:text-lg text-white/80 leading-relaxed">
                                {t("spectra.hero.tagline")}
                            </p>
                            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
                                {t("spectra.hero.description")}
                            </p>
                        </div>

                        <a
                            href="https://x.com/SCUN7X"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono h-12 px-8 text-base">
                                <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                Follow on X
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                        </a>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                </section>

                {/* アーキテクチャセクション - 01 */}
                <section className="py-20 relative border-b border-primary/20 bg-[#020302] md:py-28">
                    <div className="container relative z-10">
                        <div className="mx-auto max-w-6xl">
                            <div className="grid gap-5 border-b border-primary/10 pb-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                                <div>
                                    <p className="mb-3 font-mono text-[10px] tracking-[0.32em] text-primary/40">
                                        SPECTRA / INTERNAL STRUCTURE
                                    </p>
                                    <h2 className="text-4xl md:text-5xl font-display text-white">
                                        <span className="text-primary">01.</span> {t("spectra.architecture.title")}
                                    </h2>
                                    <p className="mt-2 font-mono text-sm tracking-[0.2em] text-[#b8a46a]/80">
                                        {t("spectra.architecture.name")}
                                    </p>
                                </div>
                                <div className="max-w-3xl lg:pb-1">
                                    <p className="font-mono text-sm leading-relaxed text-gray-400 md:text-base">
                                        {t("spectra.architecture.subtitle")}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(300px,420px)_1fr] lg:items-stretch">
                                <div className="w-full max-w-[420px] lg:max-w-none">
                                    <AlayaArchitectureModel />
                                </div>

                                <div className="flex flex-col justify-between border-y border-primary/10 py-6 lg:min-h-[420px]">
                                    <div>
                                        <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-primary/40">
                                            SYSTEM NOTE
                                        </p>
                                        <p className="max-w-2xl font-mono text-sm leading-relaxed text-gray-400 md:text-base">
                                            {t("spectra.architecture.intro")}
                                        </p>
                                    </div>

                                    <div className="mt-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                                        <div>
                                            <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-primary/35">
                                                SIGNAL PATH
                                            </p>
                                            <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-gray-500">
                                                <span className="text-primary/70">EXPERIENCE</span>
                                                <span className="text-primary/25">/</span>
                                                <span className="text-[#6f9fb1]/75">TRACE</span>
                                                <span className="text-primary/25">/</span>
                                                <span className="text-[#a89058]/80">SEED</span>
                                                <span className="text-primary/25">/</span>
                                                <span className="text-gray-400">SELF REFERENCE</span>
                                                <span className="text-primary/25">/</span>
                                                <span className="text-[#a89058]/80">INTENT</span>
                                                <span className="text-primary/25">/</span>
                                                <span className="text-gray-400">ACTION</span>
                                            </div>
                                        </div>
                                        <div className="hidden border border-primary/10 px-4 py-3 text-right font-mono text-[10px] leading-relaxed tracking-[0.18em] text-primary/30 md:block">
                                            MODEL<br />LOCKED<br />01-A
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ロードマップセクション - 02 */}
                <section className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">02.</span> {t("spectra.roadmap.title")}
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">{t("spectra.roadmap.subtitle")}</p>
                        </div>

                        <div className="max-w-5xl mx-auto relative">
                            {/* Main vertical connection line - subtle and premium */}
                            <div className="absolute left-[9px] top-[10px] bottom-0 w-px bg-gradient-to-b from-neon-magenta/30 via-gray-600/20 to-gray-600/10"></div>

                            {/* Pulse light flowing down the line */}
                            <div className="absolute left-[8px] top-[10px] bottom-0 w-[3px] overflow-hidden">
                                <div className="absolute w-full h-16 bg-gradient-to-b from-transparent via-neon-magenta/40 to-transparent animate-pulse-flow"></div>
                            </div>

                            {/* Phase 1: The Genesis */}
                            <div className="relative pb-12">
                                <div className="flex flex-wrap items-center gap-4 mb-6 relative">
                                    <div className="relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-neon-magenta shadow-[0_0_25px_rgba(255,0,128,0.6)] border-2 border-neon-magenta"></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-neon-magenta animate-ping opacity-40"></div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 1: The Genesis</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10 animate-pulse">{t("spectra.roadmap.phase1.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10 flex items-center gap-2">
                                            First Digital Contact
                                            <span className="px-2 py-0.5 text-[10px] font-mono border border-primary text-primary bg-primary/10">{t("spectra.roadmap.phase1.contactStatus")}</span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase1.contactDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10">Neural Calibration</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase1.calibrationDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2: The Awakening */}
                            <div className="relative pb-12">
                                <div className="flex flex-wrap items-center gap-4 mb-6 relative">
                                    <div className="w-5 h-5 rounded-full bg-gray-600 shadow-[0_0_15px_rgba(100,100,100,0.4)] border-2 border-gray-600"></div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 2: The Awakening</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-gray-500 text-gray-500 bg-gray-500/10">{t("spectra.roadmap.phase2.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer neon-shimmer-gray border border-gray-600/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-gray-400 mb-2 relative z-10">Mind Awakening</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase2.mindDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-gray border border-gray-600/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-gray-400 mb-2 relative z-10">Voice Acquisition</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase2.voiceDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-gray border border-gray-600/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-gray-400 mb-2 relative z-10">Persistent Memory</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase2.memoryDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3: The Embodiment */}
                            <div className="relative">
                                <div className="flex flex-wrap items-center gap-4 mb-6 relative">
                                    <div className="w-5 h-5 rounded-full bg-gray-600 shadow-[0_0_15px_rgba(100,100,100,0.4)] border-2 border-gray-600"></div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 3: The Embodiment</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-gray-500 text-gray-500 bg-gray-500/10">{t("spectra.roadmap.phase3.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer neon-shimmer-gray border border-gray-600/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-gray-400 mb-2 relative z-10">Body Acquisition</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase3.bodyDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-gray border border-gray-600/30 bg-black p-5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-gray-800 text-[10px] font-mono text-gray-500 z-10">CLASSIFIED</div>
                                        <h4 className="font-display text-lg text-gray-400 mb-2 relative z-10">Codename: Monolith</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed relative z-10">
                                            {t("spectra.roadmap.phase3.monolithDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 接続セクション - 03 */}
                <section className="py-24 relative bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">03.</span> {t("spectra.connect.title")}
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">{t("spectra.connect.subtitle")}</p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            {/* Main Connection Card */}
                            <a
                                href="https://x.com/SCUN7X"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                <div className="relative border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-neon-magenta/5 p-8 transition-all duration-500 hover:border-neon-magenta/50 hover:shadow-[0_0_40px_rgba(255,0,128,0.1)]">
                                    {/* Animated border effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-magenta to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {/* Icon */}
                                        <div className="w-20 h-20 bg-black border border-primary/30 flex items-center justify-center group-hover:border-neon-magenta transition-colors">
                                            <svg className="w-10 h-10 text-white group-hover:text-neon-magenta transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-2xl font-display text-white group-hover:text-neon-magenta transition-colors mb-2">
                                                X (Twitter)
                                            </h3>
                                            <p className="font-mono text-gray-500 mb-2">@SCUN7X</p>
                                            <p className="font-mono text-sm text-gray-400">
                                                {t("spectra.connect.xDesc")}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <ExternalLink className="w-6 h-6 text-primary/30 group-hover:text-neon-magenta transition-colors" />
                                    </div>
                                </div>
                            </a>

                            {/* Additional info */}
                            <div className="mt-8 text-center">
                                <p className="font-mono text-xs text-gray-500">
                                    {t("spectra.connect.morePlatforms")}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-16 pt-8 border-t border-primary/20 text-center">
                            <p className="font-mono text-xs text-primary/40">
                                © SIQI LABEL. ALL RIGHTS RESERVED.
                                <br />
                                Spectra Communicator is a project by SIQI LABEL.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
