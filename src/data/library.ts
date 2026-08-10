import rawV1 from "./design-library.json";
import rawV2 from "./design-library-v9.json";
import rawV3 from "./design-library-v10.json";
import rawM1 from "./motion-v1.json";
import rawM2 from "./motion-v2.json";

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
  name?: string;
  design_philosophy?: string;
  design_keywords?: string[];
  visual_positioning?: string;
  color_system?: ColorSystem;
  premium_score?: Record<string, string>;
} & Record<string, unknown>;

export type RawLibrary = {
  library: { name: string; version: string; design_count: number };
  design_systems: DesignSystem[];
  optimization_framework?: Record<string, unknown>;
};

export type LibraryVersion = {
  slug: string;
  label: string;
  tagline: string;
  group: string;
  meta: RawLibrary["library"];
  systems: DesignSystem[];
  raw: RawLibrary;
  /** Library-level optimization framework, shared by every design in the version. */
  optimizationFramework?: Record<string, unknown>;
};

const build = (
  slug: string,
  label: string,
  tagline: string,
  raw: unknown,
  group = "设计系统",
): LibraryVersion => {
  const data = raw as RawLibrary;
  return {
    slug,
    label,
    tagline,
    group,
    meta: data.library,
    systems: data.design_systems,
    raw: data,
    optimizationFramework: data.optimization_framework,
  };
};

export const VERSIONS: LibraryVersion[] = [
  build("v1", "v1.0", "Design DNA Library — 基础设计基因库", rawV1),
  build("v2", "v2.0", "Awwwards Ultimate — 可落地执行层", rawV2),
  build("v3", "v3.0", "Premium Web Experience OS™ — 东方奢华体验系统", rawV3),
  build("m1", "动效 v1.0", "Motion Design System — 自然物理动效基因库", rawM1, "动效系统"),
  build("m2", "动效 v2.0", "Motion Design System — 电影级空间动效系统", rawM2, "动效系统"),
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
  Array.from(new Set(v.systems.flatMap((d) => keywordsOfDesign(d))));

/* ---------- Shape-agnostic accessors (v1/v2 flat fields vs v3 identity/philosophy) ---------- */

const obj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : undefined);

export const nameOf = (d: DesignSystem): string =>
  d.name ??
  (obj(d["identity"])?.["name"] as string) ??
  (obj(d["identity"])?.["name_cn"] as string) ??
  (obj(d["identity"])?.["name_en"] as string) ??
  d.id;

export const englishOf = (d: DesignSystem): string | undefined =>
  (obj(d["identity"])?.["english"] as string | undefined) ??
  (obj(d["identity"])?.["name_en"] as string | undefined);

export const categoryOf = (d: DesignSystem): string | undefined =>
  [obj(d["identity"])?.["category"], obj(d["identity"])?.["scene_type"]]
    .filter(Boolean)
    .join(" · ") || undefined;

export const summaryOf = (d: DesignSystem): string =>
  d.design_philosophy ??
  (obj(d["philosophy"])?.["core"] as string) ??
  (obj(d["identity"])?.["description"] as string) ??
  (obj(d["design_intent"])?.["core_idea"] as string) ??
  (obj(d["identity"])?.["position"] as string) ??
  "";

export const positioningOf = (d: DesignSystem): string =>
  d.visual_positioning ??
  (obj(d["identity"])?.["position"] as string) ??
  (obj(d["design_intent"])?.["core_idea"] as string) ??
  summaryOf(d);

export const keywordsOfDesign = (d: DesignSystem): string[] =>
  d.design_keywords ?? ((obj(d["identity"])?.["keywords"] as string[]) ?? []);

export const scoreOf = (d: DesignSystem): string | undefined =>
  d.premium_score?.["overall"];

const HEX_RE = /^#([0-9a-f]{3,8})$/i;

/** Recursively collect [label, hex] pairs from any nested color object. */
export function collectHexes(value: unknown, label = ""): [string, string][] {
  if (typeof value === "string") return HEX_RE.test(value.trim()) ? [[label, value.trim()]] : [];
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => {
      const name = (obj(v)?.["name"] as string) ?? String(i + 1);
      return collectHexes(v, name);
    });
  }
  const o = obj(value);
  if (!o) return [];
  return Object.entries(o).flatMap(([k, v]) =>
    collectHexes(v, HEX_RE.test(String(v)) ? (label && k === "hex" ? label : k) : label || k),
  );
}

/** The design's color container, whatever it is called in this version. */
export const colorSourceOf = (d: DesignSystem): [string, unknown] | undefined => {
  const key = ["color_system", "color_dna", "color"].find((k) => d[k] !== undefined);
  return key ? [key, d[key]] : undefined;
};

export const swatchesOf = (d: DesignSystem): [string, string][] => {
  const src = colorSourceOf(d);
  return src ? collectHexes(src[1]) : collectHexes(d);
};

/** Fields rendered in the detail hero — skipped by the generic section renderer. */
export const HERO_FIELDS = new Set([
  "id",
  "name",
  "design_keywords",
  "visual_positioning",
  "identity",
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
  optimization_framework: "优化框架 Optimization Framework",
  identity: "身份定位 Identity",
  philosophy: "设计哲学 Philosophy",
  art_direction: "艺术指导 Art Direction",
  user_journey: "用户旅程 User Journey",
  site_architecture: "站点架构 Site Architecture",
  anti_grid_layout: "反网格布局 Anti-Grid Layout",
  hero_experience: "首屏体验 Hero Experience",
  spatial_depth: "空间深度 Spatial Depth",
  color_dna: "色彩基因 Color DNA",
  material_dna: "材质基因 Material DNA",
  lighting_dna: "光影基因 Lighting DNA",
  typography: "排版 Typography",
  content_rhythm: "内容节奏 Content Rhythm",
  motion_dna: "动效基因 Motion DNA",
  interaction: "交互 Interaction",
  sound_design: "声音设计 Sound Design",
  responsive: "响应式 Responsive",
  conversion: "转化 Conversion",
  design_intent: "设计意图 Design Intent",
  environment_system: "环境系统 Environment System",
  material_system_motion: "材质系统 Material System",
  form_system: "形态系统 Form System",
  camera_system: "镜头系统 Camera System",
  lighting_system: "光影系统 Lighting System",
  interaction_system: "交互系统 Interaction System",
  technical_system: "技术系统 Technical System",
  animation_token: "动效令牌 Animation Token",
  application_context: "应用场景 Application Context",
  constraints: "约束条件 Constraints",
  generation_prompt: "生成提示词 Generation Prompt",
};

export const labelOf = (key: string) =>
  FIELD_LABELS[key] ??
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
