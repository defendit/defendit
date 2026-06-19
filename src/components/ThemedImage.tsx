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

// Renders a paired light/dark illustration and swaps it by the `.dark` class.
// Pass the dark source; the light counterpart is derived by naming convention
// (`<name>-dark.<ext>` -> `<name>-light.png`) unless an explicit `light` is
// given. Both variants are next/image `fill` images, so the parent element
// must be positioned and sized (e.g. a `relative` figure with an aspect ratio).
// Both stay laid out at full size and the inactive one is faded out with
// `opacity-0` (not `display:none`): display:none reports a 0px-wide box, which
// makes next/image wrongly warn that a 100vw image isn't full width. The dark
// variant is `alt=""`/`aria-hidden`, so screen readers still announce one alt.

import Image from "next/image";

function toLightSrc(darkSrc: string): string {
  return darkSrc.replace(/-dark\.(?:jpe?g|png|webp)$/i, "-light.png");
}

type ThemedImageProps = Readonly<{
  dark: string;
  light?: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}>;

export function ThemedImage({
  dark,
  light,
  alt,
  sizes,
  className = "",
  priority,
}: ThemedImageProps) {
  const lightSrc = light ?? toLightSrc(dark);

  return (
    <>
      <Image
        src={lightSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${className} opacity-100 dark:opacity-0`}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className={`${className} opacity-0 dark:opacity-100`}
      />
    </>
  );
}

export default ThemedImage;
