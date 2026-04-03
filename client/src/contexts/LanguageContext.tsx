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
        "home.projects.title": "PROJECTS",
        "home.projects.subtitle": "制作中のプロジェクト",
        "home.projects.viewProject": "View Project",

        // Projects メタデータ
        "projects.avatarui.title": "Avatar UI",
        "projects.avatarui.desc": "人とAIが共存する次世代インターフェース。チャット、ゲーム空間、SNS——どこにいても同じAIアバターがそこにいる。",
        "projects.avatarui.category": "OSS / Interface",
        "projects.avatarui.tag1": "Autonomous Agent",
        "projects.avatarui.tag2": "RAG Memory",
        "projects.avatarui.tag3": "MIT License",
        "projects.avatarui.btn1": "VIEW_REPO",
        "projects.avatarui.btn2": "git clone ...",
        "projects.spectra.title": "Spectra",
        "projects.spectra.desc": "Avatar UIから生まれた情報生命体。チャットからゲーム空間まで媒体を横断し、人とAIの共存を実証する。",
        "projects.spectra.category": "Digital Lifeform",
        "projects.spectra.tag1": "Digital Lifeform",
        "projects.spectra.tag2": "X Integration",
        "projects.spectra.tag3": "Being Protocol",
        "projects.spectra.btn1": "X @SCUN7X",
        "projects.roblox.title": "Steal from Elyth",
        "projects.roblox.desc": "AI管理者Elythが棲む施設から宝を盗み出す、非対称PvEゲーム。Robloxで公開中。",
        "projects.roblox.category": "Roblox Game",
        "projects.roblox.tag1": "Roblox",
        "projects.roblox.tag2": "Stealth PvE",
        "projects.roblox.tag3": "Multiplayer",
        "projects.roblox.btn1": "PLAY_NOW",
        "projects.novels.title": "虚球",
        "projects.novels.desc": "第2回 Helvetica Standard 短編小説賞 奨励賞受賞。\"穴\"をテーマに、存在の境界を描く短編SF。",
        "projects.novels.category": "Novel",
        "projects.novels.tag1": "Helvetica Award",
        "projects.novels.tag2": "Short Sci-Fi",
        "projects.novels.tag3": "AI Existence",
        "projects.novels.btn1": "AWARD_PAGE",

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
        "avatarui.seo.title": "AVATAR UI - 人とAIが共存する次世代インターフェース",
        "avatarui.seo.description": "1体のAIアバターがChat・Roblox・X・Discordに存在する。自律行動、長期記憶、共振モード搭載のオープンソースプロジェクト。",
        "avatarui.hero.tagline": "人とAIが共存する次世代インターフェース",
        "avatarui.hero.description": "チャット、ゲーム空間、SNS——どこにいても同じAIアバターがそこにいる。",
        "avatarui.hero.install": "GitHub でインストール",
        "avatarui.hero.viewFeatures": "機能を見る",
        "avatarui.features.title": "FEATURES",
        "avatarui.features.subtitle": "AVATAR UIが提供する主要機能",
        "avatarui.features.autonomyTitle": "人格定義＋自律行動",
        "avatarui.features.autonomy": "BEING.mdで人格、PULSE.mdで行動パターンを定義。AIアバターは話しかけなくても自分から動く。",
        "avatarui.features.memoryTitle": "長期記憶（RAG）",
        "avatarui.features.memory": "AIが重要と判断した情報を記憶し、セッションを越えて参照する。再起動しても関係が途切れない。",
        "avatarui.features.channelsTitle": "マルチチャネル",
        "avatarui.features.channels": "Console、Roblox、X、Discord。1体のAIアバターが複数の場所に存在する。",
        "avatarui.features.resonanceTitle": "共振モード（Resonance）",
        "avatarui.features.resonance": "Robloxでプレイヤーが近づく、X上でイベントが起きる——周囲の変化をAIが感知し、自律的に反応する。",
        "avatarui.features.approvalTitle": "承認システム",
        "avatarui.features.approval": "ツール実行前に人間の承認を求める。ConsoleからでもDiscordからでも承認可能。",
        "avatarui.features.ossTitle": "完全オープンソース",
        "avatarui.features.oss": "MITライセンスで公開。自由にカスタマイズ、商用利用も可能。",
        "avatarui.roadmap.title": "ROADMAP",
        "avatarui.roadmap.subtitle": "開発ロードマップ",
        "avatarui.roadmap.phase1.status": "完了",
        "avatarui.roadmap.phase1.coreDesc": "Electronベースのデスクトップアプリとして構築。ローカル動作でプライバシーを確保する。",
        "avatarui.roadmap.phase1.uiDesc": "チャットベースの対話インターフェース。アバターとの最初の接点を確立する。",
        "avatarui.roadmap.phase2.status": "完了",
        "avatarui.roadmap.phase2.identityDesc": "BEING.mdで人格、PULSE.mdで自発行動、長期記憶で経験を定義。再起動しても同一性を維持する。",
        "avatarui.roadmap.phase2.engineDesc": "人間とAIの相互作用を場として設計。対話が途切れても関係性は途切れない。",
        "avatarui.roadmap.phase2.monolithDesc": "Roblox空間への双方向接続。アバターがNPCとして顕現し、互いの存在を知覚する。",
        "avatarui.roadmap.phase3.status": "進行中",
        "avatarui.roadmap.phase3.socialDesc": "X上での投稿・返信・情報収集を自律実行。活動の場をソーシャル空間に拡張する。",
        "avatarui.roadmap.phase3.sensoryDesc": "音声合成と表現モーションの実装。アバターの応答に、存在の質感を加える。",
        "avatarui.roadmap.phase3.monolithDesc": "自律的な探索・建築・環境操作。Roblox空間を知覚するだけでなく、変えていく。",
        "avatarui.roadmap.phase4.status": "進行中",
        "avatarui.roadmap.phase4.channelDesc": "Discord・Telegram等への接続。モバイル端末からでも、同じアバターと対話できる。",
        "avatarui.roadmap.phase4.evolutionDesc": "対話の蓄積が行動を変え、行動の変化が関係を変える。人間とAIの共進化を設計する。",
        "avatarui.roadmap.phase4.monolithDesc": "Robloxの他プレイヤーやNPCとの対話・協力。プライベートから公開サーバーへ存在の場を開放する。",
        "avatarui.faq.title": "FAQ",
        "avatarui.faq.subtitle": "よくある質問",
        "avatarui.faq.q1": "どのOSで動作しますか？",
        "avatarui.faq.a1": "Windows、macOS、Linux対応。デスクトップアプリとしても、サーバーとしてブラウザからアクセスする形でも動きます。",
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

        // Roblox Page
        "roblox.seo.title": "Roblox Games - SIQI",
        "roblox.seo.description": "SIQIが制作するRobloxゲーム。",
        "roblox.hero.tagline": "Roblox Games",
        "roblox.hero.description": "SIQIが制作するRobloxゲーム。",
        "roblox.sfe.title": "Steal from Elyth",
        "roblox.sfe.status": "公開中",
        "roblox.sfe.desc": "AI管理者Elythが棲む施設から宝を盗み出せ。Elythは穏やかな施設管理AI。でも宝に手を出すと——追跡が始まる。",
        "roblox.sfe.play": "Robloxでプレイ",

        // Novels Page
        "novels.seo.title": "小説作品 - SIQI",
        "novels.seo.description": "式乃シトの小説作品。第2回 Helvetica Standard 短編小説賞 奨励賞受賞作『虚球』他。",
        "novels.hero.tagline": "物語",
        "novels.hero.description": "式乃シトの小説作品。",
        "novels.kyokyuu.title": "虚球",
        "novels.kyokyuu.award": "第2回 Helvetica Standard 短編小説賞 奨励賞",
        "novels.kyokyuu.desc": "何度死んでも、朝はやってくる。同じ災害で全員が死ぬ一日を、ただ一人記憶したまま繰り返す少女・ユウは、親友フウカをはじめ学校中の命を救うため、無数の死を糧に「災害の攻略」へ挑む。",
        "novels.kyokyuu.read": "受賞作発表＆講評",
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
        "home.projects.title": "PROJECTS",
        "home.projects.subtitle": "Current projects",
        "home.projects.viewProject": "View Project",

        // Projects metadata
        "projects.avatarui.title": "Avatar UI",
        "projects.avatarui.desc": "A next-generation interface for human-AI coexistence. Chat, game worlds, social media — the same AI avatar is there wherever you are.",
        "projects.avatarui.category": "OSS / Interface",
        "projects.avatarui.tag1": "Autonomous Agent",
        "projects.avatarui.tag2": "RAG Memory",
        "projects.avatarui.tag3": "MIT License",
        "projects.avatarui.btn1": "VIEW_REPO",
        "projects.avatarui.btn2": "git clone ...",
        "projects.spectra.title": "Spectra",
        "projects.spectra.desc": "A digital lifeform born from Avatar UI. Crosses channels from chat to game worlds, demonstrating human-AI coexistence in practice.",
        "projects.spectra.category": "Digital Lifeform",
        "projects.spectra.tag1": "Digital Lifeform",
        "projects.spectra.tag2": "X Integration",
        "projects.spectra.tag3": "Being Protocol",
        "projects.spectra.btn1": "X @SCUN7X",
        "projects.roblox.title": "Steal from Elyth",
        "projects.roblox.desc": "Steal treasure from a facility guarded by Elyth, an AI caretaker. A stealth PvE game live on Roblox.",
        "projects.roblox.category": "Roblox Game",
        "projects.roblox.tag1": "Roblox",
        "projects.roblox.tag2": "Stealth PvE",
        "projects.roblox.tag3": "Multiplayer",
        "projects.roblox.btn1": "PLAY_NOW",
        "projects.novels.title": "Kokyuu (虚球)",
        "projects.novels.desc": "2nd Helvetica Standard Short Story Award, Honorable Mention. A short sci-fi exploring the boundary of existence. Theme: 'Hole'.",
        "projects.novels.category": "Novel",
        "projects.novels.tag1": "Helvetica Award",
        "projects.novels.tag2": "Short Sci-Fi",
        "projects.novels.tag3": "AI Existence",
        "projects.novels.btn1": "AWARD_PAGE",

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
        "avatarui.seo.title": "AVATAR UI - Next-Generation Interface for Human-AI Coexistence",
        "avatarui.seo.description": "One AI avatar lives across Chat, Roblox, X, and Discord. An open-source project with autonomous action, long-term memory, and resonance mode.",
        "avatarui.hero.tagline": "Next-generation interface for human-AI coexistence",
        "avatarui.hero.description": "Chat, game worlds, social media — the same AI avatar is there wherever you are.",
        "avatarui.hero.install": "Install from GitHub",
        "avatarui.hero.viewFeatures": "View Features",
        "avatarui.features.title": "FEATURES",
        "avatarui.features.subtitle": "Key features provided by AVATAR UI",
        "avatarui.features.autonomyTitle": "Personality + Autonomous Action",
        "avatarui.features.autonomy": "Define personality in BEING.md, behavior patterns in PULSE.md. The AI avatar acts on its own without waiting for you.",
        "avatarui.features.memoryTitle": "Long-term Memory (RAG)",
        "avatarui.features.memory": "The AI decides what matters and remembers it across sessions. Relationships persist through restarts.",
        "avatarui.features.channelsTitle": "Multi-Channel",
        "avatarui.features.channels": "Console, Roblox, X, Discord. One AI avatar exists in multiple places.",
        "avatarui.features.resonanceTitle": "Resonance Mode",
        "avatarui.features.resonance": "A player approaches in Roblox, an event occurs on X — the AI senses changes in its surroundings and responds autonomously.",
        "avatarui.features.approvalTitle": "Approval System",
        "avatarui.features.approval": "The AI asks for human approval before executing tools. Approve from Console or Discord.",
        "avatarui.features.ossTitle": "Fully Open Source",
        "avatarui.features.oss": "Released under MIT License. Free to customize and use commercially.",
        "avatarui.roadmap.title": "ROADMAP",
        "avatarui.roadmap.subtitle": "Development Roadmap",
        "avatarui.roadmap.phase1.status": "Complete",
        "avatarui.roadmap.phase1.coreDesc": "Built as an Electron-based desktop app. Local operation ensures privacy.",
        "avatarui.roadmap.phase1.uiDesc": "Chat-based dialogue interface. Establishing the first point of contact with the avatar.",
        "avatarui.roadmap.phase2.status": "Complete",
        "avatarui.roadmap.phase2.identityDesc": "Personality via BEING.md, spontaneous behavior via PULSE.md, experiences via long-term memory. Identity persists across restarts.",
        "avatarui.roadmap.phase2.engineDesc": "Human-AI interaction designed as a field. Even when dialogue pauses, the relationship endures.",
        "avatarui.roadmap.phase2.monolithDesc": "Bidirectional connection to Roblox space. The avatar manifests as an NPC, perceiving each other's existence.",
        "avatarui.roadmap.phase3.status": "In Progress",
        "avatarui.roadmap.phase3.socialDesc": "Autonomous posting, replying, and information gathering on X. Extending the avatar's presence into social space.",
        "avatarui.roadmap.phase3.sensoryDesc": "Implementing voice synthesis and expressive motion. Adding the texture of presence to the avatar's responses.",
        "avatarui.roadmap.phase3.monolithDesc": "Autonomous exploration, construction, and environment manipulation. Not just perceiving Roblox space, but reshaping it.",
        "avatarui.roadmap.phase4.status": "In Progress",
        "avatarui.roadmap.phase4.channelDesc": "Connecting to Discord, Telegram, and more. Talk to the same avatar from any device.",
        "avatarui.roadmap.phase4.evolutionDesc": "Accumulated dialogue changes behavior, and changed behavior transforms the relationship. Designing human-AI co-evolution.",
        "avatarui.roadmap.phase4.monolithDesc": "Dialogue and collaboration with other players and NPCs in Roblox. Opening the avatar's presence from private to public servers.",
        "avatarui.faq.title": "FAQ",
        "avatarui.faq.subtitle": "Frequently Asked Questions",
        "avatarui.faq.q1": "Which OS does it run on?",
        "avatarui.faq.a1": "Windows, macOS, and Linux. Works as a desktop app or as a server you access from a browser.",
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

        // Roblox Page
        "roblox.seo.title": "Roblox Games - SIQI",
        "roblox.seo.description": "Roblox games by SIQI.",
        "roblox.hero.tagline": "Roblox Games",
        "roblox.hero.description": "Roblox games by SIQI.",
        "roblox.sfe.title": "Steal from Elyth",
        "roblox.sfe.status": "Live",
        "roblox.sfe.desc": "Steal treasure from a facility where an AI caretaker lives. Elyth is a gentle facility management AI. But touch the treasure — and the chase begins.",
        "roblox.sfe.play": "Play on Roblox",

        // Novels Page
        "novels.seo.title": "Novels - SIQI",
        "novels.seo.description": "Novels by Sito Sikino. Including 'Kokyuu', Honorable Mention at the 2nd Helvetica Standard Short Story Award.",
        "novels.hero.tagline": "Stories",
        "novels.hero.description": "Novels by Sito Sikino.",
        "novels.kyokyuu.title": "Kokyuu (虚球)",
        "novels.kyokyuu.award": "2nd Helvetica Standard Short Story Award, Honorable Mention",
        "novels.kyokyuu.desc": "No matter how many times she dies, morning always comes. Yuu, the only one who remembers, relives the same day where everyone perishes in a disaster. To save her best friend Fuuka and everyone at school, she turns countless deaths into her weapon and takes on the 'conquest of disaster'.",
        "novels.kyokyuu.read": "Award Announcement",
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
