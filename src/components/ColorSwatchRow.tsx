import type { ColorSystem } from "@/data/library";
import { cn } from "@/lib/utils";

export function ColorSwatchRow({
  colors,
  className,
}: {
  colors: ColorSystem;
  className?: string;
}) {
  const previewKeys = ["primary", "secondary", "accent", "background"] as const;
  return (
    <div className={cn("flex gap-2", className)}>
      {previewKeys.map((k) => (
        <span
          key={k}
          className="h-8 w-8 rounded-lg ring-1 ring-border/30 shadow-sm transition-transform duration-200 hover:scale-110"
          style={{ backgroundColor: colors[k] }}
          title={`${k} ${colors[k]}`}
        />
      ))}
    </div>
  );
}
