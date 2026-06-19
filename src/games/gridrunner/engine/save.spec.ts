/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.
*/

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadSaveSummary } from "./save";

const SAVE_KEY = "dis-gridrunner-save";

type LocalStorageStub = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  key: (i: number) => string | null;
  length: number;
};

function createLocalStorageStub(): LocalStorageStub {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
    key: (i) => Array.from(store.keys())[i] ?? null,
  };
}

const MOCK_SAVE = {
  version: 1,
  playerName: "TESTOP",
  player: {
    level: 7,
    xp: 120,
    xpToNext: 400,
    integrity: 170,
    maxIntegrity: 170,
    compute: 108,
    maxCompute: 108,
    bandwidth: 16,
    firewall: 11,
  },
  inventory: [],
  equippedTools: [null, null, null, null],
  currentZone: "bank",
  currentPosition: { x: 5, y: 3 },
  defeatedBosses: [],
  completedTutorial: true,
  bits: 42,
  credits: 0,
  playTime: 600,
  savedAt: "2026-04-16T12:00:00.000Z",
};

describe("loadSaveSummary", () => {
  const originalLocalStorage = Object.getOwnPropertyDescriptor(
    globalThis,
    "localStorage",
  );
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");

  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      writable: true,
      value: createLocalStorageStub(),
    });
    // save.ts gates reads behind `typeof window !== "undefined"` for SSR
    // safety, so a window must exist for the localStorage path to run.
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      writable: true,
      value: globalThis,
    });
  });

  afterEach(() => {
    if (originalLocalStorage) {
      Object.defineProperty(globalThis, "localStorage", originalLocalStorage);
    } else {
      Reflect.deleteProperty(globalThis, "localStorage");
    }
    if (originalWindow) {
      Object.defineProperty(globalThis, "window", originalWindow);
    } else {
      Reflect.deleteProperty(globalThis, "window");
    }
  });

  it("returns null when no save exists", () => {
    expect(loadSaveSummary()).toBeNull();
  });

  it("returns summary with correct fields from stored save", () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(MOCK_SAVE));
    const summary = loadSaveSummary();
    expect(summary).not.toBeNull();
    expect(summary!.playerName).toBe("TESTOP");
    expect(summary!.level).toBe(7);
    expect(summary!.zone).toBe("bank");
    expect(summary!.playTime).toBe(600);
    expect(summary!.savedAt).toBe("2026-04-16T12:00:00.000Z");
  });

  it("returns null when save has wrong version", () => {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({ ...MOCK_SAVE, version: 999 }),
    );
    expect(loadSaveSummary()).toBeNull();
  });

  it("returns null when save data is corrupted", () => {
    localStorage.setItem(SAVE_KEY, "not-json");
    expect(loadSaveSummary()).toBeNull();
  });
});
