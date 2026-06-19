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

// Full-bleed marketing hero, the same treatment as the homepage hero: a themed
// illustration bleeds edge to edge behind a left-aligned content column, with a
// ground-color scrim (auto light/dark) keeping the copy readable over the art.
// Pass the content (eyebrow, headline, sub, CTAs) as children.

import type { ReactNode } from "react";
import { ThemedImage } from "@/components/ThemedImage";

type HeroBannerProps = Readonly<{
  dark: string;
  /** Optional explicit light source; derived from `dark` when omitted. */
  light?: string;
  alt: string;
  /** object-position for the art; defaults to anchoring the house to the bottom. */
  position?: string;
  children: ReactNode;
}>;

export function HeroBanner({
  dark,
  light,
  alt,
  position = "object-bottom",
  children,
}: HeroBannerProps) {
  return (
    <section className="relative isolate -mx-3 flex min-h-[20rem] w-full items-start overflow-hidden sm:mx-0 sm:min-h-[34rem] sm:items-center lg:min-h-[40rem]">
      <ThemedImage
        dark={dark}
        light={light}
        alt={alt}
        sizes="100vw"
        priority
        className={`object-cover ${position}`}
      />
      {/* Readability scrim. Below lg the copy spans nearly the full width, so
          wash the whole frame. At lg+ the copy sits on the right with real space
          to its left, so a directional fade keeps the art visible there. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/75 to-ground/40 lg:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-l from-ground via-ground/85 to-transparent to-80% lg:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-ground to-transparent to-[22%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ground to-transparent to-[18%]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="ml-auto flex w-full max-w-xl flex-col items-end text-right md:max-w-2xl">
          {children}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
