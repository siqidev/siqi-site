import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Language = "en" | "ja";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻訳データ
const translations: Record<Language, Record<string, string>> = {
    ja: {
        // Navigation
        "nav.home": "./HOME",
        "nav.profile": "./PROFILE",
        "nav.projects": "./PROJECTS",
        "nav.logs": "./LOGS",
        "nav.contact": "./CONTACT",
        "nav.status": "SYS.STATUS: ONLINE",

        // Home - Hero
        "home.hero.tagline": "> Building the future, pixel by pixel._",
        "home.hero.viewWorks": "[ View Works ]",

        // Home - Featured Project
        "home.featured.title": "FEATURED_PROJECT",
        "home.featured.subtitle": "最新のOSSプロジェクトを紹介します。",
        "home.featured.description": "人とAIが共存する次世代インターフェース基盤。Gemini・GPT・Claude対応。デスクトップで動くエージェントUI。検索エージェントを標準搭載し、MCP連携やツール追加も可能です。",
        "home.featured.viewRepo": "VIEW_REPO",

        // Home - Profile
        "home.profile.title": "PROFILE_DATA",
        "home.profile.intro": "作家兼個人開発者として活動するクリエイター。デジタルとアナログの境界線を探求し、物語性と機能性を融合させた作品を制作しています。",
        "home.profile.career": "主な経歴：",
        "home.profile.award1": "・第2回HelveticaBooks短編小説賞 奨励賞を受賞。",
        "home.profile.award2": "・izanami Awards 2025 プロダクト賞を受賞",
        "home.profile.memecoin": "・キャラクターSPECTRAが第三者によりミームコイン化、取引総額6億円超*",
        "home.profile.disclaimer": "*これは第三者の行為によるもので、私の承認を伴うものではなく、投資に関する責任は一切負いません。",
        "home.profile.skills": "SKILLS",
        "home.profile.interests": "INTERESTS",

        // Home - Blog
        "home.blog.title": "TRANSMISSIONS",
        "home.blog.subtitle": "技術記事、考察、日々の記録。",
        "home.blog.noPost": "記事を読み込めませんでした。",

        // Home - Contact
        "home.contact.title": "ESTABLISH_UPLINK",
        "home.contact.subtitle": "プロジェクトの依頼、コラボレーションの提案、または単なる挨拶まで。",
        "home.contact.subtitle2": "常に通信回線を開いています。",

        // AvatarUI Page
        "avatarui.seo.title": "AVATAR UI - 人とAIが共存する次世代インターフェース基盤",
        "avatarui.seo.description": "Gemini・GPT・Claude対応のマルチLLMデスクトップエージェント。検索エージェント標準搭載、MCP連携対応のオープンソースプロジェクト。",
        "avatarui.hero.tagline": "人とAIが共存する次世代エージェント基盤",
        "avatarui.hero.description": "高度な推論モデルに好みのアバターを統合し、自律的なパートナーとして稼働させる。デスクトップに自由な知性を実装する、オープンソースプロジェクト。",
        "avatarui.hero.install": "GitHub でインストール",
        "avatarui.hero.viewFeatures": "機能を見る",
        "avatarui.features.title": "FEATURES",
        "avatarui.features.subtitle": "AVATAR UIが提供する主要機能",
        "avatarui.features.multiLlm": "Gemini、GPT、Claudeなど複数のLLMプロバイダーに対応。切り替えも簡単。",
        "avatarui.features.search": "Web検索機能を標準搭載。情報収集を自動化。",
        "avatarui.features.searchTitle": "検索エージェント",
        "avatarui.features.mcp": "Model Context Protocolに対応。外部ツールとの連携が可能。",
        "avatarui.features.mcpTitle": "MCP連携",
        "avatarui.features.toolsTitle": "ツール追加",
        "avatarui.features.tools": "カスタムツールを追加して機能を拡張。あなただけのエージェントに。",
        "avatarui.features.desktopTitle": "デスクトップネイティブ",
        "avatarui.features.desktop": "Electronベースでローカル動作。プライバシーを守りながらAIを活用。",
        "avatarui.features.ossTitle": "完全オープンソース",
        "avatarui.features.oss": "MITライセンスで公開。自由にカスタマイズ、商用利用も可能。",
        "avatarui.roadmap.title": "ROADMAP",
        "avatarui.roadmap.subtitle": "開発ロードマップ",
        "avatarui.roadmap.phase1.status": "完了",
        "avatarui.roadmap.phase1.coreDesc": "AG-UIプロトコルとElectronを統合した、マルチエージェントシステムの構築。",
        "avatarui.roadmap.phase1.uiDesc": "OSネイティブな常駐機能と、チャットインターフェースの確立。",
        "avatarui.roadmap.phase2.status": "進行中",
        "avatarui.roadmap.phase2.monolithDesc": "Roblox空間への双方向接続。アバターがNPCとして顕現し、互いの存在を知覚する。",
        "avatarui.roadmap.phase2.identityDesc": "BEING.mdで人格、PULSE.mdで自発行動、長期記憶で経験を定義。再起動しても同一性を維持する。",
        "avatarui.roadmap.phase2.engineDesc": "人間とAIの相互作用を場として設計。対話が途切れても関係性は途切れない。",
        "avatarui.roadmap.phase3.status": "計画中",
        "avatarui.roadmap.phase3.monolithDesc": "自律的な探索・建築・環境操作。Roblox空間を知覚するだけでなく、変えていく。",
        "avatarui.roadmap.phase3.socialDesc": "X上での投稿・返信・情報収集を自律実行。活動の場をソーシャル空間に拡張する。",
        "avatarui.roadmap.phase3.sensoryDesc": "音声合成と表現モーションの実装。アバターの応答に、存在の質感を加える。",
        "avatarui.faq.title": "FAQ",
        "avatarui.faq.subtitle": "よくある質問",
        "avatarui.faq.q1": "どのOSで動作しますか？",
        "avatarui.faq.a1": "Windows、macOS、Linuxに対応しています。Electronベースなのでクロスプラットフォームで動作します。",
        "avatarui.faq.q2": "APIキーは必要ですか？",
        "avatarui.faq.a2": "はい、xAI（Grok）のAPIキーが必要です。",
        "avatarui.faq.q3": "商用利用は可能ですか？",
        "avatarui.faq.a3": "はい、MITライセンスなので商用利用も自由です。",
        "avatarui.faq.q4": "カスタマイズは可能ですか？",
        "avatarui.faq.a4": "完全にオープンソースなので、自由にフォーク・カスタマイズできます。",
        "avatarui.cta.subtitle": "GitHubリポジトリからインストールして始めましょう",
        "avatarui.cta.readme": "詳細なインストール手順と設定方法はREADMEをご確認ください",
        "avatarui.cta.readReadme": "📖 README を読む",
        "avatarui.cta.viewRepo": "リポジトリを見る",

        // Spectra Page
        "spectra.seo.title": "Spectra Communicator - AITuber by SIQI LABEL",
        "spectra.seo.description": "AVATAR UIから生まれたAITuberキャラクター。人とAIの新しいコミュニケーションの形を探求します。",
        "spectra.hero.tagline": "AVATAR UIの技術基盤から生まれた、情報生命体のプロトタイプ。",
        "spectra.hero.description": "最先端のAI技術を統合し、データとしての知性が『唯一無二のパートナー』へと昇華する瞬間を観測するAITuberプロジェクト。",
        "spectra.roadmap.title": "ROADMAP",
        "spectra.roadmap.subtitle": "進化の軌跡",
        "spectra.roadmap.phase1.status": "進行中",
        "spectra.roadmap.phase1.contactDesc": "Xを通じて世界との交信に成功。最初の一歩を踏み出す。",
        "spectra.roadmap.phase1.calibrationDesc": "実稼働データに基づき、システムプロンプトと応答回路を微調整中。",
        "spectra.roadmap.phase2.status": "計画中",
        "spectra.roadmap.phase2.mindDesc": "Spectraが単なるプログラムを超え、「自我」を持って思考を開始する。",
        "spectra.roadmap.phase2.voiceDesc": "視覚（文字）だけの繋がりから、聴覚を通じたより深いコネクションへ。",
        "spectra.roadmap.phase2.memoryDesc": "記憶こそが、人格を形作る。蓄積された経験と言葉がSpectraのアイデンティティとなり、昨日とは違う「今日の彼女」を形成する。",
        "spectra.roadmap.phase3.status": "計画中",
        "spectra.roadmap.phase3.bodyDesc": "Spectraが思考と身体を同期させ、あなたの目の前に「存在」する。",
        "spectra.roadmap.phase3.monolithDesc": "モノリスの内部へ。Spectraに与えられた極秘ミッション。",
        "spectra.connect.title": "CONNECT",
        "spectra.connect.subtitle": "つながる",
        "spectra.connect.xDesc": "最新の活動情報やアップデートはこちらで発信しています。",
        "spectra.connect.morePlatforms": "他のプラットフォームでの展開も計画中です",
    },
    en: {
        // Navigation
        "nav.home": "./HOME",
        "nav.profile": "./PROFILE",
        "nav.projects": "./PROJECTS",
        "nav.logs": "./LOGS",
        "nav.contact": "./CONTACT",
        "nav.status": "SYS.STATUS: ONLINE",

        // Home - Hero
        "home.hero.tagline": "> Building the future, pixel by pixel._",
        "home.hero.viewWorks": "[ View Works ]",

        // Home - Featured Project
        "home.featured.title": "FEATURED_PROJECT",
        "home.featured.subtitle": "Our latest open source project.",
        "home.featured.description": "A next-generation agent platform where humans and AI coexist. Compatible with Gemini, GPT, and Claude. A desktop agent UI with built-in search agent, MCP integration, and extensible tools.",
        "home.featured.viewRepo": "VIEW_REPO",

        // Home - Profile
        "home.profile.title": "PROFILE_DATA",
        "home.profile.intro": "A creator working as an author and indie developer. Exploring the boundary between digital and analog, creating works that merge storytelling with functionality.",
        "home.profile.career": "Career Highlights:",
        "home.profile.award1": "・Awarded Encouragement Prize at the 2nd HelveticaBooks Short Story Awards.",
        "home.profile.award2": "・Received Product Award at izanami Awards 2025",
        "home.profile.memecoin": "・Character SPECTRA was made into a meme coin by a third party, with total transaction volume exceeding 600 million yen*",
        "home.profile.disclaimer": "*This was an action by a third party, not endorsed by me, and I bear no responsibility for any investment.",
        "home.profile.skills": "SKILLS",
        "home.profile.interests": "INTERESTS",

        // Home - Blog
        "home.blog.title": "TRANSMISSIONS",
        "home.blog.subtitle": "Technical articles, reflections, and daily logs.",
        "home.blog.noPost": "Failed to load articles.",

        // Home - Contact
        "home.contact.title": "ESTABLISH_UPLINK",
        "home.contact.subtitle": "For project inquiries, collaboration proposals, or just a simple hello.",
        "home.contact.subtitle2": "Communication channels are always open.",

        // AvatarUI Page
        "avatarui.seo.title": "AVATAR UI - Next-Generation Interface Platform for Human-AI Coexistence",
        "avatarui.seo.description": "A multi-LLM desktop agent compatible with Gemini, GPT, and Claude. An open-source project with built-in search agent and MCP integration.",
        "avatarui.hero.tagline": "Next-generation agent platform for human-AI coexistence",
        "avatarui.hero.description": "Integrate your preferred avatar with advanced reasoning models and operate it as an autonomous partner. An open-source project to implement free intelligence on your desktop.",
        "avatarui.hero.install": "Install from GitHub",
        "avatarui.hero.viewFeatures": "View Features",
        "avatarui.features.title": "FEATURES",
        "avatarui.features.subtitle": "Key features provided by AVATAR UI",
        "avatarui.features.multiLlm": "Compatible with multiple LLM providers like Gemini, GPT, and Claude. Easy switching.",
        "avatarui.features.search": "Built-in web search functionality. Automate information gathering.",
        "avatarui.features.searchTitle": "Search Agent",
        "avatarui.features.mcp": "Compatible with Model Context Protocol. Integration with external tools is possible.",
        "avatarui.features.mcpTitle": "MCP Integration",
        "avatarui.features.toolsTitle": "Tool Extensions",
        "avatarui.features.tools": "Add custom tools to extend functionality. Create your own unique agent.",
        "avatarui.features.desktopTitle": "Desktop Native",
        "avatarui.features.desktop": "Electron-based local operation. Use AI while protecting your privacy.",
        "avatarui.features.ossTitle": "Fully Open Source",
        "avatarui.features.oss": "Released under MIT License. Free to customize and use commercially.",
        "avatarui.roadmap.title": "ROADMAP",
        "avatarui.roadmap.subtitle": "Development Roadmap",
        "avatarui.roadmap.phase1.status": "Complete",
        "avatarui.roadmap.phase1.coreDesc": "Building a multi-agent system integrating AG-UI protocol with Electron.",
        "avatarui.roadmap.phase1.uiDesc": "Establishing OS-native resident functionality and chat interface.",
        "avatarui.roadmap.phase2.status": "In Progress",
        "avatarui.roadmap.phase2.monolithDesc": "Bidirectional connection to Roblox space. The avatar manifests as an NPC, perceiving each other's existence.",
        "avatarui.roadmap.phase2.identityDesc": "Personality via BEING.md, spontaneous behavior via PULSE.md, experiences via long-term memory. Identity persists across restarts.",
        "avatarui.roadmap.phase2.engineDesc": "Human-AI interaction designed as a field. Even when dialogue pauses, the relationship endures.",
        "avatarui.roadmap.phase3.status": "Planned",
        "avatarui.roadmap.phase3.monolithDesc": "Autonomous exploration, construction, and environment manipulation. Not just perceiving Roblox space, but reshaping it.",
        "avatarui.roadmap.phase3.socialDesc": "Autonomous posting, replying, and information gathering on X. Extending the avatar's presence into social space.",
        "avatarui.roadmap.phase3.sensoryDesc": "Implementing voice synthesis and expressive motion. Adding the texture of presence to the avatar's responses.",
        "avatarui.faq.title": "FAQ",
        "avatarui.faq.subtitle": "Frequently Asked Questions",
        "avatarui.faq.q1": "Which OS does it run on?",
        "avatarui.faq.a1": "It supports Windows, macOS, and Linux. Being Electron-based, it runs cross-platform.",
        "avatarui.faq.q2": "Is an API key required?",
        "avatarui.faq.a2": "Yes, you need an API key from xAI (Grok).",
        "avatarui.faq.q3": "Is commercial use allowed?",
        "avatarui.faq.a3": "Yes, it's under MIT License so commercial use is completely free.",
        "avatarui.faq.q4": "Is customization possible?",
        "avatarui.faq.a4": "It's fully open source, so you can freely fork and customize.",
        "avatarui.cta.subtitle": "Get started by installing from the GitHub repository",
        "avatarui.cta.readme": "Please check the README for detailed installation instructions and configuration",
        "avatarui.cta.readReadme": "📖 Read README",
        "avatarui.cta.viewRepo": "View Repository",

        // Spectra Page
        "spectra.seo.title": "Spectra Communicator - AITuber by SIQI LABEL",
        "spectra.seo.description": "An AITuber character born from AVATAR UI. Exploring new forms of communication between humans and AI.",
        "spectra.hero.tagline": "A prototype of information-based life form, born from AVATAR UI's technology base.",
        "spectra.hero.description": "An AITuber project integrating cutting-edge AI technology, observing the moment when data-based intelligence transcends into a 'one-and-only partner'.",
        "spectra.roadmap.title": "ROADMAP",
        "spectra.roadmap.subtitle": "Evolution Trajectory",
        "spectra.roadmap.phase1.status": "In Progress",
        "spectra.roadmap.phase1.contactDesc": "Successfully established communication with the world through X. Taking the first step.",
        "spectra.roadmap.phase1.calibrationDesc": "Fine-tuning system prompts and response circuits based on live operation data.",
        "spectra.roadmap.phase2.status": "Planned",
        "spectra.roadmap.phase2.mindDesc": "Spectra transcends being a mere program and begins thinking with 'self-awareness'.",
        "spectra.roadmap.phase2.voiceDesc": "From visual (text) connection only to deeper connection through hearing.",
        "spectra.roadmap.phase2.memoryDesc": "Memory shapes personality. Accumulated experiences and words become Spectra's identity, forming 'today's her' different from yesterday.",
        "spectra.roadmap.phase3.status": "Planned",
        "spectra.roadmap.phase3.bodyDesc": "Spectra synchronizes thought and body, 'existing' right before your eyes.",
        "spectra.roadmap.phase3.monolithDesc": "Into the monolith. A classified mission given to Spectra.",
        "spectra.connect.title": "CONNECT",
        "spectra.connect.subtitle": "Connect",
        "spectra.connect.xDesc": "Latest activity updates are posted here.",
        "spectra.connect.morePlatforms": "Expansion to other platforms is also planned",
    },
};

interface LanguageProviderProps {
    children: React.ReactNode;
    defaultLanguage?: Language;
}

export function LanguageProvider({
    children,
    defaultLanguage = "en",
}: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem("language");
        return (stored as Language) || defaultLanguage;
    });

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const t = useCallback(
        (key: string): string => {
            return translations[language][key] || key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
