import { beforeEach, describe, expect, it } from "vitest";
import { charKey, deepClone, storageDelete, storageGet, storageSet } from "./storage.js";

beforeEach(() => {
  localStorage.clear();
});

describe("charKey", () => {
  it("namespaces a character id into a storage key", () => {
    expect(charKey("abc123")).toBe("daggerheart:char:abc123");
  });
});

describe("storageGet / storageSet / storageDelete", () => {
  it("returns null for a missing key", () => {
    expect(storageGet("nope")).toBeNull();
  });

  it("round-trips a value through set and get", () => {
    storageSet("k", "v");
    expect(storageGet("k")).toEqual({ key: "k", value: "v" });
  });

  it("removes a key on delete", () => {
    storageSet("k", "v");
    storageDelete("k");
    expect(storageGet("k")).toBeNull();
  });
});

describe("deepClone", () => {
  it("produces an independent copy (mutating the clone leaves the source untouched)", () => {
    const source = { a: 1, nested: { b: 2 } };
    const clone = deepClone(source);
    clone.nested.b = 99;
    expect(source.nested.b).toBe(2);
    expect(clone).toEqual({ a: 1, nested: { b: 99 } });
  });
});
