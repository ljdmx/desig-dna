import rawV7 from "./design-library.json";
import rawV9 from "./design-library-v9.json";
import rawV11 from "./design-library-v11.json";

export type ColorSystem = Record<string, unknown> & {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text_primary: string;
  text_secondary: string;
  lighting: string;
};

export type DesignSystem = {
  id: string;
  name: string;
  design_philosophy: string;
  design_keywords: string[];
  visual_positioning: string;
  color_system: ColorSystem;
  experience_scene: string;
  premium_score: Record<string, string>;
} & Record<string, unknown>;

export type RawLibrary = {
  library: { name: string; version: string; design_count: number };
  design_systems: DesignSystem[];
};

export type LibraryVersion = {
  slug: string;
  label: string;
  tagline: string;
  meta: RawLibrary["library"];
  systems: DesignSystem[];
  raw: RawLibrary;
};

const build = (
  slug: string,
  label: string,
  tagline: string,
  raw: unknown,
): LibraryVersion => {
  const data = raw as RawLibrary;
  return { slug, label, tagline, meta: data.library, systems: data.design_systems, raw: data };
};

export const VERSIONS: LibraryVersion[] = [
  build("v7", "v7.0", "Design DNA Library — 基础设计基因库", rawV7),
  build("v9", "v9.0", "Awwwards Ultimate — 可落地执行层", rawV9),
  build("v11", "v11.0", "Design Intelligence Engine — 设计智能引擎", rawV11),
];

export const DEFAULT_VERSION = VERSIONS[0]!.slug;

export const getVersion = (slug?: string) =>
  VERSIONS.find((v) => v.slug.toLowerCase() === (slug ?? "").toLowerCase());

export const getDesign = (versionSlug: string, id: string) =>
  getVersion(versionSlug)?.systems.find((d) => d.id.toLowerCase() === id.toLowerCase());

export const HEX_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text_primary",
  "text_secondary",
] as const;

export const keywordsOf = (v: LibraryVersion) =>
  Array.from(new Set(v.systems.flatMap((d) => d.design_keywords)));

/** Fields rendered in the detail hero — skipped by the generic section renderer. */
export const HERO_FIELDS = new Set([
  "id",
  "name",
  "design_keywords",
  "visual_positioning",
]);

export const FIELD_LABELS: Record<string, string> = {
  design_philosophy: "设计哲学 Design Philosophy",
  design_keywords: "设计关键词 Keywords",
  visual_positioning: "视觉定位 Visual Positioning",
  color_system: "色彩体系 Color System",
  material_language: "材质语言 Material Language",
  layout_system: "布局系统 Layout System",
  typography_system: "排版系统 Typography System",
  motion_system: "动效系统 Motion System",
  image_direction: "影像方向 Image Direction",
  ui_elements: "UI 元素 UI Elements",
  experience_scene: "体验场景 Experience Scene",
  premium_score: "高级感评分 Premium Score",
  material_system: "材质物理系统 Material System",
  performance_budget: "性能预算 Performance Budget",
  v9_execution_layer: "执行层 Execution Layer",
};

export const labelOf = (key: string) =>
  FIELD_LABELS[key] ??
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
