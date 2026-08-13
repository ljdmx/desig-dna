import { Link } from "@tanstack/react-router";

import { VERSIONS } from "@/data/library";

export function VersionTabs({
  current,
  variant = "block",
}: {
  current: string;
  variant?: "block" | "nav";
}) {
  const groups = Array.from(new Set(VERSIONS.map((v) => v.group)));

  if (variant === "nav") {
    return (
      <nav className="flex items-center gap-5">
        {groups.map((group, gi) => (
          <div key={group} className="flex items-center gap-3">
            {gi > 0 && <span className="mr-2 h-4 w-px bg-border" />}
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70 lg:inline">
              {group}
            </span>
            <div className="flex items-center gap-1">
              {VERSIONS.filter((v) => v.group === group).map((v) => {
                const active = v.slug === current;
                return (
                  <Link
                    key={v.slug}
                    to="/version/$version"
                    params={{ version: v.slug }}
                    className={
                      "group relative px-3 py-1.5 text-[12px] tracking-[0.06em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
                      (active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {v.label}
                    <span className="ml-2 font-mono text-[9px] opacity-50">
                      {v.systems.length}
                    </span>
                    <span
                      className={
                        "absolute bottom-0 left-3 right-3 h-px bg-accent transition-transform duration-300 " +
                        (active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")
                      }
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    );
  }

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
