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
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wide",
        "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "solid"
          ? "bg-gradient-to-r from-accent to-accent-soft text-accent-foreground hover:opacity-90"
          : "border border-border bg-surface text-foreground hover:border-accent/60 hover:bg-surface-raised",
        className,
      )}
      aria-label={label}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </button>
  );
}