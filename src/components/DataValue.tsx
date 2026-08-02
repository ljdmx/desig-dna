import { labelOf } from "@/data/library";

const isHex = (v: unknown) => typeof v === "string" && /^#([0-9a-f]{3,8})$/i.test(v.trim());

const prettyKey = (k: string) => k.replace(/_/g, " ");

const isScalarObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  Object.values(v as Record<string, unknown>).every((val) => val === null || typeof val !== "object");

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
  return <span className="text-[14px] leading-[1.75] text-muted-foreground">{String(value)}</span>;
}

/** All-scalar object rendered as one comfortable inline row: KEY value · KEY value … */
function InlineObject({ obj }: { obj: Record<string, unknown> }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
      {Object.entries(obj).map(([k, v]) => (
        <span key={k} className="inline-flex items-baseline gap-2">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-soft">
            {prettyKey(k)}
          </span>
          {isHex(v) || typeof v === "boolean" ? (
            <Scalar value={v} />
          ) : (
            <span className="text-[13px] leading-[1.7] text-foreground/90">{String(v)}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/** Renders any JSON value from the source data, exactly as it exists. */
export function DataValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  if (value === null || value === undefined) return null;

  if (Array.isArray(value)) {
    const allScalar = value.every((v) => typeof v !== "object" || v === null);
    if (allScalar) {
      const hasLong = value.some((v) => String(v).length > 14);
      if (hasLong) {
        return (
          <ul className="space-y-2">
            {value.map((v, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-[14px] leading-[1.7] text-muted-foreground"
              >
                <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-accent-soft/70" />
                <span className="min-w-0">{String(v)}</span>
              </li>
            ))}
          </ul>
        );
      }
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
      <div className="space-y-2.5">
        {value.map((v, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface px-4 py-3">
            {isScalarObject(v) ? (
              <InlineObject obj={v} />
            ) : (
              <DataValue value={v} depth={depth + 1} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);

    if (depth === 0) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map(([k, v]) => {
            const nested = v !== null && typeof v === "object";
            const longScalar = !nested && String(v).length > 28;
            return (
              <div
                key={k}
                className={
                  "rounded-xl border border-border bg-surface p-5" +
                  (nested || longScalar ? " sm:col-span-2" : "")
                }
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-soft">
                  {labelOf(k)}
                </div>
                <div className="mt-2.5">
                  <DataValue value={v} depth={1} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {entries.map(([k, v]) => {
          const nested = v !== null && typeof v === "object";
          const inline = isScalarObject(v);
          return (
            <div key={k} className={nested && !inline ? "border-l-2 border-accent/25 pl-4" : ""}>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft/90">
                {prettyKey(k)}
              </div>
              <div className="mt-1.5">
                {inline ? (
                  <InlineObject obj={v as Record<string, unknown>} />
                ) : (
                  <DataValue value={v} depth={depth + 1} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <Scalar value={value} />;
}
