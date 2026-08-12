import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ColorSwatchRow } from "@/components/ColorSwatchRow";
import { CopyButton } from "@/components/CopyButton";
import { DataValue } from "@/components/DataValue";
import { SectionBlock } from "@/components/SectionBlock";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  HERO_FIELDS,
  categoryOf,
  collectHexes,
  englishOf,
  getDesign,
  getVersion,
  keywordsOfDesign,
  labelOf,
  nameOf,
  positioningOf,
  summaryOf,
  swatchesOf,
} from "@/data/library";
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
    const title = `${nameOf(design)} · ${design.id} ${loaderData.versionLabel} | Design DNA Library`;
    const description = summaryOf(design).slice(0, 150);
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
  const versionEntry = getVersion(versionSlug);
  const optimizationFramework = versionEntry?.optimizationFramework;
  const showColors = versionEntry?.group !== "动效系统";

  const sectionKeys = Object.keys(design).filter((k) => !HERO_FIELDS.has(k));
  const navKeys = optimizationFramework ? [...sectionKeys, "optimization_framework"] : sectionKeys;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:px-10">
          <Link
            to="/version/$version"
            params={{ version: versionSlug }}
            className="inline-flex min-w-0 items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">返回 {versionLabel} 全部方案</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-6 pb-5 sm:px-10">
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
          {showColors && (
            <CopyButton
              label="复制全部色值"
              getText={() => toColors(design)}
              toastMessage="已复制全部色值"
            />
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:flex lg:gap-16">
        <nav className="hidden shrink-0 lg:block lg:w-52">
          <ul className="sticky top-40 space-y-3 py-24 text-[11px] uppercase tracking-[0.14em]">
            {navKeys.map((k) => (
              <li key={k}>
                <a
                  href={`#${slug(k)}`}
                  className="block truncate text-muted-foreground transition-colors duration-300 hover:text-accent"
                >
                  {labelOf(k)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 pb-32">
          <section className="animate-enter-up ink-wash py-24 sm:py-32">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {design.id} · {versionLabel}
            </span>
            <h1 className="mt-8 font-ink text-[38px] font-medium leading-[1.2] tracking-[0.02em] text-foreground sm:text-[64px]">
              {nameOf(design)}
            </h1>
            {(englishOf(design) || categoryOf(design)) && (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {[englishOf(design), categoryOf(design)].filter(Boolean).join(" · ")}
              </p>
            )}
            <p className="mt-8 max-w-2xl border-l border-border pl-6 text-[15px] leading-[2] text-muted-foreground">
              {positioningOf(design)}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {keywordsOfDesign(design).map((k) => (
                <span
                  key={k}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
            <ColorSwatchRow colors={swatchesOf(design)} className="mt-12" />
          </section>

          {sectionKeys.map((key) => (
            <SectionBlock key={key} id={slug(key)} title={labelOf(key)}>
              {key === "color_system" || key === "color_dna" ? (
                <ColorSystemBlock data={design[key] as Record<string, unknown>} />
              ) : key === "premium_score" ? (
                <ScoreBlock data={design.premium_score ?? {}} />
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
  const swatches = collectHexes(data);
  const rest = Object.fromEntries(
    Object.entries(data).filter(
      ([, v]) => !(typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v)),
    ),
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {swatches.map(([k, v], i) => (
          <button
            key={`${k}-${i}`}
            type="button"
            onClick={() => navigator.clipboard?.writeText(v)}
            className="group overflow-hidden bg-background text-left transition-transform duration-500 hover:-translate-y-1"
          >
            <span className="block h-24 w-full" style={{ backgroundColor: v }} />
            <span className="block px-3 py-3">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {k}
              </span>
              <span className="block font-mono text-[13px] text-foreground">{v}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <DataValue value={rest} />
      </div>
    </>
  );
}

function ScoreBlock({ data }: { data: Record<string, string> }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-5">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="bg-background p-6 text-center">
          <div className="font-display text-3xl text-foreground">{String(v)}</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {k}
          </div>
        </div>
      ))}
    </div>
  );
}
