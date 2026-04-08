// コミュニティメタデータの正本。Home COMMUNITYセクションが参照する。

export interface CommunityMeta {
  id: string;
  titleKey: string;
  descKey: string;
  roleKey: string;
  icon: string; // lucide-react icon名
  href: string;
  accentColor: string;
}

export const communities: CommunityMeta[] = [
  {
    id: "aui-community",
    titleKey: "community.aui.title",
    descKey: "community.aui.desc",
    roleKey: "community.role.founded",
    icon: "Users",
    href: "https://x.com/i/communities/2008184608903549189",
    accentColor: "neon-magenta",
  },
  {
    id: "superdevday",
    titleKey: "community.sdd.title",
    descKey: "community.sdd.desc",
    roleKey: "community.role.founded",
    icon: "Hash",
    href: "https://x.com/search?q=%23SuperDevDay%20OR%20%23%E3%82%B9%E3%83%BC%E3%83%91%E3%83%BC%E9%96%8B%E7%99%BA%E3%83%87%E3%83%BC&f=live",
    accentColor: "neon-cyan",
  },
  {
    id: "wnb",
    titleKey: "community.wnb.title",
    descKey: "community.wnb.desc",
    roleKey: "community.role.member",
    icon: "Code",
    href: "https://wnb.jp/",
    accentColor: "neon-amber",
  },
  {
    id: "oubungai",
    titleKey: "community.obg.title",
    descKey: "community.obg.desc",
    roleKey: "community.role.member",
    icon: "BookOpen",
    href: "https://discord.com/invite/6qCX82QVGH",
    accentColor: "primary",
  },
];
