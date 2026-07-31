import { HEX_KEYS, type ColorSystem } from "@/data/library";
import { cn } from "@/lib/utils";

export function ColorSwatchRow({
  colors,
  className,
}: {
  colors: ColorSystem;
  className?: string;
}) {
  return (
    <div className={cn("flex h-1.5 w-full overflow-hidden rounded-full", className)}>
      {HEX_KEYS.map((k) => (
        <span
          key={k}
          className="flex-1"
          style={{ backgroundColor: colors[k] }}
          title={`${k} ${colors[k]}`}
        />
      ))}
    </div>
  );
}