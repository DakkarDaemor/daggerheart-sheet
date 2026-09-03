import type { Character } from "./types.js";

/* ---------------------------------------------------------------------
   EXPORT / IMPORT — file JSON per portare un personaggio da un
   dispositivo/browser all'altro (localStorage non è sincronizzato).
--------------------------------------------------------------------- */
export const characterToJson = (char: Character): string => JSON.stringify(char, null, 2);

// Segni diacritici combinanti (blocco Unicode U+0300-U+036F), da togliere
// dopo normalize("NFD") per ottenere uno slug ASCII (es. "è" -> "e").
const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

export const characterFileName = (char: Character): string => {
  const slug =
    char.identity.name
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(DIACRITICS, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "senza-nome";
  return `daggerheart-${slug}.json`;
};

export function downloadJson(filename: string, json: string): void {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export class InvalidCharacterFileError extends Error {}

// Validazione leggera e di proposito: basta accertarsi che "sembri" un
// personaggio (oggetto con identity.*) per evitare di caricare un JSON a
// caso; initialCharacter() colma già eventuali campi mancanti o aggiunti
// in versioni future, come per il caricamento di personaggi/preset salvati.
export function parseCharacterFile(text: string): Partial<Character> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new InvalidCharacterFileError("Il file non è un JSON valido.");
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as Record<string, unknown>).identity !== "object"
  ) {
    throw new InvalidCharacterFileError("Il file non contiene una scheda personaggio riconoscibile.");
  }
  return parsed as Partial<Character>;
}
