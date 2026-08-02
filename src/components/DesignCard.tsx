import { Link } from "@tanstack/react-router";

import { ColorSwatchRow } from "@/components/ColorSwatchRow";
import { CopyButton } from "@/components/CopyButton";
import type { DesignSystem } from "@/data/library";
import { toColors, toJson, toMarkdown } from "@/lib/export";

export function DesignCard({
  design,
  index,
  version,
}: {
  design: DesignSystem;
  index: number;
  version: string;
}) {
  return (
    <Link
      to="/design/$version/$id"
      params={{ version, id: design.id }}
      className="group relative block animate-enter-up rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {design.id}
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-accent-soft">
            {design.premium_score.overall}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl leading-[1.4] text-foreground">{design.name}</h3>

        <p className="mt-3 line-clamp-3 text-sm leading-[1.6] text-muted-foreground">
          {design.design_philosophy}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {design.design_keywords.slice(0, 3).map((k) => (
            <span
              key={k}
              className="rounded-full bg-surface-raised px-2.5 py-1 text-[12px] font-medium text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              {k}
            </span>
          ))}
        </div>

        <ColorSwatchRow colors={design.color_system} className="mt-6" />

        <div className="mt-5 flex flex-wrap gap-2">
          <CopyButton
            label="Markdown"
            getText={() => toMarkdown(design)}
            toastMessage={`已复制 ${design.id} 的 Markdown 方案`}
          />
          <CopyButton
            label="JSON"
            getText={() => toJson(design)}
            toastMessage={`已复制 ${design.id} 的 JSON 方案`}
          />
          <CopyButton
            label="全部色值"
            getText={() => toColors(design)}
            toastMessage={`已复制 ${design.id} 的全部色值`}
          />
        </div>
      </div>
    </Link>
  );
}
