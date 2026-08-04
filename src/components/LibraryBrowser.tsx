import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { DesignCard } from "@/components/DesignCard";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VersionTabs } from "@/components/VersionTabs";
import {
  keywordsOf,
  keywordsOfDesign,
  nameOf,
  positioningOf,
  summaryOf,
  type LibraryVersion,
} from "@/data/library";

export function LibraryBrowser({ version }: { version: LibraryVersion }) {
  const [query, setQuery] = useState("");
  const [keyword, setKeyword] = useState<string | null>(null);

  const topKeywords = useMemo(() => keywordsOf(version).slice(0, 18), [version]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return version.systems.filter((d) => {
      const matchesKeyword = !keyword || keywordsOfDesign(d).includes(keyword);
      const matchesQuery =
        !q ||
        [d.id, nameOf(d), summaryOf(d), positioningOf(d), ...keywordsOfDesign(d)]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesKeyword && matchesQuery;
    });
  }, [query, keyword, version]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="truncate font-display text-sm tracking-wide text-foreground">
              Design DNA Library
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5">
        <section className="animate-enter-up py-12 sm:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-soft/80">
            {version.meta.name} · {version.meta.version}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[28px] leading-[1.3] text-foreground sm:text-[40px]">
            探索 {version.systems.length} 个顶级设计系统
          </h1>
          <p className="mt-3 max-w-xl text-[14px] leading-[1.6] text-muted-foreground">
            {version.tagline}，支持 Markdown / JSON / 色值一键复制。
          </p>

          <div className="mt-6">
            <VersionTabs current={version.slug} />
          </div>

          <div className="mt-8 max-w-lg">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索方案名称、关键词或设计哲学…"
                className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
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
            {results.length} / {version.systems.length} SYSTEMS
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d, i) => (
              <DesignCard
                key={d.id}
                design={d}
                index={i}
                version={version.slug}
                optimizationFramework={version.optimizationFramework}
              />
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
            {version.meta.name} {version.meta.version}
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
