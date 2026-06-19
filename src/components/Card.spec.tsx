/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

Contract tests for <Card>. They assert behavior and semantics only, never the
Tailwind recipe classes or DOM shape (forbidden by guardrails/test-policy.md:
those break on a styling refactor while the behavior is identical). No snapshots.
*/

import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    expect(renderToStaticMarkup(<Card>protected surface</Card>)).toContain(
      "protected surface",
    );
  });

  it("renders a div by default", () => {
    expect(renderToStaticMarkup(<Card>x</Card>).startsWith("<div")).toBe(true);
  });

  it("renders the element named by `as`", () => {
    expect(
      renderToStaticMarkup(<Card as="section">x</Card>).startsWith("<section"),
    ).toBe(true);
  });

  it("forwards arbitrary props to the element", () => {
    expect(
      renderToStaticMarkup(<Card aria-label="panel">x</Card>),
    ).toContain('aria-label="panel"');
  });

  it("merges a caller-supplied className", () => {
    expect(renderToStaticMarkup(<Card className="mt-4">x</Card>)).toContain(
      "mt-4",
    );
  });

  it("declares manipulation touch-action when interactive", () => {
    expect(renderToStaticMarkup(<Card interactive>x</Card>)).toContain(
      "touch-action:manipulation",
    );
  });

  it("sets no touch-action when not interactive", () => {
    expect(renderToStaticMarkup(<Card>x</Card>)).not.toContain("touch-action");
  });
});
