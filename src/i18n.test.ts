import { describe, expect, it } from "vitest";
import { STR } from "./i18n.js";

describe("STR", () => {
  it("has the exact same set of keys in it and en", () => {
    const itKeys = Object.keys(STR.it).sort();
    const enKeys = Object.keys(STR.en).sort();
    expect(enKeys).toEqual(itKeys);
  });

  it("has no empty translation strings in either language", () => {
    for (const lang of ["it", "en"] as const) {
      for (const [key, value] of Object.entries(STR[lang])) {
        expect(value.trim(), `${lang}.${key} is empty`).not.toBe("");
      }
    }
  });
});
