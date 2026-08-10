import { Link } from "@tanstack/react-router";

import { VERSIONS } from "@/data/library";

export function VersionTabs({ current }: { current: string }) {
  const groups = Array.from(new Set(VERSIONS.map((v) => v.group)));
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      {groups.map((group) => (
        <div key={group} className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {group}
          </span>
          {VERSIONS.filter((v) => v.group === group).map((v) => {
            const active = v.slug === current;
            return (
              <Link
                key={v.slug}
                to="/version/$version"
                params={{ version: v.slug }}
                className={
                  "rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                  (active
                    ? "border-transparent bg-gradient-to-r from-accent to-accent-soft text-accent-foreground"
                    : "border-border bg-surface text-muted-foreground hover:border-accent/50 hover:text-foreground")
                }
              >
                {v.label}
                <span className="ml-2 font-mono text-[10px] opacity-70">{v.systems.length}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
