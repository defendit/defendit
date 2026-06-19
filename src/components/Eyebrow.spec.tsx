/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

Contract tests for <Eyebrow>. Behavior and semantics only, no recipe-class or
DOM-shape assertions, no snapshots (guardrails/test-policy.md).
*/

import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its children", () => {
    expect(renderToStaticMarkup(<Eyebrow>Locally Owned</Eyebrow>)).toContain(
      "Locally Owned",
    );
  });

  it("renders a paragraph by default", () => {
    expect(renderToStaticMarkup(<Eyebrow>x</Eyebrow>).startsWith("<p")).toBe(
      true,
    );
  });

  it("renders the element named by `as`", () => {
    expect(
      renderToStaticMarkup(<Eyebrow as="span">x</Eyebrow>).startsWith("<span"),
    ).toBe(true);
  });

  it("forwards arbitrary props to the element", () => {
    expect(renderToStaticMarkup(<Eyebrow id="eyebrow-1">x</Eyebrow>)).toContain(
      'id="eyebrow-1"',
    );
  });
});
