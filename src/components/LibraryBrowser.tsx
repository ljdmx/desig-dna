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
      <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[92rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 sm:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <Logo className="h-7 w-7 shrink-0" />
            <span className="truncate font-display text-[15px] tracking-[0.24em] uppercase text-foreground">
              Design DNA Library
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-[92rem] px-6 sm:px-10">
        <section className="animate-enter-up ink-wash relative py-20 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                <span className="h-px w-8 bg-accent" />
                {version.meta.name} · {version.meta.version}
              </span>
              <h1 className="mt-8 font-display text-[46px] font-light leading-[1.05] tracking-tight text-foreground sm:text-[86px]">
                {version.group}
                <span className="block text-muted-foreground">
                  <span className="font-mono text-[0.42em] align-middle tracking-[0.2em]">
                    {String(version.systems.length).padStart(2, "0")}
                  </span>{" "}
                  Systems
                </span>
              </h1>
            </div>
            <p className="max-w-md border-l border-border pl-6 text-[15px] leading-[2] text-muted-foreground lg:pb-4">
              {version.tagline}，支持 Markdown / JSON / 色值一键复制。
            </p>
          </div>

          <div className="mt-16">
            <VersionTabs current={version.slug} />
          </div>

          <div className="mt-12 max-w-xl">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索方案名称、关键词或设计哲学…"
                className="w-full border-0 border-b border-border bg-transparent py-3 pl-7 pr-2 text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-colors duration-300 focus:border-accent focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
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

        <section className="py-16">
          <p className="mb-10 font-mono text-[11px] tracking-[0.35em] text-muted-foreground">
            {String(results.length).padStart(2, "0")} / {version.systems.length} SYSTEMS
          </p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
            {results.map((d, i) => (
              <DesignCard
                key={d.id}
                design={d}
                index={i}
                version={version.slug}
                optimizationFramework={version.optimizationFramework}
                showColors={version.group !== "动效系统"}
              />
            ))}
          </div>
          {results.length === 0 && (
            <p className="py-24 text-center font-display text-lg text-muted-foreground">
              没有匹配的设计方案，试试其他关键词。
            </p>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-3 px-6 py-16 text-[11px] uppercase tracking-[0.24em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span className="font-mono">
            {version.meta.name} {version.meta.version}
          </span>
          <span className="tracking-[0.18em] normal-case">
            为全球顶级设计师与品牌打造的高级设计系统展示平台
          </span>
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
        "relative pb-1 text-[12px] tracking-[0.08em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
        (active
          ? "text-foreground after:w-full"
          : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full")
      }
    >
      {children}
    </button>
  );
}
