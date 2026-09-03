import { describe, expect, it, vi } from "vitest";
import {
  InvalidCharacterFileError,
  characterFileName,
  characterToJson,
  downloadJson,
  parseCharacterFile,
} from "./importExport.js";
import { initialCharacter } from "./character.js";

describe("characterToJson", () => {
  it("round-trips a character through JSON.parse", () => {
    const char = initialCharacter();
    char.identity.name = "Khari Nix";
    expect(JSON.parse(characterToJson(char))).toEqual(char);
  });
});

describe("characterFileName", () => {
  it("slugifies the character name", () => {
    const char = initialCharacter();
    char.identity.name = "Khari Nix";
    expect(characterFileName(char)).toBe("daggerheart-khari-nix.json");
  });

  it("strips accents so the filename stays plain ASCII", () => {
    const char = initialCharacter();
    char.identity.name = "Renée d'Été";
    expect(characterFileName(char)).toBe("daggerheart-renee-d-ete.json");
  });

  it("falls back to a generic name when the character has none", () => {
    const char = initialCharacter();
    expect(characterFileName(char)).toBe("daggerheart-senza-nome.json");
  });
});

describe("downloadJson", () => {
  it("creates an object URL, clicks a download link, and revokes the URL", () => {
    const createObjectURL = vi.fn(() => "blob:mock-url");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL, revokeObjectURL });
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    downloadJson("test.json", "{}");

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");

    clickSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});

describe("parseCharacterFile", () => {
  it("returns the parsed data for a plausible character file", () => {
    const char = initialCharacter();
    char.identity.name = "Barnacle";
    expect(parseCharacterFile(characterToJson(char))).toEqual(char);
  });

  it("rejects text that isn't JSON", () => {
    expect(() => parseCharacterFile("not json")).toThrow(InvalidCharacterFileError);
  });

  it("rejects JSON that doesn't look like a character (no identity object)", () => {
    expect(() => parseCharacterFile(JSON.stringify({ foo: "bar" }))).toThrow(InvalidCharacterFileError);
  });

  it("rejects a JSON array", () => {
    expect(() => parseCharacterFile("[1, 2, 3]")).toThrow(InvalidCharacterFileError);
  });
});
