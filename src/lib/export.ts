import { colorSourceOf, labelOf, nameOf, swatchesOf, type DesignSystem } from "@/data/library";

/** Exact object from the source JSON plus the library-level optimization_framework. */
export function toJson(
  design: DesignSystem,
  optimizationFramework?: Record<string, unknown>,
): string {
  const out = optimizationFramework
    ? { ...design, optimization_framework: optimizationFramework }
    : design;
  return JSON.stringify(out, null, 2);
}

function renderValue(value: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    return value
      .map((v) => {
        if (v !== null && typeof v === "object") {
          if (!Array.isArray(v)) {
            const entries = Object.entries(v as Record<string, unknown>);
            const allScalar = entries.every(
              ([, val]) => val === null || typeof val !== "object",
            );
            if (allScalar) {
              return (
                `${pad}- ` +
                entries.map(([k, val]) => `**${k}**: ${String(val)}`).join(" · ")
              );
            }
          }
          return `${pad}-\n${renderValue(v, indent + 1)}`;
        }
        return `${pad}- ${String(v)}`;
      })
      .join("\n");
  }
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) =>
        v !== null && typeof v === "object"
          ? `${pad}- **${k}**:\n${renderValue(v, indent + 1)}`
          : `${pad}- **${k}**: ${String(v)}`,
      )
      .join("\n");
  }
  return `${pad}${String(value)}`;
}

const SKIP = new Set(["id", "name"]);

export function toMarkdown(
  d: DesignSystem,
  optimizationFramework?: Record<string, unknown>,
): string {
  const parts: string[] = [`# ${d.id} · ${nameOf(d)}`, ""];
  for (const [key, value] of Object.entries(d)) {
    if (SKIP.has(key)) continue;
    parts.push(`## ${labelOf(key)}`, "", renderValue(value), "");
  }
  if (optimizationFramework) {
    parts.push(`## ${labelOf("optimization_framework")}`, "", renderValue(optimizationFramework), "");
  }
  return parts.join("\n");
}

function flattenEntries(obj: Record<string, unknown>, prefix = ""): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object") {
      out.push(...flattenEntries(v as Record<string, unknown>, key));
    } else {
      out.push([key, String(v)]);
    }
  }
  return out;
}

export function toColors(d: DesignSystem): string {
  const src = colorSourceOf(d);
  const lines = src
    ? flattenEntries({ [src[0]]: src[1] } as Record<string, unknown>).map(([k, v]) => `${k}: ${v}`)
    : [];
  const hexes = Array.from(new Set(swatchesOf(d).map(([, hex]) => hex))).join(", ");
  return [`/* ${d.id} · ${nameOf(d)} */`, ...lines, ``, `HEX: ${hexes}`].join("\n");
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
