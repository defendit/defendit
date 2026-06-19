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

import Link from "next/link";
import { Card } from "./Card";

type GameCard = Readonly<{
  href: string;
  title: string;
  description: string;
  badge: string;
  meta: string;
  thumbnail: React.ReactNode;
  comingSoon?: boolean;
  demo?: boolean;
}>;

function HouseThumbnail() {
  return (
    <svg
      viewBox="0 0 140 110"
      width="140"
      height="110"
      aria-hidden
      className="drop-shadow-md"
    >
      <polygon points="70,12 16,50 124,50" fill="#4a5568" />
      <rect x="94" y="22" width="10" height="18" fill="#5d4a38" />
      <rect x="92" y="20" width="14" height="4" fill="#4a3c30" />
      <rect x="18" y="50" width="104" height="50" fill="#6b5744" />
      <rect x="22" y="54" width="48" height="20" fill="#d4c4a0" />
      <rect x="72" y="54" width="48" height="20" fill="#ccc4b4" />
      <rect x="20" y="75" width="102" height="3" fill="#4a3c30" />
      <rect x="22" y="79" width="48" height="19" fill="#d4c4a0" />
      <rect x="72" y="79" width="48" height="19" fill="#ddd8d0" />
      <rect x="18" y="100" width="104" height="5" fill="#2e261f" />
      <rect x="90" y="84" width="12" height="14" fill="#5d4a38" />
      <circle cx="100" cy="92" r="1" fill="#d4a84b" />
      <rect x="34" y="60" width="8" height="6" fill="#38bdf8" opacity="0.4" />
      <rect x="50" y="60" width="8" height="6" fill="#38bdf8" opacity="0.4" />
      <rect x="84" y="60" width="8" height="6" fill="#a78bfa" opacity="0.4" />
      <rect x="100" y="60" width="8" height="6" fill="#a78bfa" opacity="0.4" />
    </svg>
  );
}

function GridRunnerThumbnail() {
  return (
    <svg
      viewBox="0 0 140 110"
      width="140"
      height="110"
      aria-hidden
      className="drop-shadow-md"
    >
      <rect x="0" y="0" width="140" height="110" fill="#0a0e1a" rx="4" />
      <line
        x1="0"
        y1="22"
        x2="140"
        y2="22"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="44"
        x2="140"
        y2="44"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="66"
        x2="140"
        y2="66"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="0"
        y1="88"
        x2="140"
        y2="88"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="28"
        y1="0"
        x2="28"
        y2="110"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="56"
        y1="0"
        x2="56"
        y2="110"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="84"
        y1="0"
        x2="84"
        y2="110"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <line
        x1="112"
        y1="0"
        x2="112"
        y2="110"
        stroke="#1a3a4a"
        strokeWidth="0.5"
      />
      <rect
        x="54"
        y="42"
        width="8"
        height="8"
        fill="#00f0ff"
        opacity="0.9"
        rx="1"
      />
      <rect
        x="82"
        y="64"
        width="8"
        height="8"
        fill="#ff003c"
        opacity="0.7"
        rx="1"
      />
      <rect
        x="26"
        y="64"
        width="8"
        height="8"
        fill="#ff003c"
        opacity="0.5"
        rx="1"
      />
      <circle
        cx="58"
        cy="46"
        r="12"
        fill="none"
        stroke="#00f0ff"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <text
        x="70"
        y="104"
        textAnchor="middle"
        fill="#00f0ff"
        fontSize="6"
        fontFamily="monospace"
        opacity="0.5"
      >
        GRIDRUNNER
      </text>
    </svg>
  );
}

function PhishTankThumbnail() {
  return (
    <svg
      viewBox="0 0 140 110"
      width="140"
      height="110"
      aria-hidden
      className="drop-shadow-md"
    >
      <rect x="0" y="0" width="140" height="110" fill="#0f1729" rx="4" />
      <rect x="20" y="16" width="100" height="14" fill="#1e293b" rx="3" />
      <rect x="24" y="20" width="60" height="6" fill="#334155" rx="2" />
      <circle cx="112" cy="23" r="4" fill="#22c55e" opacity="0.6" />
      <rect x="20" y="38" width="100" height="52" fill="#1e293b" rx="3" />
      <text
        x="70"
        y="56"
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="7"
        fontFamily="sans-serif"
      >
        From: support@bankk.com
      </text>
      <text
        x="70"
        y="68"
        textAnchor="middle"
        fill="#64748b"
        fontSize="5.5"
        fontFamily="sans-serif"
      >
        Your account has been locked.
      </text>
      <text
        x="70"
        y="76"
        textAnchor="middle"
        fill="#64748b"
        fontSize="5.5"
        fontFamily="sans-serif"
      >
        Click here to verify your identity.
      </text>
      <rect
        x="48"
        y="82"
        width="44"
        height="10"
        fill="#ef4444"
        opacity="0.8"
        rx="2"
      />
      <text
        x="70"
        y="89"
        textAnchor="middle"
        fill="#fff"
        fontSize="5"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        PHISH?
      </text>
    </svg>
  );
}

const GAMES: GameCard[] = [
  {
    href: "/awareness/digital-house",
    title: "The Digital House",
    description:
      "Place devices into rooms and see how trust, exposure, and recovery shift as you design your home network.",
    badge: "New",
    meta: "Game · 5 min",
    thumbnail: <HouseThumbnail />,
  },
  {
    href: "/awareness/gridrunner",
    title: "GRIDRUNNER",
    description:
      "Navigate cyberspace as a cyber operator. Battle real-world threat actors and collect security tools.",
    badge: "Demo",
    meta: "RPG · 20-25 min",
    thumbnail: <GridRunnerThumbnail />,
    demo: true,
  },
  {
    href: "/awareness",
    title: "Phish Tank",
    description:
      "Spot the phishing email before time runs out. Learn the red flags that give away social engineering attacks.",
    badge: "Coming Soon",
    meta: "Quiz · 3 min",
    thumbnail: <PhishTankThumbnail />,
    comingSoon: true,
  },
];

function TrainingCard({ card }: Readonly<{ card: GameCard }>) {
  const inner = (
    <>
      {card.demo && (
        <div className="pointer-events-none absolute right-3 top-3 z-10 rotate-6 select-none">
          <span className="inline-block rounded-sm border-[2.5px] border-danger px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-danger">
            Demo
          </span>
        </div>
      )}
      <div className={`relative ${card.comingSoon ? "opacity-50" : ""}`}>
        <div className="mb-4 flex items-end justify-center rounded-xl border border-hairline bg-surface-inset p-4">
          {card.thumbnail}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={[
              "inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
              card.comingSoon
                ? "border-hairline bg-surface-inset text-ink-dim"
                : "border-border-accent bg-surface text-accent",
            ].join(" ")}
          >
            {card.badge}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-dim">
            {card.meta}
          </span>
        </div>
        <h3 className="mt-2 text-h3 tracking-h3 font-semibold text-ink">
          {card.title}
        </h3>
        <p className="mt-1.5 text-sm text-ink-muted">{card.description}</p>
        {!card.comingSoon && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Play
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.25}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        )}
        {card.comingSoon && (
          <div className="mt-4 text-sm font-semibold text-ink-dim">
            In development
          </div>
        )}
      </div>
    </>
  );

  if (card.comingSoon) {
    return (
      <Card
        wash
        className="group relative overflow-hidden p-5 text-left cursor-default"
      >
        {inner}
      </Card>
    );
  }

  return (
    <Card
      as={Link}
      href={card.href}
      interactive
      wash
      className="group relative overflow-hidden p-5 text-left"
    >
      {inner}
    </Card>
  );
}

export function InteractiveTraining() {
  return (
    <div aria-labelledby="interactive-training">
      <div className="max-w-[42rem]">
        <h2
          id="interactive-training"
          className="text-h2 tracking-h2 font-semibold text-ink"
        >
          Interactive Training
        </h2>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Hands-on exercises that teach one core security idea at a time. Play
          at your own pace. No sign-in required.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <TrainingCard key={game.title} card={game} />
        ))}
      </div>
    </div>
  );
}
