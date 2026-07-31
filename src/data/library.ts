import raw from "./design-library.json";

export type ColorSystem = {
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
  material_language: Record<string, string>;
  layout_system: Record<string, string>;
  typography_system: Record<string, string>;
  motion_system: Record<string, string>;
  image_direction: Record<string, string>;
  ui_elements: Record<string, string>;
  experience_scene: string;
  premium_score: Record<string, string>;
};

export type Library = {
  library: { name: string; version: string; design_count: number };
  design_systems: DesignSystem[];
};

export const library = raw as unknown as Library;
export const libraryMeta = library.library;
export const designSystems = library.design_systems;

export const getDesign = (id: string) =>
  designSystems.find((d) => d.id.toLowerCase() === id.toLowerCase());

export const HEX_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text_primary",
  "text_secondary",
] as const;

export const allKeywords = Array.from(
  new Set(designSystems.flatMap((d) => d.design_keywords)),
);

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
};