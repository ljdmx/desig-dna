import { cn } from "@/lib/utils";

export function ColorSwatchRow({
  colors,
  className,
}: {
  colors: [string, string][];
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2", className)}>
      {colors.slice(0, 5).map(([k, hex], i) => (
        <span
          key={`${k}-${i}`}
          className="h-8 w-8 rounded-lg ring-1 ring-border/30 shadow-sm transition-transform duration-200 hover:scale-110"
          style={{ backgroundColor: hex }}
          title={`${k} ${hex}`}
        />
      ))}
    </div>
  );
}
