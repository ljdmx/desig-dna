import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { DesignCard } from "@/components/DesignCard";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { allKeywords, designSystems, library } from "@/data/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Web Design DNA Library v7.0 · 32 个顶级设计系统" },
      {
        name: "description",
        content:
          "沉浸式数字美术馆，收录 32 个顶级 Web 设计系统的色彩、排版、动效与材质方案，支持一键复制 Markdown、JSON 与全部色值。",
      },
      { property: "og:title", content: "探索 32 个顶级设计系统" },
      {
        property: "og:description",
        content: "Premium Web Design DNA Library™ v7.0 — 可被探索的数字设计艺术品。",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState<string | null>(null);

  const topKeywords = useMemo(() => allKeywords.slice(0, 18), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return designSystems.filter((d) => {
      const matchesKeyword = !keyword || d.design_keywords.includes(keyword);
      const matchesQuery =
        !q ||
        [d.id, d.name, d.design_philosophy, d.visual_positioning, ...d.design_keywords]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesKeyword && matchesQuery;
    });
  }, [query, keyword]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="truncate font-display text-sm tracking-wide text-foreground">
              Design DNA Library
            </span>
            <span className="hidden shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline">
              {library.version}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5">
        <section className="animate-enter-up py-20 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
            {library.name} · {library.version}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[34px] leading-[1.4] text-foreground sm:text-[48px]">
            探索 {library.design_count} 个顶级设计系统
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.6] text-muted-foreground">
            每个方案都是一件可被探索的数字艺术品——完整的色彩体系、材质语言、排版秩序与动效叙事，
            支持 Markdown、JSON 与全部色值一键复制。
          </p>

          <div className="mt-10 max-w-xl">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索方案名称、关键词或设计哲学…"
                className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip active={keyword === null} onClick={() => setKeyword(null)}>
              全部
            </FilterChip>
            {topKeywords.map((k) => (
              <FilterChip
                key={k}
                active={keyword === k}
                onClick={() => setKeyword(keyword === k ? null : k)}
              >
                {k}
              </FilterChip>
            ))}
          </div>
        </section>

        <div className="gradient-rule" />

        <section className="py-12">
          <p className="mb-8 font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {results.length} / {designSystems.length} SYSTEMS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d, i) => (
              <DesignCard key={d.id} design={d} index={i} />
            ))}
          </div>
          {results.length === 0 && (
            <p className="py-20 text-center text-sm text-muted-foreground">
              没有匹配的设计方案，试试其他关键词。
            </p>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {library.name} {library.version}
          </span>
          <span>为全球顶级设计师与品牌打造的高级设计系统展示平台</span>
        </div>
      </footer>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
        (active
          ? "border-transparent bg-gradient-to-r from-accent to-accent-soft text-accent-foreground"
          : "border-border bg-surface text-muted-foreground hover:border-accent/50 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}