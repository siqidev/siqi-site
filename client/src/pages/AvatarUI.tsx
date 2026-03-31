import { useState } from "react";
import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Check,
    Code,
    Copy,
    Database,
    ExternalLink,
    Github,
    Globe,
    Radio,
    Shield,
    Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CONTRACT_ADDRESS = "63rvcwia2reibpdJMCf71bPLqBLvPRu9eM2xmRvNory";

export default function AvatarUI() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopyCA = async () => {
        try {
            await navigator.clipboard.writeText(CONTRACT_ADDRESS);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // fallback
            const textarea = document.createElement("textarea");
            textarea.value = CONTRACT_ADDRESS;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title={t("avatarui.seo.title")}
                description={t("avatarui.seo.description")}
            />

            {/* CRT Effects */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="scanline"></div>
            </div>

            <Header variant="page" />

            <main className="flex-1 relative z-10 pt-16">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen grayscale contrast-125">
                            <img
                                src="/images/avatar-ui-demo.gif"
                                alt="Avatar UI Demo"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                        </div>
                    </div>

                    <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            <span className="font-mono text-sm text-primary">Open Source Project</span>
                        </div>

                        <h1
                            className="font-syne font-extrabold leading-none tracking-tighter text-white mb-8"
                            style={{ fontSize: "clamp(2.5rem, 12vw, 10rem)" }}
                        >
                            AVATAR UI
                        </h1>
                        <p className="font-mono text-lg md:text-xl text-white/80 max-w-2xl mb-4">
                            {t("avatarui.hero.tagline")}
                        </p>
                        <p className="font-mono text-sm text-primary/60 max-w-2xl mb-12">
                            {t("avatarui.hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://github.com/siqidev/avatar-ui"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono h-12 px-8 text-base">
                                    <Github className="mr-2 w-5 h-5" />
                                    {t("avatarui.hero.install")}
                                </Button>
                            </a>
                            <a href="#features">
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono h-12 px-8 text-base"
                                >
                                    {t("avatarui.hero.viewFeatures")}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                        </div>

                        {/* CA Copy Badge */}
                        <button
                            onClick={handleCopyCA}
                            className="crt-card neon-shimmer inline-flex items-center gap-1.5 px-4 py-1.5 border border-primary/30 rounded-full bg-black transition-all duration-300 cursor-pointer mt-8 group"
                            title="Copy Contract Address"
                        >
                            <span className="font-mono text-[11px] sm:text-xs text-primary tracking-wide break-all relative z-10">
                                <span className="text-primary/50">CA: </span>{CONTRACT_ADDRESS}
                            </span>
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-primary shrink-0 relative z-10" />
                            ) : (
                                <Copy className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary shrink-0 transition-colors relative z-10" />
                            )}
                        </button>

                        {/* Badges */}
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <a
                                href="https://orynth.dev/projects/avatar-ui"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://orynth.dev/api/badge/avatar-ui?theme=dark&style=default"
                                    alt="Featured on Orynth"
                                    className="h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </a>
                            <a
                                href="https://www.geckoterminal.com/solana/pools/ky7frWSyXRcHKvN7UXyPuhA5rjP1ypDPDJNEHxJubmJ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/images/geckoterminal-logo.png"
                                    alt="GeckoTerminal"
                                    className="h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">01.</span> {t("avatarui.features.title")}
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">
                                {t("avatarui.features.subtitle")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Zap,
                                    title: t("avatarui.features.autonomyTitle"),
                                    descKey: "avatarui.features.autonomy",
                                },
                                {
                                    icon: Database,
                                    title: t("avatarui.features.memoryTitle"),
                                    descKey: "avatarui.features.memory",
                                },
                                {
                                    icon: Globe,
                                    title: t("avatarui.features.channelsTitle"),
                                    descKey: "avatarui.features.channels",
                                },
                                {
                                    icon: Radio,
                                    title: t("avatarui.features.resonanceTitle"),
                                    descKey: "avatarui.features.resonance",
                                },
                                {
                                    icon: Shield,
                                    title: t("avatarui.features.approvalTitle"),
                                    descKey: "avatarui.features.approval",
                                },
                                {
                                    icon: Code,
                                    title: t("avatarui.features.ossTitle"),
                                    descKey: "avatarui.features.oss",
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="border border-primary/30 bg-black p-6 hover:bg-primary/5 transition-all duration-300 group"
                                >
                                    <feature.icon className="w-8 h-8 text-neon-magenta mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-display text-white mb-2">{feature.title}</h3>
                                    <p className="font-mono text-sm text-gray-400">{t(feature.descKey)}</p>
                                </div>
                            ))}                        </div>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">02.</span> {t("avatarui.roadmap.title")}
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">{t("avatarui.roadmap.subtitle")}</p>
                        </div>

                        <div className="max-w-5xl mx-auto relative">
                            {/* Main vertical connection line - subtle and premium */}
                            <div className="absolute left-[9px] top-[10px] bottom-0 w-px bg-gradient-to-b from-primary/30 via-neon-magenta/20 to-gray-600/10"></div>

                            {/* Pulse light flowing down the line */}
                            <div className="absolute left-[8px] top-[10px] bottom-0 w-[3px] overflow-hidden">
                                <div className="absolute w-full h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-pulse-flow"></div>
                            </div>

                            {/* Phase 1: The Core */}
                            <div className="relative pb-12">
                                <div className="flex items-center gap-4 mb-6 relative">
                                    {/* Node */}
                                    <div className="relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_25px_rgba(0,255,65,0.6)] border-2 border-primary"></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary animate-ping opacity-30"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 1: The Core</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-primary text-primary bg-primary/10">{t("avatarui.roadmap.phase1.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer border border-primary/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-primary mb-2 relative z-10 flex items-center gap-2">
                                            Core Foundation
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase1.coreDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer border border-primary/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-primary mb-2 relative z-10 flex items-center gap-2">
                                            Basic UI/UX
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase1.uiDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2: The Awakening */}
                            <div className="relative pb-12">
                                <div className="flex items-center gap-4 mb-6 relative">
                                    <div className="relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_25px_rgba(0,255,65,0.6)] border-2 border-primary"></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-primary animate-ping opacity-30"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 2: The Awakening</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-primary text-primary bg-primary/10">{t("avatarui.roadmap.phase2.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer border border-primary/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-primary mb-2 relative z-10 flex items-center gap-2">
                                            Identity & Memory
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase2.identityDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer border border-primary/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-primary mb-2 relative z-10 flex items-center gap-2">
                                            Coexistence Engine
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase2.engineDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer border border-primary/30 bg-black p-5 md:col-span-2 lg:col-span-1">
                                        <h4 className="font-display text-lg text-primary mb-2 relative z-10 flex items-center gap-2">
                                            Monolith: First Contact
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase2.monolithDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3: The Presence */}
                            <div className="relative pb-12">
                                <div className="flex items-center gap-4 mb-6 relative">
                                    <div className="relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-neon-magenta shadow-[0_0_25px_rgba(255,0,128,0.6)] border-2 border-neon-magenta"></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-neon-magenta animate-ping opacity-40"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 3: The Presence</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10 animate-pulse">{t("avatarui.roadmap.phase3.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10 flex items-center gap-2">
                                            Social Presence
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,65,0.6)]" title="Complete"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase3.socialDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10 flex items-center gap-2">
                                            Sensory Interface
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" title="In Progress"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase3.sensoryDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5 md:col-span-2 lg:col-span-1">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10">Monolith: Deep Dive</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase3.monolithDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 4: The Horizon */}
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6 relative">
                                    <div className="relative z-10">
                                        <div className="w-5 h-5 rounded-full bg-neon-magenta shadow-[0_0_25px_rgba(255,0,128,0.6)] border-2 border-neon-magenta"></div>
                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-neon-magenta animate-ping opacity-40"></div>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 4: The Horizon</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10 animate-pulse">{t("avatarui.roadmap.phase4.status")}</span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10 flex items-center gap-2">
                                            Multi-Channel Gateway
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" title="In Progress"></span>
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase4.channelDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10">Co-Evolution</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase4.evolutionDesc")}
                                        </p>
                                    </div>
                                    <div className="crt-card neon-shimmer neon-shimmer-magenta border border-neon-magenta/30 bg-black p-5 md:col-span-2 lg:col-span-1">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2 relative z-10">Monolith: Open World</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed relative z-10">
                                            {t("avatarui.roadmap.phase4.monolithDesc")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">03.</span> {t("avatarui.faq.title")}
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">{t("avatarui.faq.subtitle")}</p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-6">
                            {[
                                {
                                    qKey: "avatarui.faq.q1",
                                    aKey: "avatarui.faq.a1",
                                },
                                {
                                    qKey: "avatarui.faq.q2",
                                    aKey: "avatarui.faq.a2",
                                },
                                {
                                    qKey: "avatarui.faq.q3",
                                    aKey: "avatarui.faq.a3",
                                },
                                {
                                    qKey: "avatarui.faq.q4",
                                    aKey: "avatarui.faq.a4",
                                },
                            ].map((faq, i) => (
                                <div key={i} className="border border-primary/30 bg-black p-6 hover:bg-primary/5 transition-colors">
                                    <h3 className="text-lg font-display text-white mb-2 flex items-start gap-3">
                                        <span className="text-neon-magenta">Q.</span>
                                        {t(faq.qKey)}
                                    </h3>
                                    <p className="font-mono text-sm text-gray-400 pl-7">
                                        <span className="text-primary">A.</span> {t(faq.aKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative bg-black">
                    <div className="container relative z-10 text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-8">GET_STARTED</h2>
                        <p className="font-mono text-gray-400 mb-8">
                            {t("avatarui.cta.subtitle")}
                        </p>

                        <div className="bg-black/50 border border-primary/30 p-6 mb-8">
                            <p className="font-mono text-sm text-gray-400 mb-4">
                                {t("avatarui.cta.readme")}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="https://github.com/siqidev/avatar-ui#readme"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono w-full sm:w-auto"
                                    >
                                        {t("avatarui.cta.readReadme")}
                                    </Button>
                                </a>
                                <a
                                    href="https://github.com/siqidev/avatar-ui"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono w-full sm:w-auto">
                                        <Github className="mr-2 w-5 h-5" />
                                        {t("avatarui.cta.viewRepo")}
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-primary/20">
                            <p className="font-mono text-xs text-primary/40">
                                © 2025-2026 SIQI LABEL. ALL RIGHTS RESERVED.
                                <br />
                                AVATAR UI is released under the MIT License.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
