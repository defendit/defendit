/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

/*
 * Card: the single source of the restrained surface treatment from
 * DIS-DESIGN-AND-BRAND-STANDARDS §9: one hairline border + ground + one shadow,
 * an optional faint wash, and a subtle -2px hover lift. It replaces the prior
 * stacked shadow+ring+blur+gradient cards so the recipe lives in one place.
 *
 * Polymorphic: `as` chooses the element (default <div>; pass `as={Link}` or
 * `as="button"` for an interactive surface). `interactive` adds the hover lift
 * plus the touch-target requirements (touch-manipulation + touch-action) the
 * coding standards require on tappable elements; `wash` layers the one optional
 * accent-tinted gradient.
 */

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";

const SURFACE_BASE =
  "rounded-card border border-hairline bg-surface shadow-card transition duration-200";

const SURFACE_INTERACTIVE =
  "touch-manipulation hover:-translate-y-0.5 hover:border-border-accent hover:bg-surface-hover hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const SURFACE_WASH = "bg-[image:var(--wash)]";

type CardOwnProps<T extends ElementType> = {
  /** Element or component to render. Defaults to `div`. Tying this to the type
   *  parameter lets `as={Link}` infer the element's props (e.g. `href`). */
  as?: T;
  /** Adds the hover lift and the touch-target attributes for tappable cards. */
  interactive?: boolean;
  /** Layers the single optional accent-tinted gradient wash. */
  wash?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type CardProps<T extends ElementType = "div"> = Readonly<
  CardOwnProps<T>
> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>;

export function Card<T extends ElementType = "div">({
  as,
  interactive = false,
  wash = false,
  className,
  style,
  children,
  ...rest
}: CardProps<T>) {
  const Tag = as ?? "div";

  const classes = [
    SURFACE_BASE,
    wash ? SURFACE_WASH : "",
    interactive ? SURFACE_INTERACTIVE : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // The one sanctioned inline style: tappable elements must carry both the
  // touch-manipulation class (above) and touchAction (code-standards.md).
  const composedStyle: CSSProperties | undefined = interactive
    ? { touchAction: "manipulation", ...style }
    : style;

  return (
    <Tag className={classes} style={composedStyle} {...rest}>
      {children}
    </Tag>
  );
}

export default Card;
