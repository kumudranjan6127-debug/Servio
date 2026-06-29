import { forwardRef } from "react";
import { cn } from "./ui/utils";

type GlassTier = "thin" | "base" | "strong" | "thick";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. "section", "article", "aside", "nav"). */
  as?: React.ElementType;
  /** Blur / opacity tier. `thick` is reserved for hero / showcase surfaces. */
  tier?: GlassTier;
  /** Per-surface glass tint — any CSS colour or token (sets `--glass-tint` locally). */
  tint?: string;
  /** Opt into the liquid refraction filter (Chromium only; falls back to blur). */
  refract?: boolean;
}

const TIER_CLASS: Record<GlassTier, string> = {
  thin: "glass glass-thin",
  base: "glass",
  strong: "glass glass-strong",
  thick: "glass glass-thick",
};

/**
 * The one glass surface. Replaces the five ad-hoc `bg-white/80 backdrop-blur-*`
 * tiers the audit found, so every pane shares one material, rim-light, and
 * fallback ladder. See `src/styles/glass.css`.
 */
export const GlassPanel = forwardRef<HTMLElement, GlassPanelProps>(
  function GlassPanel(
    { as: Tag = "div", tier = "base", tint, refract, className, style, children, ...rest },
    ref,
  ) {
    const mergedStyle = tint
      ? ({ ["--glass-tint"]: tint, ...style } as React.CSSProperties)
      : style;
    return (
      <Tag
        ref={ref}
        data-refract={refract ? "true" : undefined}
        className={cn(TIER_CLASS[tier], className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
