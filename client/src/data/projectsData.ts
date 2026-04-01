// プロジェクトメタデータの正本。Home PROJECTSセクション・各ページが参照する。

export interface ProjectMeta {
  id: string;
  path: string;
  image?: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
}

export const projects: ProjectMeta[] = [
  {
    id: "avatar-ui",
    path: "/avatarui",
    image: "/images/avatar-ui-demo.gif",
    titleKey: "projects.avatarui.title",
    descKey: "projects.avatarui.desc",
    categoryKey: "projects.avatarui.category",
  },
  {
    id: "spectra",
    path: "/spectra",
    titleKey: "projects.spectra.title",
    descKey: "projects.spectra.desc",
    categoryKey: "projects.spectra.category",
  },
  {
    id: "roblox",
    path: "/roblox",
    titleKey: "projects.roblox.title",
    descKey: "projects.roblox.desc",
    categoryKey: "projects.roblox.category",
  },
  {
    id: "novels",
    path: "/novels",
    titleKey: "projects.novels.title",
    descKey: "projects.novels.desc",
    categoryKey: "projects.novels.category",
  },
];
