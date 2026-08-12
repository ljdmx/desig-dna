import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { copyText } from "@/lib/export";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  getText: () => string;
  toastMessage: string;
  className?: string;
  variant?: "solid" | "ghost";
};

export function CopyButton({
  label,
  getText,
  toastMessage,
  className,
  variant = "ghost",
}: Props) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const ok = await copyText(getText());
        if (!ok) {
          toast.error("复制失败，请重试");
          return;
        }
        setDone(true);
        toast.success(toastMessage);
        window.setTimeout(() => setDone(false), 1600);
      }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.18em]",
        "transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        variant === "solid"
          ? "bg-foreground text-background hover:opacity-85"
          : "border border-border text-muted-foreground hover:border-accent hover:text-foreground",
        className,
      )}
      aria-label={label}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </button>
  );
}