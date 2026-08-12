import { cn } from "@/lib/utils";

export function ColorSwatchRow({
  colors,
  className,
}: {
  colors: [string, string][];
  className?: string;
}) {
  return (
    <div className={cn("flex", className)}>
      {colors.slice(0, 5).map(([k, hex], i) => (
        <span
          key={`${k}-${i}`}
          className="h-10 flex-1 transition-transform duration-500 hover:-translate-y-1"
          style={{ backgroundColor: hex }}
          title={`${k} ${hex}`}
        />
      ))}
    </div>
  );
}
