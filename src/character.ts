import { STANDARD_ARRAY } from "./data/gameData.js";
import type { Character, Weapon } from "./types.js";

/* ---------------------------------------------------------------------
   STATO INIZIALE
--------------------------------------------------------------------- */
let uid = 0;
export const nextId = (): string => `id${Date.now()}_${uid++}`;
export const emptyWeapon = (): Weapon => ({ name: "", trait: "", range: "", damage: "", feature: "" });

export const initialCharacter = (): Character => ({
  identity: {
    name: "",
    pronouns: "",
    ancestry: "",
    mixed: false,
    ancestry2: "",
    community: "",
    className: "",
    subclass: "",
    level: 1,
    proficiency: 1,
  },
  traits: { ...STANDARD_ARRAY },
  vitals: {
    evasion: 10,
    armorScore: 0,
    hpMax: 6,
    hpMarked: 0,
    stressMax: 6,
    stressMarked: 0,
    hopeMax: 6,
    hopeMarked: 0,
    armorSlotsMax: 0,
    armorSlotsMarked: 0,
    goldHandfuls: 0,
    goldBags: 0,
    goldChest: 0,
  },
  thresholds: { baseMajor: 0, baseSevere: 0 },
  weapons: { primary: emptyWeapon(), secondary: emptyWeapon() },
  armorItem: { name: "", baseScore: 0, baseMajor: 0, baseSevere: 0 },
  inventory: "",
  classFeature: "",
  hopeFeature: "",
  ancestryFeature1: "",
  ancestryFeature2: "",
  communityFeature: "",
  experiences: [
    { id: nextId(), name: "", mod: 2 },
    { id: nextId(), name: "", mod: 2 },
  ],
  domainCards: [],
});

export const hasMeaningfulData = (c: Character): boolean =>
  !!(c.identity.name.trim() || c.identity.className || c.identity.ancestry || c.identity.community);
