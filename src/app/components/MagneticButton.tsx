import { type ButtonHTMLAttributes } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { cn } from "./ui/utils";

export interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Magnetic pull strength (0 = none). */
  strength?: number;
}

/**
 * Primary CTA with a magnetic hover pull and a diya (gold) glow. Defaults to the
 * brand gradient; pass `className` to override. Touch / reduced-motion users get
 * a normal button (the magnetic effect no-ops).
 */
export function MagneticButton({
  className,
  strength = 0.3,
  children,
  onPointerMove,
  onPointerLeave,
  ...rest
}: MagneticButtonProps) {
  const { ref, onPointerMove: magMove, onPointerLeave: magLeave } = useMagnetic<HTMLButtonElement>(strength);
  return (
    <button
      ref={ref}
      onPointerMove={(e) => {
        magMove(e);
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        magLeave();
        onPointerLeave?.(e);
      }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-6 py-3 font-medium text-white",
        "transition-[transform,box-shadow] duration-300 ease-out will-change-transform active:scale-95",
        "bg-grad-brand hover:[box-shadow:0_0_28px_-4px_var(--gold)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
