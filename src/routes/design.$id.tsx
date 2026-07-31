import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { ColorSwatchRow } from "@/components/ColorSwatchRow";
import { CopyButton } from "@/components/CopyButton";
import { FieldList, SectionBlock } from "@/components/SectionBlock";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FIELD_LABELS, getDesign, type DesignSystem } from "@/data/library";
import { toColors, toJson, toMarkdown } from "@/lib/export";

export const Route = createFileRoute("/design/$id")({
  loader: ({ params }) => {
    const design = getDesign(params.id);
    if (!design) throw notFound();
    return { design };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "方案未找到 · Design DNA Library" }, { name: "robots", content: "noindex" }],
      };
    }
    const { design } = loaderData;
    const title = `${design.name} · ${design.id} | Design DNA Library`;
    const description = design.design_philosophy.slice(0, 150);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DesignDetail,
});

const SECTIONS = [
  ["philosophy", FIELD_LABELS.design_philosophy],
  ["color", FIELD_LABELS.color_system],
  ["material", FIELD_LABELS.material_language],
  ["layout", FIELD_LABELS.layout_system],
  ["typography", FIELD_LABELS.typography_system],
  ["motion", FIELD_LABELS.motion_system],
  ["image", FIELD_LABELS.image_direction],
  ["ui", FIELD_LABELS.ui_elements],
  ["scene", FIELD_LABELS.experience_scene],
  ["score", FIELD_LABELS.premium_score],
] as const;

function DesignDetail() {
  const { design } = Route.useLoaderData() as { design: DesignSystem };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <Link
            to="/"
            className="inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">返回全部方案</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 pb-4">
          <CopyButton
            variant="solid"
            label="复制 Markdown"
            getText={() => toMarkdown(design)}
            toastMessage="已复制完整 Markdown 方案"
          />
          <CopyButton
            label="复制 JSON"
            getText={() => toJson(design)}
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
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block truncate text-muted-foreground transition-colors duration-200 hover:text-accent-soft"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 pb-24">
          <section className="animate-enter-up py-16">
            <span className="font-mono text-xs tracking-[0.25em] text-accent-soft">
              {design.id}
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

          <SectionBlock id="philosophy" title={FIELD_LABELS.design_philosophy}>
            <p>{design.design_philosophy}</p>
          </SectionBlock>

          <SectionBlock id="color" title={FIELD_LABELS.color_system}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(design.color_system)
                .filter(([k, v]) => k !== "lighting" && typeof v === "string")
                .map(([k, v]) => (
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
            <p className="mt-4 text-[14px] leading-[1.6]">{design.color_system.lighting}</p>

            {(() => {
              const tcs = (design.color_system as Record<string, unknown>).time_color_system;
              if (!tcs || typeof tcs !== "object" || Array.isArray(tcs)) return null;
              return (
                <>
                  <h4 className="mt-6 mb-3 text-sm font-medium text-foreground">
                    时间色彩系统 Time Color System
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {Object.entries(tcs as Record<string, string>).map(([k, v]) => (
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
                </>
              );
            })()}
          </SectionBlock>

          <SectionBlock id="material" title={FIELD_LABELS.material_language}>
            <FieldList data={design.material_language} />
          </SectionBlock>
          <SectionBlock id="layout" title={FIELD_LABELS.layout_system}>
            <FieldList data={design.layout_system} />
          </SectionBlock>
          <SectionBlock id="typography" title={FIELD_LABELS.typography_system}>
            <FieldList data={design.typography_system} />
          </SectionBlock>
          <SectionBlock id="motion" title={FIELD_LABELS.motion_system}>
            <FieldList data={design.motion_system} />
          </SectionBlock>
          <SectionBlock id="image" title={FIELD_LABELS.image_direction}>
            <FieldList data={design.image_direction} />
          </SectionBlock>
          <SectionBlock id="ui" title={FIELD_LABELS.ui_elements}>
            <FieldList data={design.ui_elements} />
          </SectionBlock>
          <SectionBlock id="scene" title={FIELD_LABELS.experience_scene}>
            <p>{design.experience_scene}</p>
          </SectionBlock>
          <SectionBlock id="score" title={FIELD_LABELS.premium_score}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {Object.entries(design.premium_score).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-surface p-4 text-center">
                  <div className="font-display text-2xl text-foreground">{v}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        </main>
      </div>
    </div>
  );
}
