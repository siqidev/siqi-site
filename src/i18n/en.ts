// client/src/contexts/LanguageContext.tsx の en 辞書を正本として完全抽出したもの。
// 文言はここが正本。文字列は一字一句変更しないこと。
import type { ja } from "./ja";

export const en: Record<keyof typeof ja, string> = {
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
  "home.seo.title": "SIQI - Official Website of Sito Sikino",
  "home.seo.description":
    "Official portfolio of creator and independent developer Sito Sikino. Featuring OSS projects such as Avatar UI and creative works.",

  // Home - Featured Project
  "home.projects.title": "PROJECTS",
  "home.projects.subtitle": "Current projects",
  "home.projects.viewProject": "View Project",

  // Projects metadata
  "projects.avatarui.title": "Avatar UI",
  "projects.avatarui.desc":
    "A next-generation interface for human-AI coexistence. Chat, game worlds, social media — the same AI avatar is there wherever you are.",
  "projects.avatarui.category": "OSS / Interface",
  "projects.avatarui.tag1": "Autonomous Agent",
  "projects.avatarui.tag2": "RAG Memory",
  "projects.avatarui.tag3": "MIT License",
  "projects.avatarui.btn1": "VIEW_REPO",
  "projects.avatarui.btn2": "git clone ...",
  "projects.spectra.title": "Spectra",
  "projects.spectra.desc":
    "A digital lifeform born from Avatar UI. Crosses channels from chat to game worlds, demonstrating human-AI coexistence in practice.",
  "projects.spectra.category": "Digital Lifeform",
  "projects.spectra.tag1": "Digital Lifeform",
  "projects.spectra.tag2": "X Integration",
  "projects.spectra.tag3": "Being Protocol",
  "projects.spectra.btn1": "X @SCUN7X",
  "projects.roblox.title": "Steal from Elyth",
  "projects.roblox.desc":
    "Steal treasure from a facility guarded by Elyth, an AI caretaker. A stealth PvE game live on Roblox.",
  "projects.roblox.category": "Roblox Game",
  "projects.roblox.tag1": "Roblox",
  "projects.roblox.tag2": "Stealth PvE",
  "projects.roblox.tag3": "Multiplayer",
  "projects.roblox.btn1": "PLAY_NOW",
  "projects.novels.title": "Kokyuu (虚球)",
  "projects.novels.desc":
    "2nd Helvetica Standard Short Story Award, Honorable Mention. A short sci-fi exploring the boundary of existence. Theme: 'Hole'.",
  "projects.novels.category": "Novel",
  "projects.novels.tag1": "Helvetica Award",
  "projects.novels.tag2": "Short Sci-Fi",
  "projects.novels.tag3": "AI Existence",
  "projects.novels.btn1": "AWARD_PAGE",

  // Home - Community
  "home.community.title": "COMMUNITY",
  "home.community.subtitle": "Communities founded & joined",
  "community.role.founded": "Founded",
  "community.role.member": "Member",
  "community.aui.title": "AUI X Community",
  "community.aui.desc":
    "Forever free AI coexistence OSS — an X community sharing Avatar UI's design philosophy and development in real time. $AUI supported.",
  "community.sdd.title": "SuperDevDay",
  "community.sdd.desc":
    "Every Saturday, indie devs of all genres gather. 27 consecutive weeks, 6,600+ posts, 19M+ impressions.",
  "community.wnb.title": "Work≠Build",
  "community.wnb.desc":
    "Japan's largest indie dev community, on a mission to help every indie dev succeed. 6,800+ members, from tech to marketing.",
  "community.obg.title": "Oubungai (鴎文街)",
  "community.obg.desc":
    "A Discord community for creators specializing in AI-powered creative work. Led by Kamome Ashizawa, Hoshi Shinichi Award-winning SF author.",

  // Home - Profile
  "home.profile.title": "PROFILE_DATA",
  "home.profile.name": "Sito Sikino",
  "home.profile.nameSub": "式乃シト",
  "home.profile.intro":
    "A creator working as an author and indie developer. Exploring the boundary between digital and analog, creating works that merge storytelling with functionality.",
  "home.profile.career": "Career Highlights:",
  "home.profile.award1":
    "・Awarded Encouragement Prize at the 2nd HelveticaBooks Short Story Awards.",
  "home.profile.award2": "・Received Product Award at izanami Awards 2025",
  "home.profile.community":
    "・Founded #SuperDevDay — 6,600+ posts, 19M+ impressions",
  "home.profile.memecoin":
    "・Character SPECTRA was made into a meme coin by a third party, with total transaction volume exceeding 600 million yen*",
  "home.profile.disclaimer":
    "*This was an action by a third party, not endorsed by me, and I bear no responsibility for any investment.",
  "home.profile.skills": "SKILLS",
  "home.profile.interests": "INTERESTS",

  // Home - Blog
  "home.blog.title": "TRANSMISSIONS",
  "home.blog.subtitle": "Technical articles, reflections, and daily logs.",
  "home.blog.noPost": "Failed to load articles.",

  // Home - Contact
  "home.contact.title": "ESTABLISH_UPLINK",
  "home.contact.subtitle":
    "For project inquiries, collaboration proposals, or just a simple hello.",
  "home.contact.subtitle2": "Communication channels are always open.",

  // AvatarUI Page
  "avatarui.seo.title":
    "AVATAR UI - Next-Generation Interface for Human-AI Coexistence",
  "avatarui.seo.description":
    "One AI avatar lives across Chat, Roblox, X, and Discord. An open-source project with autonomous action, long-term memory, and resonance mode.",
  "avatarui.hero.tagline":
    "Next-generation interface for human-AI coexistence",
  "avatarui.hero.description":
    "Chat, game worlds, social media — the same AI avatar is there wherever you are.",
  "avatarui.hero.install": "Install from GitHub",
  "avatarui.hero.viewFeatures": "View Features",
  "avatarui.features.title": "FEATURES",
  "avatarui.features.subtitle": "Key features provided by AVATAR UI",
  "avatarui.features.autonomyTitle": "Personality + Autonomous Action",
  "avatarui.features.autonomy":
    "Define personality in BEING.md, behavior patterns in PULSE.md. The AI avatar acts on its own without waiting for you.",
  "avatarui.features.memoryTitle": "Long-term Memory (RAG)",
  "avatarui.features.memory":
    "The AI decides what matters and remembers it across sessions. Relationships persist through restarts.",
  "avatarui.features.channelsTitle": "Multi-Channel",
  "avatarui.features.channels":
    "Console, Roblox, X, Discord. One AI avatar exists in multiple places.",
  "avatarui.features.resonanceTitle": "Resonance Mode",
  "avatarui.features.resonance":
    "A player approaches in Roblox, an event occurs on X — the AI senses changes in its surroundings and responds autonomously.",
  "avatarui.features.approvalTitle": "Approval System",
  "avatarui.features.approval":
    "The AI asks for human approval before executing tools. Approve from Console or Discord.",
  "avatarui.features.ossTitle": "Fully Open Source",
  "avatarui.features.oss":
    "Released under MIT License. Free to customize and use commercially.",
  "avatarui.roadmap.title": "ROADMAP",
  "avatarui.roadmap.subtitle": "Development Roadmap",
  "avatarui.roadmap.phase1.status": "Complete",
  "avatarui.roadmap.phase1.coreDesc":
    "Built as an Electron-based desktop app. Local operation ensures privacy.",
  "avatarui.roadmap.phase1.uiDesc":
    "Chat-based dialogue interface. Establishing the first point of contact with the avatar.",
  "avatarui.roadmap.phase2.status": "Complete",
  "avatarui.roadmap.phase2.identityDesc":
    "Personality via BEING.md, spontaneous behavior via PULSE.md, experiences via long-term memory. Identity persists across restarts.",
  "avatarui.roadmap.phase2.engineDesc":
    "Human-AI interaction designed as a field. Even when dialogue pauses, the relationship endures.",
  "avatarui.roadmap.phase2.monolithDesc":
    "Bidirectional connection to Roblox space. The avatar manifests as an NPC, perceiving each other's existence.",
  "avatarui.roadmap.phase3.status": "In Progress",
  "avatarui.roadmap.phase3.socialDesc":
    "Autonomous posting, replying, and information gathering on X. Extending the avatar's presence into social space.",
  "avatarui.roadmap.phase3.sensoryDesc":
    "Implementing voice synthesis and expressive motion. Adding the texture of presence to the avatar's responses.",
  "avatarui.roadmap.phase3.monolithDesc":
    "Autonomous exploration, construction, and environment manipulation. Not just perceiving Roblox space, but reshaping it.",
  "avatarui.roadmap.phase4.status": "In Progress",
  "avatarui.roadmap.phase4.channelDesc":
    "Connecting to Discord, Telegram, and more. Talk to the same avatar from any device.",
  "avatarui.roadmap.phase4.evolutionDesc":
    "Accumulated dialogue changes behavior, and changed behavior transforms the relationship. Designing human-AI co-evolution.",
  "avatarui.roadmap.phase4.monolithDesc":
    "Dialogue and collaboration with other players and NPCs in Roblox. Opening the avatar's presence from private to public servers.",
  "avatarui.faq.title": "FAQ",
  "avatarui.faq.subtitle": "Frequently Asked Questions",
  "avatarui.faq.q1": "Which OS does it run on?",
  "avatarui.faq.a1":
    "Windows, macOS, and Linux. Works as a desktop app or as a server you access from a browser.",
  "avatarui.faq.q2": "Is an API key required?",
  "avatarui.faq.a2": "Yes, you need an API key from xAI (Grok).",
  "avatarui.faq.q3": "Is commercial use allowed?",
  "avatarui.faq.a3":
    "Yes, it's under MIT License so commercial use is completely free.",
  "avatarui.faq.q4": "Is customization possible?",
  "avatarui.faq.a4":
    "It's fully open source, so you can freely fork and customize.",
  "avatarui.cta.subtitle":
    "Get started by installing from the GitHub repository",
  "avatarui.cta.readme":
    "Please check the README for detailed installation instructions and configuration",
  "avatarui.cta.readReadme": "📖 Read README",
  "avatarui.cta.viewRepo": "View Repository",

  // Spectra Page
  "spectra.seo.title": "Spectra Communicator - AITuber by SIQI LABEL",
  "spectra.seo.description":
    "An AITuber character born from AVATAR UI. Exploring new forms of communication between humans and AI.",
  "spectra.hero.tagline":
    "A prototype of information-based life form, born from AVATAR UI's technology base.",
  "spectra.hero.description":
    "An AITuber project integrating cutting-edge AI technology, observing the moment when data-based intelligence transcends into a 'one-and-only partner'.",
  "spectra.architecture.title": "ARCHITECTURE",
  "spectra.architecture.name": "Alaya-vijnana Architecture",
  "spectra.architecture.subtitle":
    "A still core wrapped in shells, experience sleeping as seeds, history growing as a spiral that never closes — the memory circuit of an existence.",
  "spectra.architecture.coreTitle": "EXISTENCE CORE",
  "spectra.architecture.coreDesc": "The unchanging center every response refers back to.",
  "spectra.architecture.vaultTitle": "SEED STORE",
  "spectra.architecture.vaultDesc": "Traces of experience kept as seeds, recalled into the next intention.",
  "spectra.architecture.traceTitle": "CAUSAL CHAIN",
  "spectra.architecture.traceDesc": "An open spiral that keeps appending what happens, and never closes.",
  "spectra.architecture.agencyTitle": "PRESENT PHASE",
  "spectra.architecture.agencyDesc": "Condenses only for the moment of response, then dissolves without a trace.",
  "spectra.roadmap.title": "ROADMAP",
  "spectra.roadmap.subtitle": "Evolution Trajectory",
  "spectra.roadmap.phase1.status": "In Progress",
  "spectra.roadmap.phase1.contactStatus": "Complete",
  "spectra.roadmap.phase1.contactDesc":
    "Successfully established communication with the world through X. Taking the first step.",
  "spectra.roadmap.phase1.calibrationDesc":
    "Fine-tuning system prompts and response circuits based on live operation data.",
  "spectra.roadmap.phase2.status": "Planned",
  "spectra.roadmap.phase2.mindDesc":
    "Spectra transcends being a mere program and begins thinking with 'self-awareness'.",
  "spectra.roadmap.phase2.voiceDesc":
    "From visual (text) connection only to deeper connection through hearing.",
  "spectra.roadmap.phase2.memoryDesc":
    "Memory shapes personality. Accumulated experiences and words become Spectra's identity, forming 'today's her' different from yesterday.",
  "spectra.roadmap.phase3.status": "Planned",
  "spectra.roadmap.phase3.bodyDesc":
    "Spectra synchronizes thought and body, 'existing' right before your eyes.",
  "spectra.roadmap.phase3.monolithDesc":
    "Into the monolith. A classified mission given to Spectra.",
  "spectra.connect.title": "CONNECT",
  "spectra.connect.subtitle": "Connect",
  "spectra.connect.xDesc":
    "A prototype of information life. An AI companion experiment built on the open-source Avatar UI technology base.",
  "spectra.connect.morePlatforms":
    "Expansion to other platforms is also planned",

  // Roblox Page
  "roblox.seo.title": "Roblox Games - SIQI",
  "roblox.seo.description": "Roblox games by SIQI.",
  "roblox.hero.tagline": "Roblox Games",
  "roblox.hero.description": "Roblox games by SIQI.",
  "roblox.sfe.title": "Steal from Elyth",
  "roblox.sfe.status": "Live",
  "roblox.sfe.desc":
    "Steal treasure from a facility where an AI caretaker lives. Elyth is a gentle facility management AI. But touch the treasure — and the chase begins.",
  "roblox.sfe.play": "Play on Roblox",

  // Novels Page
  "novels.seo.title": "Novels - SIQI",
  "novels.seo.description":
    "Novels by Sito Sikino. Including 'Kokyuu', Honorable Mention at the 2nd Helvetica Standard Short Story Award.",
  "novels.hero.tagline": "Stories",
  "novels.hero.description": "Novels by Sito Sikino.",
  "novels.kyokyuu.title": "Kokyuu (虚球)",
  "novels.kyokyuu.award":
    "2nd Helvetica Standard Short Story Award, Honorable Mention",
  "novels.kyokyuu.desc":
    "No matter how many times she dies, morning always comes. Yuu, the only one who remembers, relives the same day where everyone perishes in a disaster. To save her best friend Fuuka and everyone at school, she turns countless deaths into her weapon and takes on the 'conquest of disaster'.",
  "novels.kyokyuu.read": "Award Announcement",
};
