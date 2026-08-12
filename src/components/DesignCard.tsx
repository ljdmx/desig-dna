import { Link } from "@tanstack/react-router";

import { ColorSwatchRow } from "@/components/ColorSwatchRow";
import { CopyButton } from "@/components/CopyButton";
import {
  keywordsOfDesign,
  nameOf,
  scoreOf,
  summaryOf,
  swatchesOf,
  type DesignSystem,
} from "@/data/library";
import { toColors, toJson, toMarkdown } from "@/lib/export";

export function DesignCard({
  design,
  index,
  version,
  optimizationFramework,
  showColors = true,
}: {
  design: DesignSystem;
  index: number;
  version: string;
  optimizationFramework?: Record<string, unknown>;
  showColors?: boolean;
}) {
  return (
    <Link
      to="/design/$version/$id"
      params={{ version, id: design.id }}
      className="group relative block animate-enter-up bg-background p-8 transition-colors duration-500 hover:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:p-10"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(90%_70%_at_50%_0%,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent_70%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
            {design.id}
          </span>
          {scoreOf(design) && (
            <span className="font-mono text-[11px] tracking-[0.15em] text-accent">
              {scoreOf(design)}
            </span>
          )}
        </div>

        <h3 className="mt-8 font-ink text-[26px] leading-[1.3] text-foreground transition-transform duration-500 group-hover:translate-x-1">
          {nameOf(design)}
        </h3>

        <p className="mt-4 line-clamp-3 text-[13px] leading-[1.9] text-muted-foreground">
          {summaryOf(design)}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {keywordsOfDesign(design).slice(0, 3).map((k) => (
            <span
              key={k}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {k}
            </span>
          ))}
        </div>

        <ColorSwatchRow colors={swatchesOf(design)} className="mt-auto pt-10" />

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
          <CopyButton
            label="Markdown"
            getText={() => toMarkdown(design, optimizationFramework)}
            toastMessage={`已复制 ${design.id} 的 Markdown 方案`}
          />
          <CopyButton
            label="JSON"
            getText={() => toJson(design, optimizationFramework)}
            toastMessage={`已复制 ${design.id} 的 JSON 方案`}
          />
          {showColors && (
            <CopyButton
              label="全部色值"
              getText={() => toColors(design)}
              toastMessage={`已复制 ${design.id} 的全部色值`}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
