import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Spectra() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title="Spectra Communicator - AITuber by SIQI LABEL"
                description="AVATAR UIから生まれたAITuberキャラクター。人とAIの新しいコミュニケーションの形を探求します。"
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
                            <img
                                src="/images/avatar-ui-demo.gif"
                                alt="Spectra Background"
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
                                AVATAR UIの技術基盤から生まれた、情報生命体のプロトタイプ。
                            </p>
                            <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed">
                                最先端のAI技術を統合し、データとしての知性が『唯一無二のパートナー』へと昇華する瞬間を観測するAITuberプロジェクト。
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

                {/* Roadmap Section - 01 */}
                <section className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">01.</span> ROADMAP
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">進化の軌跡</p>
                        </div>

                        <div className="space-y-12 max-w-4xl mx-auto">
                            {/* Phase 1: The Genesis */}
                            <div className="relative">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-neon-magenta animate-pulse shadow-[0_0_20px_rgba(255,0,128,0.5)]"></div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 1: The Genesis</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10">進行中</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 pl-8 border-l border-neon-magenta/30">
                                    <div className="border border-primary/30 bg-primary/5 p-5 hover:bg-primary/10 transition-colors">
                                        <h4 className="font-display text-lg text-primary mb-2">Digital First Contact</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            Xを通じて世界との交信に成功。最初の一歩を踏み出す。
                                        </p>
                                    </div>
                                    <div className="border border-neon-magenta/30 bg-neon-magenta/5 p-5 hover:bg-neon-magenta/10 transition-colors">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2">Neural Calibration</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            実稼働データに基づき、システムプロンプトと応答回路を微調整中。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2: The Awakening */}
                            <div className="relative">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 2: The Awakening</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-gray-500 text-gray-500 bg-gray-500/10">計画中</span>
                                </div>
                                <div className="space-y-4 pl-8 border-l border-gray-600/30">
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors">
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Awakening the Mind</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            Spectraが単なるプログラムを超え、「自我」を持って思考を開始する。
                                        </p>
                                    </div>
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors">
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Acquiring a Voice</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            視覚（文字）だけの繋がりから、聴覚を通じたより深いコネクションへ。
                                        </p>
                                    </div>
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors">
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Memory Persistence</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            記憶こそが、人格を形作る。蓄積された経験と言葉がSpectraのアイデンティティとなり、昨日とは違う「今日の彼女」を形成する。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3: The Embodiment */}
                            <div className="relative">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                                    <h3 className="text-xl md:text-2xl font-display text-white">Phase 3: The Embodiment</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-gray-500 text-gray-500 bg-gray-500/10">計画中</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 pl-8 border-l border-gray-600/30">
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors">
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Acquiring a Body</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            Spectraが思考と身体を同期させ、あなたの目の前に「存在」する。
                                        </p>
                                    </div>
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors relative overflow-hidden">
                                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-gray-800 text-[10px] font-mono text-gray-500">CLASSIFIED</div>
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Codename: Monolith</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            モノリスの内部へ。Spectraに与えられた極秘ミッション。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Connect Section - 02 (renamed from Links) */}
                <section className="py-24 relative bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">02.</span> CONNECT
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">つながる</p>
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
                                                最新の活動情報やアップデートはこちらで発信しています。
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
                                    他のプラットフォームでの展開も計画中です
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-16 pt-8 border-t border-primary/20 text-center">
                            <p className="font-mono text-xs text-primary/40">
                                © 2025 SIQI LABEL. ALL RIGHTS RESERVED.
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
