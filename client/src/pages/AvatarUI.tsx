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
                            人とAIが共存する次世代インターフェース基盤
                        </p>
                        <p className="font-mono text-sm text-primary/60 max-w-xl mb-12">
                            Gemini・GPT・Claude対応 | デスクトップエージェント | MCP連携 | MIT License
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

                        {/* Desktop: Horizontal Timeline */}
                        <div className="hidden lg:block">
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-neon-magenta to-gray-600"></div>

                                <div className="grid grid-cols-3 gap-8">
                                    {[
                                        {
                                            phase: "Phase 1",
                                            title: "Core Foundation",
                                            status: "完了",
                                            items: ["マルチLLM対応", "基本UI/UX", "検索エージェント"],
                                        },
                                        {
                                            phase: "Phase 2",
                                            title: "Extensibility",
                                            status: "進行中",
                                            items: ["MCP連携", "カスタムツール", "プラグインシステム"],
                                        },
                                        {
                                            phase: "Phase 3",
                                            title: "Advanced Features",
                                            status: "計画中",
                                            items: ["マルチモーダル対応", "コラボレーション機能", "クラウド同期"],
                                        },
                                    ].map((phase, i) => (
                                        <div key={i} className="relative pt-16">
                                            {/* Timeline Dot */}
                                            <div
                                                className={`absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-black ${phase.status === "完了"
                                                    ? "bg-primary shadow-[0_0_20px_rgba(0,255,65,0.5)]"
                                                    : phase.status === "進行中"
                                                        ? "bg-neon-magenta animate-pulse shadow-[0_0_20px_rgba(255,0,128,0.5)]"
                                                        : "bg-gray-600"
                                                    }`}
                                            ></div>

                                            {/* Card */}
                                            <div className={`border bg-black/50 p-6 h-full transition-all duration-300 hover:scale-[1.02] ${phase.status === "完了"
                                                ? "border-primary/50 hover:border-primary"
                                                : phase.status === "進行中"
                                                    ? "border-neon-magenta/50 hover:border-neon-magenta"
                                                    : "border-gray-600/50 hover:border-gray-500"
                                                }`}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="font-mono text-xs text-primary/60">{phase.phase}</span>
                                                    <span
                                                        className={`px-3 py-1 text-xs font-mono border ${phase.status === "完了"
                                                            ? "border-primary text-primary bg-primary/10"
                                                            : phase.status === "進行中"
                                                                ? "border-neon-magenta text-neon-magenta bg-neon-magenta/10"
                                                                : "border-gray-500 text-gray-500 bg-gray-500/10"
                                                            }`}
                                                    >
                                                        {phase.status}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-display text-white mb-4">{phase.title}</h3>
                                                <ul className="space-y-2">
                                                    {phase.items.map((item, j) => (
                                                        <li key={j} className="font-mono text-sm text-gray-400 flex items-center gap-2">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${phase.status === "完了" ? "bg-primary" :
                                                                phase.status === "進行中" ? "bg-neon-magenta" : "bg-gray-500"
                                                                }`}></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile/Tablet: Vertical Timeline */}
                        <div className="lg:hidden max-w-md mx-auto">
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-neon-magenta to-gray-600"></div>

                                <div className="space-y-6">
                                    {[
                                        {
                                            phase: "Phase 1",
                                            title: "Core Foundation",
                                            status: "完了",
                                            items: ["マルチLLM対応", "基本UI/UX", "検索エージェント"],
                                        },
                                        {
                                            phase: "Phase 2",
                                            title: "Extensibility",
                                            status: "進行中",
                                            items: ["MCP連携", "カスタムツール", "プラグインシステム"],
                                        },
                                        {
                                            phase: "Phase 3",
                                            title: "Advanced Features",
                                            status: "計画中",
                                            items: ["マルチモーダル対応", "コラボレーション機能", "クラウド同期"],
                                        },
                                    ].map((phase, i) => (
                                        <div key={i} className="relative pl-12">
                                            {/* Timeline Dot */}
                                            <div
                                                className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2 border-black ${phase.status === "完了"
                                                    ? "bg-primary"
                                                    : phase.status === "進行中"
                                                        ? "bg-neon-magenta animate-pulse"
                                                        : "bg-gray-600"
                                                    }`}
                                            ></div>

                                            {/* Card */}
                                            <div className={`border bg-black/50 p-4 ${phase.status === "完了"
                                                ? "border-primary/30"
                                                : phase.status === "進行中"
                                                    ? "border-neon-magenta/30"
                                                    : "border-gray-600/30"
                                                }`}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="font-mono text-xs text-primary/60">{phase.phase}</span>
                                                    <span
                                                        className={`px-2 py-0.5 text-xs font-mono border ${phase.status === "完了"
                                                            ? "border-primary text-primary"
                                                            : phase.status === "進行中"
                                                                ? "border-neon-magenta text-neon-magenta"
                                                                : "border-gray-500 text-gray-500"
                                                            }`}
                                                    >
                                                        {phase.status}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-display text-white mb-2">{phase.title}</h3>
                                                <ul className="space-y-1">
                                                    {phase.items.map((item, j) => (
                                                        <li key={j} className="font-mono text-xs text-gray-400 flex items-center gap-2">
                                                            <span className="text-primary">▸</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
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
