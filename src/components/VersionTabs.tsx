import { Link } from "@tanstack/react-router";

import { VERSIONS } from "@/data/library";

export function VersionTabs({ current }: { current: string }) {
  const groups = Array.from(new Set(VERSIONS.map((v) => v.group)));
  return (
    <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
            {group}
          </span>
          <div className="flex flex-wrap items-center gap-2">
          {VERSIONS.filter((v) => v.group === group).map((v) => {
            const active = v.slug === current;
            return (
              <Link
                key={v.slug}
                to="/version/$version"
                params={{ version: v.slug }}
                className={
                  "border px-5 py-2 text-[12px] tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
                  (active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-accent hover:text-foreground")
                }
              >
                {v.label}
                <span className="ml-3 font-mono text-[10px] opacity-60">{v.systems.length}</span>
              </Link>
            );
          })}
          </div>
        </div>
      ))}
    </div>
  );
}
