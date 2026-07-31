import raw from "@/data/design-library.json";
import { FIELD_LABELS, HEX_KEYS, type DesignSystem } from "@/data/library";

const rawSystems = (raw as unknown as { design_systems: unknown[] }).design_systems;

/** Exact object from the source JSON, untouched. */
export function toJson(design: DesignSystem): string {
  const match = rawSystems.find((d) => (d as DesignSystem).id === design.id) ?? design;
  return JSON.stringify(match, null, 2);
}

function block(title: string, obj: Record<string, string>): string {
  const rows = Object.entries(obj)
    .map(([k, v]) => `- **${k}**: ${v}`)
    .join("\n");
  return `## ${title}\n\n${rows}\n`;
}

function flattenEntries(obj: Record<string, unknown>, prefix = ""): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") {
      out.push([key, v]);
    } else if (v && typeof v === "object" && !Array.isArray(v)) {
      out.push(...flattenEntries(v as Record<string, unknown>, key));
    }
  }
  return out;
}

export function toMarkdown(d: DesignSystem): string {
  const colorRows = flattenEntries(d.color_system as Record<string, unknown>)
    .map(([k, v]) => `| ${k} | ${v} |`)
    .join("\n");

  return [
    `# ${d.id} · ${d.name}`,
    ``,
    `## ${FIELD_LABELS.design_philosophy}`,
    ``,
    d.design_philosophy,
    ``,
    `## ${FIELD_LABELS.design_keywords}`,
    ``,
    d.design_keywords.map((k) => `- ${k}`).join("\n"),
    ``,
    `## ${FIELD_LABELS.visual_positioning}`,
    ``,
    d.visual_positioning,
    ``,
    `## ${FIELD_LABELS.color_system}`,
    ``,
    `| Token | Value |`,
    `| --- | --- |`,
    colorRows,
    ``,
    block(FIELD_LABELS.material_language, d.material_language),
    block(FIELD_LABELS.layout_system, d.layout_system),
    block(FIELD_LABELS.typography_system, d.typography_system),
    block(FIELD_LABELS.motion_system, d.motion_system),
    block(FIELD_LABELS.image_direction, d.image_direction),
    block(FIELD_LABELS.ui_elements, d.ui_elements),
    `## ${FIELD_LABELS.experience_scene}`,
    ``,
    d.experience_scene,
    ``,
    block(FIELD_LABELS.premium_score, d.premium_score),
  ].join("\n");
}

export function toColors(d: DesignSystem): string {
  const lines = flattenEntries(d.color_system as Record<string, unknown>)
    .map(([k, v]) => `${k}: ${v}`);
  const hexes = HEX_KEYS.map((k) => d.color_system[k]).join(", ");
  return [`/* ${d.id} · ${d.name} */`, ...lines, ``, `HEX: ${hexes}`].join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}