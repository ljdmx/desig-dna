import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ColorSwatchRow } from "@/components/ColorSwatchRow";
import { CopyButton } from "@/components/CopyButton";
import { DataValue } from "@/components/DataValue";
import { SectionBlock } from "@/components/SectionBlock";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HERO_FIELDS, getDesign, getVersion, labelOf } from "@/data/library";
import { toColors, toJson, toMarkdown } from "@/lib/export";

export const Route = createFileRoute("/design/$version/$id")({
  loader: ({ params }) => {
    const version = getVersion(params.version);
    const design = version && getDesign(params.version, params.id);
    if (!version || !design) throw notFound();
    return { versionSlug: version.slug, versionLabel: version.label, id: design.id };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "方案未找到 · Design DNA Library" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const design = getDesign(loaderData.versionSlug, loaderData.id)!;
    const title = `${design.name} · ${design.id} ${loaderData.versionLabel} | Design DNA Library`;
    const description = design.design_philosophy.slice(0, 150);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DesignDetail,
});

const slug = (key: string) => key.replace(/_/g, "-");

function DesignDetail() {
  const { versionSlug, versionLabel, id } = Route.useLoaderData();
  const design = getDesign(versionSlug, id)!;
  const optimizationFramework = getVersion(versionSlug)?.optimizationFramework;

  const sectionKeys = Object.keys(design).filter((k) => !HERO_FIELDS.has(k));
  const navKeys = optimizationFramework ? [...sectionKeys, "optimization_framework"] : sectionKeys;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <Link
            to="/version/$version"
            params={{ version: versionSlug }}
            className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">返回 {versionLabel} 全部方案</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 pb-4">
          <CopyButton
            variant="solid"
            label="复制 Markdown"
            getText={() => toMarkdown(design, optimizationFramework)}
            toastMessage="已复制完整 Markdown 方案"
          />
          <CopyButton
            label="复制 JSON"
            getText={() => toJson(design, optimizationFramework)}
            toastMessage="已复制完整 JSON 方案"
          />
          <CopyButton
            label="复制全部色值"
            getText={() => toColors(design)}
            toastMessage="已复制全部色值"
          />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 lg:flex lg:gap-12">
        <nav className="hidden shrink-0 lg:block lg:w-52">
          <ul className="sticky top-40 space-y-2 py-16 text-xs">
            {navKeys.map((k) => (
              <li key={k}>
                <a
                  href={`#${slug(k)}`}
                  className="block truncate text-muted-foreground transition-colors duration-200 hover:text-accent-soft"
                >
                  {labelOf(k)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 pb-24">
          <section className="animate-enter-up py-16">
            <span className="font-mono text-xs tracking-[0.25em] text-accent-soft">
              {design.id} · {versionLabel}
            </span>
            <h1 className="mt-5 font-display text-[32px] leading-[1.4] text-foreground sm:text-[44px]">
              {design.name}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.6] text-muted-foreground">
              {design.visual_positioning}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {design.design_keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-surface-raised px-2.5 py-1 text-[12px] font-medium text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
            <ColorSwatchRow colors={design.color_system} className="mt-8 h-2" />
          </section>

          {sectionKeys.map((key) => (
            <SectionBlock key={key} id={slug(key)} title={labelOf(key)}>
              {key === "color_system" ? (
                <ColorSystemBlock data={design.color_system as Record<string, unknown>} />
              ) : key === "premium_score" ? (
                <ScoreBlock data={design.premium_score} />
              ) : typeof design[key] === "string" ? (
                <p>{design[key] as string}</p>
              ) : (
                <DataValue value={design[key]} />
              )}
            </SectionBlock>
          ))}

          {optimizationFramework && (
            <SectionBlock id="optimization-framework" title={labelOf("optimization_framework")}>
              <DataValue value={optimizationFramework} />
            </SectionBlock>
          )}
        </main>
      </div>
    </div>
  );
}

function ColorSystemBlock({ data }: { data: Record<string, unknown> }) {
  const swatches = Object.entries(data).filter(
    ([, v]) => typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v),
  ) as [string, string][];
  const rest = Object.fromEntries(
    Object.entries(data).filter(([k]) => !swatches.some(([sk]) => sk === k)),
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => navigator.clipboard?.writeText(v)}
            className="overflow-hidden rounded-xl border border-border text-left transition-transform duration-200 hover:-translate-y-1"
          >
            <span className="block h-16 w-full" style={{ backgroundColor: v }} />
            <span className="block bg-surface px-3 py-2">
              <span className="block font-mono text-[11px] text-muted-foreground">{k}</span>
              <span className="block font-mono text-[13px] text-foreground">{v}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5">
        <DataValue value={rest} />
      </div>
    </>
  );
}

function ScoreBlock({ data }: { data: Record<string, string> }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-surface p-4 text-center">
          <div className="font-display text-2xl text-foreground">{String(v)}</div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {k}
          </div>
        </div>
      ))}
    </div>
  );
}
