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
    <section id={id} className="scroll-mt-32 py-14">
      <div className="gradient-rule mb-8" />
      <h2 className="font-ink text-[20px] leading-[1.4] tracking-[0.08em] text-foreground">
        {title}
      </h2>
      <div className="mt-6 text-[14px] leading-[1.9] text-muted-foreground">{children}</div>
    </section>
  );
}

export function FieldList({ data }: { data: Record<string, string> }) {
  return (
    <dl className="grid gap-px bg-border sm:grid-cols-2">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="bg-background p-5">
          <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            {k}
          </dt>
          <dd className="mt-3 text-[14px] leading-[1.9] text-muted-foreground">{v}</dd>
        </div>
      ))}
    </dl>
  );
}