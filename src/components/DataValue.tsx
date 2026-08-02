import { labelOf } from "@/data/library";

const isHex = (v: unknown) => typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v.trim());

function Scalar({ value }: { value: unknown }) {
  if (isHex(value)) {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[13px] text-foreground">
        <span
          className="h-4 w-4 rounded ring-1 ring-border/50"
          style={{ backgroundColor: String(value) }}
        />
        {String(value)}
      </span>
    );
  }
  if (typeof value === "boolean") {
    return (
      <span
        className={
          "rounded-full px-2 py-0.5 font-mono text-[11px] " +
          (value ? "bg-accent/15 text-accent-soft" : "bg-surface-raised text-muted-foreground")
        }
      >
        {value ? "true" : "false"}
      </span>
    );
  }
  return <span className="text-[14px] leading-[1.6] text-muted-foreground">{String(value)}</span>;
}

/** Renders any JSON value from the source data, exactly as it exists. */
export function DataValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    const allScalar = value.every((v) => typeof v !== "object" || v === null);
    if (allScalar) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <span
              key={i}
              className="rounded-full bg-surface-raised px-2.5 py-1 text-[12px] text-muted-foreground"
            >
              {String(v)}
            </span>
          ))}
        </div>
      );
    }
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {value.map((v, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-4">
            <DataValue value={v} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div className={depth === 0 ? "grid gap-4 sm:grid-cols-2" : "space-y-2"}>
        {entries.map(([k, v]) => {
          const nested = v !== null && typeof v === "object";
          return (
            <div
              key={k}
              className={
                depth === 0
                  ? "rounded-xl border border-border bg-surface p-4" +
                    (nested ? " sm:col-span-2" : "")
                  : ""
              }
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-soft">
                {depth === 0 ? labelOf(k) : k}
              </div>
              <div className="mt-2">
                <DataValue value={v} depth={depth + 1} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <Scalar value={value} />;
}
