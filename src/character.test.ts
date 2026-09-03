import { describe, expect, it } from "vitest";
import { emptyWeapon, hasMeaningfulData, initialCharacter, nextId, normalizeCharacter } from "./character.js";

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

describe("normalizeCharacter", () => {
  it("fills in conditions when loading data saved before that field existed", () => {
    const legacyData = { identity: { name: "Old Save" } };
    // @ts-expect-error legacy data predates several Identity fields added since
    const normalized = normalizeCharacter(legacyData);
    expect(normalized.conditions).toEqual({ hidden: false, restrained: false, vulnerable: false });
  });

  it("preserves conditions that are already present", () => {
    const data = { conditions: { hidden: true, restrained: false, vulnerable: true } };
    expect(normalizeCharacter(data).conditions).toEqual({ hidden: true, restrained: false, vulnerable: true });
  });

  it("defaults a domain card's location to loadout when loading data saved before that field existed", () => {
    const legacyCard = { id: "c1", name: "Old Card", domain: "Blade", level: 1, recall: 0, description: "" };
    // @ts-expect-error legacy data predates the `location` field
    const normalized = normalizeCharacter({ domainCards: [legacyCard] });
    expect(normalized.domainCards[0]!.location).toBe("loadout");
  });

  it("preserves an existing domain card location", () => {
    const card = {
      id: "c1",
      name: "Card",
      domain: "Blade",
      level: 1,
      recall: 0,
      description: "",
      location: "vault" as const,
    };
    const normalized = normalizeCharacter({ domainCards: [card] });
    expect(normalized.domainCards[0]!.location).toBe("vault");
  });

  it("falls back to the blank skeleton when given no data", () => {
    // Not a strict equality with initialCharacter(): nextId() is a global
    // counter, so the two calls mint different experience ids by design
    // (see the "generates unique ids" test above).
    const normalized = normalizeCharacter({});
    expect(normalized.identity).toEqual(initialCharacter().identity);
    expect(normalized.conditions).toEqual({ hidden: false, restrained: false, vulnerable: false });
    expect(normalized.domainCards).toEqual([]);
    expect(normalized.experiences).toHaveLength(2);
  });
});
