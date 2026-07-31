import type { ReactNode } from "react";

export function SectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-10">
      <div className="gradient-rule mb-6" />
      <h2 className="font-display text-[22px] leading-[1.4] text-foreground">{title}</h2>
      <div className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">{children}</div>
    </section>
  );
}

export function FieldList({ data }: { data: Record<string, string> }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-surface p-4">
          <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-soft">
            {k}
          </dt>
          <dd className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}