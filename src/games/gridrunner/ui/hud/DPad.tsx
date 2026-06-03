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

export type DPadDirection = "up" | "down" | "left" | "right";

type DPadProps = Readonly<{
  onPress?: (direction: DPadDirection) => void;
  onRelease?: (direction: DPadDirection) => void;
}>;

// One upward triangle, rotated per direction. Replaces the previous Unicode
// glyphs (U+25C0/U+25B6), which mobile rendered with emoji presentation and
// therefore drew as colored play-button emoji instead of plain cyan triangles.
// The path's centroid sits at the 24x24 viewBox center so rotation stays put.
const ROTATION: Record<DPadDirection, string> = {
  up: "rotate-0",
  right: "rotate-90",
  down: "rotate-180",
  left: "-rotate-90",
};

const GRID_AREA: Record<DPadDirection, string> = {
  up: "1 / 2 / 2 / 3",
  left: "2 / 1 / 3 / 2",
  right: "2 / 3 / 3 / 4",
  down: "3 / 2 / 4 / 3",
};

function DPadArrow({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12 4 19 16H5Z" />
    </svg>
  );
}

export function DPad({ onPress, onRelease }: DPadProps) {
  return (
    <nav
      data-testid="gr-dpad"
      aria-label="Directional pad"
      className="grid grid-cols-[repeat(3,32px)] grid-rows-[repeat(3,32px)] gap-0.5 sm:grid-cols-[repeat(3,40px)] sm:grid-rows-[repeat(3,40px)] lg:grid-cols-[repeat(3,48px)] lg:grid-rows-[repeat(3,48px)]"
    >
      {(["up", "down", "left", "right"] as const).map((dir) => (
        <button
          key={dir}
          type="button"
          data-testid={`gr-dpad-${dir}`}
          aria-label={`Move ${dir}`}
          onPointerDown={() => onPress?.(dir)}
          onPointerUp={() => onRelease?.(dir)}
          onPointerCancel={() => onRelease?.(dir)}
          className="flex h-8 w-8 touch-none items-center justify-center rounded-sm border border-[#1a3a4a] bg-[#0f1b2d] text-[#00f0ff] shadow-[inset_0_0_6px_rgba(0,240,255,0.08)] active:brightness-150 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          style={{ gridArea: GRID_AREA[dir] }}
        >
          <DPadArrow
            className={`h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 ${ROTATION[dir]}`}
          />
        </button>
      ))}
      <div
        aria-hidden="true"
        className="rounded-sm border border-[#1a3a4a] bg-[#0a1220] [grid-area:2/2/3/3]"
      />
    </nav>
  );
}
