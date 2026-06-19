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

import type { Difficulty } from "./types";

type DifficultyPickerProps = Readonly<{
  value: Difficulty;
  onChange: (next: Difficulty) => void;
  disabled?: boolean;
}>;

type DifficultyOption = Readonly<{
  id: Difficulty;
  label: string;
  hint: string;
}>;

const OPTIONS: ReadonlyArray<DifficultyOption> = [
  { id: "easy", label: "Easy", hint: "Zones pre-assigned" },
  { id: "medium", label: "Medium", hint: "Assign some zones" },
  { id: "hard", label: "Hard", hint: "Architect everything" },
];

export function DifficultyPicker({
  value,
  onChange,
  disabled = false,
}: DifficultyPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Difficulty"
      className="inline-flex flex-wrap items-center gap-1 rounded-full border border-hairline bg-surface p-1 text-xs font-medium shadow-sm backdrop-blur-md"
    >
      {OPTIONS.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(opt.id)}
            title={opt.hint}
            style={{ touchAction: "manipulation" }}
            className={[
              "touch-manipulation rounded-full px-3 py-1.5 transition-colors",
              active
                ? "bg-accent-fill text-accent-contrast shadow-sm"
                : "text-ink hover:bg-surface-hover",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
