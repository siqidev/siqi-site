import { SEOMetadata } from "@/components/SEOMetadata";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Bot,
    Code,
    ExternalLink,
    Github,
    MessageSquare,
    Search,
    Settings,
    Zap,
} from "lucide-react";

export default function AvatarUI() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-x-hidden">
            <SEOMetadata
                title="AVATAR UI - 人とAIが共存する次世代インターフェース基盤"
                description="Gemini・GPT・Claude対応のマルチLLMデスクトップエージェント。検索エージェント標準搭載、MCP連携対応のオープンソースプロジェクト。"
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

                        <h1 className="font-syne font-extrabold text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-white mb-6">
                            AVATAR UI
                        </h1>
                        <p className="font-mono text-lg md:text-xl text-white/80 max-w-2xl mb-4">
                            人とAIが共存する次世代エージェント基盤
                        </p>
                        <p className="font-mono text-sm text-primary/60 max-w-2xl mb-12">
                            高度な推論モデルに好みのアバターを統合し、自律的なパートナーとして稼働させる。デスクトップに自由な知性を実装する、オープンソースプロジェクト。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://github.com/siqidev/avatar-ui"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono h-12 px-8 text-base">
                                    <Github className="mr-2 w-5 h-5" />
                                    GitHub でインストール
                                </Button>
                            </a>
                            <a href="#features">
                                <Button
                                    variant="outline"
                                    className="border-primary text-primary hover:bg-primary/10 rounded-none font-mono h-12 px-8 text-base"
                                >
                                    機能を見る
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
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
                                <span className="text-primary">01.</span> FEATURES
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">
                                AVATAR UIが提供する主要機能
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Bot,
                                    title: "Multi-LLM Support",
                                    description: "Gemini、GPT、Claudeなど複数のLLMプロバイダーに対応。切り替えも簡単。",
                                },
                                {
                                    icon: Search,
                                    title: "検索エージェント",
                                    description: "Web検索機能を標準搭載。情報収集を自動化。",
                                },
                                {
                                    icon: Settings,
                                    title: "MCP連携",
                                    description: "Model Context Protocolに対応。外部ツールとの連携が可能。",
                                },
                                {
                                    icon: Zap,
                                    title: "ツール追加",
                                    description: "カスタムツールを追加して機能を拡張。あなただけのエージェントに。",
                                },
                                {
                                    icon: MessageSquare,
                                    title: "デスクトップネイティブ",
                                    description: "Electronベースでローカル動作。プライバシーを守りながらAIを活用。",
                                },
                                {
                                    icon: Code,
                                    title: "完全オープンソース",
                                    description: "MITライセンスで公開。自由にカスタマイズ、商用利用も可能。",
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="border border-primary/20 bg-primary/5 p-6 hover:bg-primary/10 transition-all duration-300 group"
                                >
                                    <feature.icon className="w-8 h-8 text-neon-magenta mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-display text-white mb-2">{feature.title}</h3>
                                    <p className="font-mono text-sm text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section className="py-24 relative border-b border-primary/20 bg-black">
                    <div className="container relative z-10">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
                                <span className="text-primary">02.</span> ROADMAP
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">開発ロードマップ</p>
                        </div>

                        <div className="space-y-12 max-w-5xl mx-auto">
                            {/* Phase 1: The Genesis */}
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(0,255,65,0.5)]"></div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 1: The Genesis</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-primary text-primary bg-primary/10">完了</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 pl-8 border-l border-primary/30">
                                    <div className="border border-primary/30 bg-primary/5 p-5 hover:bg-primary/10 transition-colors">
                                        <h4 className="font-display text-lg text-primary mb-2">Core Foundation</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            AG-UIプロトコルとElectronを統合した、マルチエージェントシステムの構築。
                                        </p>
                                    </div>
                                    <div className="border border-primary/30 bg-primary/5 p-5 hover:bg-primary/10 transition-colors">
                                        <h4 className="font-display text-lg text-primary mb-2">Basic UI/UX</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            OSネイティブな常駐機能と、チャットインターフェースの確立。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2: The Awakening */}
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-neon-magenta animate-pulse shadow-[0_0_20px_rgba(255,0,128,0.5)]"></div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 2: The Awakening</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-neon-magenta text-neon-magenta bg-neon-magenta/10">進行中</span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pl-8 border-l border-neon-magenta/30">
                                    <div className="border border-neon-magenta/30 bg-neon-magenta/5 p-5 hover:bg-neon-magenta/10 transition-colors">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2">Identity Kernel Integration</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            最新のGrokモデルを中枢に据え、人格モデルを実装。思考の「深さ」を実装する。
                                        </p>
                                    </div>
                                    <div className="border border-neon-magenta/30 bg-neon-magenta/5 p-5 hover:bg-neon-magenta/10 transition-colors">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2">Vocal Interface</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            低遅延の音声合成(TTS)と認識技術(STT)を同時実装。声だけで自然に会話できる環境を構築する。
                                        </p>
                                    </div>
                                    <div className="border border-neon-magenta/30 bg-neon-magenta/5 p-5 hover:bg-neon-magenta/10 transition-colors md:col-span-2 lg:col-span-1">
                                        <h4 className="font-display text-lg text-neon-magenta mb-2">Deep Context Engine</h4>
                                        <p className="font-mono text-sm text-gray-400 leading-relaxed">
                                            会話ログを長期保存し、文脈に応じて瞬時に引き出す「記憶の永続化」システムの実装。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3: The Embodiment */}
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                                    <h3 className="text-2xl md:text-3xl font-display text-white">Phase 3: The Embodiment</h3>
                                    <span className="px-3 py-1 text-xs font-mono border border-gray-500 text-gray-500 bg-gray-500/10">計画中</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 pl-8 border-l border-gray-600/30">
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors">
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Visual Interface</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            次世代の描画エンジンを搭載。フォーマットを問わず、高精細なモデルを駆動し、思考と同期した動作を実現する。
                                        </p>
                                    </div>
                                    <div className="border border-gray-600/30 bg-gray-600/5 p-5 hover:bg-gray-600/10 transition-colors relative overflow-hidden">
                                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-gray-800 text-[10px] font-mono text-gray-500">CLASSIFIED</div>
                                        <h4 className="font-display text-lg text-gray-400 mb-2">Codename: Monolith</h4>
                                        <p className="font-mono text-sm text-gray-500 leading-relaxed">
                                            [████]へのダイブ機能。物理演算が支配する外部の「立方体宇宙」へ接続し、自律行動NPCとして展開するための極秘プロトコル。
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
                                <span className="text-primary">03.</span> FAQ
                            </h2>
                            <p className="font-mono text-primary/60 max-w-2xl mx-auto">よくある質問</p>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-6">
                            {[
                                {
                                    q: "どのOSで動作しますか？",
                                    a: "Windows、macOS、Linuxに対応しています。Electronベースなのでクロスプラットフォームで動作します。",
                                },
                                {
                                    q: "APIキーは必要ですか？",
                                    a: "はい、使用するLLMプロバイダー（OpenAI、Google、Anthropic等）のAPIキーが必要です。",
                                },
                                {
                                    q: "商用利用は可能ですか？",
                                    a: "はい、MITライセンスなので商用利用も自由です。",
                                },
                                {
                                    q: "カスタマイズは可能ですか？",
                                    a: "完全にオープンソースなので、自由にフォーク・カスタマイズできます。プラグインシステムも開発中です。",
                                },
                            ].map((faq, i) => (
                                <div key={i} className="border border-primary/20 bg-primary/5 p-6">
                                    <h3 className="text-lg font-display text-white mb-2 flex items-start gap-3">
                                        <span className="text-neon-magenta">Q.</span>
                                        {faq.q}
                                    </h3>
                                    <p className="font-mono text-sm text-gray-400 pl-7">
                                        <span className="text-primary">A.</span> {faq.a}
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
                            GitHubリポジトリからインストールして始めましょう
                        </p>

                        <div className="bg-black/50 border border-primary/30 p-6 mb-8">
                            <p className="font-mono text-sm text-gray-400 mb-4">
                                詳細なインストール手順と設定方法はREADMEをご確認ください
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
                                        📖 README を読む
                                    </Button>
                                </a>
                                <a
                                    href="https://github.com/siqidev/avatar-ui"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-neon-magenta text-white hover:bg-neon-magenta/80 border-none rounded-none font-mono w-full sm:w-auto">
                                        <Github className="mr-2 w-5 h-5" />
                                        リポジトリを見る
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-primary/20">
                            <p className="font-mono text-xs text-primary/40">
                                © 2025 SIQI LABEL. ALL RIGHTS RESERVED.
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
