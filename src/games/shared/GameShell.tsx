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

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DifficultyPicker } from "./DifficultyPicker";
import { useLocalScores } from "./hooks/useLocalScores";
import type { Badge, Difficulty, GameScore } from "./types";

type GameShellContextValue = {
  gameId: string;
  difficulty: Difficulty;
  setDifficulty: (next: Difficulty) => void;
  resetCount: number;
  reset: () => void;
  recordScore: (
    score: Omit<GameScore, "gameId" | "bestScore" | "completedAt">,
  ) => void;
  awardBadge: (badge: Badge) => void;
  hasBadge: (badgeId: string) => boolean;
  bestScore: number | null;
};

const GameShellContext = createContext<GameShellContextValue | null>(null);

export function useGameShell(): GameShellContextValue {
  const ctx = useContext(GameShellContext);
  if (!ctx) {
    throw new Error("useGameShell must be used inside <GameShell>");
  }
  return ctx;
}

type GameShellProps = Readonly<{
  gameId: string;
  title: string;
  description?: ReactNode;
  howToPlay?: ReactNode;
  children: ReactNode;
  initialDifficulty?: Difficulty;
  /**
   * "full" (default) — renders the outer card, title, difficulty picker,
   * reset button, and how-to-play collapse. Use for pages that embed a game
   * in normal site content flow.
   *
   * "headless" — only provides context + children + the badge earned dialog.
   * The game owns its own chrome (header, difficulty picker, reset, help).
   * Use for full-viewport game layouts like The Digital House.
   */
  chrome?: "full" | "headless";
}>;

export function GameShell({
  gameId,
  title,
  description,
  howToPlay,
  children,
  initialDifficulty = "easy",
  chrome = "full",
}: GameShellProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [resetCount, setResetCount] = useState(0);
  const [howToOpen, setHowToOpen] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);

  const scores = useLocalScores();
  const existing = scores.getScore(gameId);
  const bestScore = existing ? existing.bestScore : null;

  const onDifficultyChange = useCallback((next: Difficulty) => {
    setDifficulty(next);
    setResetCount((c) => c + 1);
  }, []);

  const onReset = useCallback(() => {
    setResetCount((c) => c + 1);
  }, []);

  const recordScore = useCallback(
    (score: Omit<GameScore, "gameId" | "bestScore" | "completedAt">) => {
      void scores.recordScore({
        ...score,
        gameId,
        bestScore: score.score,
        completedAt: new Date().toISOString(),
      });
    },
    [gameId, scores],
  );

  const awardBadge = useCallback(
    (badge: Badge) => {
      if (scores.hasBadge(badge.id)) return;
      void scores.earnBadge(badge).then(() => setEarnedBadge(badge));
    },
    [scores],
  );

  const hasBadge = useCallback(
    (badgeId: string) => scores.hasBadge(badgeId),
    [scores],
  );

  const ctxValue = useMemo<GameShellContextValue>(
    () => ({
      gameId,
      difficulty,
      setDifficulty: onDifficultyChange,
      resetCount,
      reset: onReset,
      recordScore,
      awardBadge,
      hasBadge,
      bestScore,
    }),
    [
      gameId,
      difficulty,
      onDifficultyChange,
      resetCount,
      onReset,
      recordScore,
      awardBadge,
      hasBadge,
      bestScore,
    ],
  );

  useEffect(() => {
    if (!earnedBadge) return;
    const t = globalThis.setTimeout(() => setEarnedBadge(null), 6000);
    return () => globalThis.clearTimeout(t);
  }, [earnedBadge]);

  if (chrome === "headless") {
    return (
      <GameShellContext.Provider value={ctxValue}>
        {children}
        {earnedBadge && (
          <dialog
            open
            aria-label="Badge earned"
            className="fixed inset-x-3 top-20 bottom-auto z-80 mx-auto flex max-w-sm items-start gap-3 rounded-feature border border-border-accent bg-surface-hover p-4 shadow-card-hover backdrop-blur-md min-[820px]:inset-x-0 min-[820px]:top-auto min-[820px]:bottom-6 dark:border-sky-700/60 dark:bg-slate-900/95 dark:ring-sky-800/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface border border-border-accent text-lg font-bold text-accent">
              ★
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
                Badge earned
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink">
                {earnedBadge.name}
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                {earnedBadge.description}
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss badge notification"
              onClick={() => setEarnedBadge(null)}
              className="text-ink-dim hover:text-ink"
            >
              ×
            </button>
          </dialog>
        )}
      </GameShellContext.Provider>
    );
  }

  return (
    <GameShellContext.Provider value={ctxValue}>
      <section
        aria-label={title}
        className="relative w-full max-w-6xl rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-5 shadow-card sm:p-7"
      >
        <header className="relative flex flex-col gap-4 border-b border-hairline pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-h2 tracking-h2 font-semibold text-ink">
              {title}
            </h1>
            {description && (
              <p className="mt-1 max-w-2xl text-sm text-ink-muted">
                {description}
              </p>
            )}
            {bestScore !== null && (
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
                Best score: {bestScore}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DifficultyPicker
              value={difficulty}
              onChange={onDifficultyChange}
            />
            <button
              type="button"
              onClick={onReset}
              style={{ touchAction: "manipulation" }}
              className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition-colors hover:bg-surface-hover touch-manipulation"
            >
              Reset
            </button>
          </div>
        </header>

        <div className="relative mt-5">{children}</div>

        {howToPlay && (
          <div className="relative mt-6 border-t border-hairline pt-4">
            <button
              type="button"
              aria-expanded={howToOpen}
              onClick={() => setHowToOpen((v) => !v)}
              style={{ touchAction: "manipulation" }}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink touch-manipulation"
            >
              <span>How to play</span>
              <span aria-hidden className="text-ink-dim">
                {howToOpen ? "−" : "+"}
              </span>
            </button>
            {howToOpen && (
              <div className="mt-3 space-y-2 text-sm text-ink-muted">
                {howToPlay}
              </div>
            )}
          </div>
        )}
      </section>

      {earnedBadge && (
        <dialog
          open
          aria-label="Badge earned"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto flex max-w-sm items-start gap-3 rounded-feature border border-border-accent bg-surface-hover p-4 shadow-card-hover backdrop-blur-md dark:border-sky-700/60 dark:bg-slate-900/95 dark:ring-sky-800/50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface border border-border-accent text-lg font-bold text-accent">
            ★
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
              Badge earned
            </p>
            <p className="mt-0.5 text-sm font-semibold text-ink">
              {earnedBadge.name}
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">
              {earnedBadge.description}
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss badge notification"
            onClick={() => setEarnedBadge(null)}
            className="text-ink-dim hover:text-ink"
          >
            ×
          </button>
        </dialog>
      )}
    </GameShellContext.Provider>
  );
}
