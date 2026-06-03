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
 * Eyebrow — the single eyebrow/kicker label treatment from
 * DIS-DESIGN-AND-BRAND-STANDARDS §6.2c: 0.75rem, semibold, uppercase, accent
 * color, and one fixed 0.2em tracking (resolving the prior 0.18/0.25/0.28em
 * drift). Renders a <p> by default; pass `as="span"` for inline use.
 */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const EYEBROW =
  "text-eyebrow font-semibold uppercase tracking-eyebrow text-accent";

type EyebrowOwnProps<T extends ElementType> = {
  /** Element or component to render. Defaults to `p`. */
  as?: T;
  className?: string;
  children?: ReactNode;
};

export type EyebrowProps<T extends ElementType = "p"> = Readonly<
  EyebrowOwnProps<T>
> &
  Omit<ComponentPropsWithoutRef<T>, keyof EyebrowOwnProps<T>>;

export function Eyebrow<T extends ElementType = "p">({
  as,
  className,
  children,
  ...rest
}: EyebrowProps<T>) {
  const Tag = as ?? "p";
  const classes = className ? `${EYEBROW} ${className}` : EYEBROW;

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Eyebrow;
