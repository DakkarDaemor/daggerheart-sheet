import { describe, expect, it } from "vitest";
import { emptyWeapon, hasMeaningfulData, initialCharacter, nextId } from "./character.js";

describe("nextId", () => {
  it("generates unique ids across calls", () => {
    const ids = new Set(Array.from({ length: 50 }, () => nextId()));
    expect(ids.size).toBe(50);
  });
});

describe("emptyWeapon", () => {
  it("returns a weapon with all fields blank", () => {
    expect(emptyWeapon()).toEqual({ name: "", trait: "", range: "", damage: "", feature: "" });
  });
});

describe("initialCharacter", () => {
  it("starts with a blank identity and two empty experience slots", () => {
    const c = initialCharacter();
    expect(c.identity.name).toBe("");
    expect(c.identity.level).toBe(1);
    expect(c.experiences).toHaveLength(2);
    expect(c.domainCards).toHaveLength(0);
  });

  it("returns a fresh object on every call (no shared mutable state)", () => {
    const a = initialCharacter();
    const b = initialCharacter();
    a.identity.name = "Mutated";
    expect(b.identity.name).toBe("");
  });
});

describe("hasMeaningfulData", () => {
  it("is false for a blank character", () => {
    expect(hasMeaningfulData(initialCharacter())).toBe(false);
  });

  it("is true as soon as a name is entered", () => {
    const c = initialCharacter();
    c.identity.name = "Khari Nix";
    expect(hasMeaningfulData(c)).toBe(true);
  });

  it("is true when only class/ancestry/community is set, name still blank", () => {
    const c = initialCharacter();
    c.identity.className = "Guardian";
    expect(hasMeaningfulData(c)).toBe(true);
  });

  it("ignores a name that is only whitespace", () => {
    const c = initialCharacter();
    c.identity.name = "   ";
    expect(hasMeaningfulData(c)).toBe(false);
  });
});
