import type { Traits } from "../types.js";

/* ---------------------------------------------------------------------
   DATI DI GIOCO (Daggerheart SRD 1.0, licenza DPCGL — Darrington Press)
   Nomi di classi / domini / ancestrie / comunità lasciati in inglese:
   non esiste una localizzazione italiana ufficiale del gioco.
--------------------------------------------------------------------- */

export interface TraitDef {
  key: keyof Traits;
  label: string;
  sub: string[];
}

export const TRAITS: TraitDef[] = [
  { key: "agility", label: "Agility", sub: ["Sprint", "Leap", "Maneuver"] },
  { key: "strength", label: "Strength", sub: ["Lift", "Smash", "Grapple"] },
  { key: "finesse", label: "Finesse", sub: ["Control", "Hide", "Tinker"] },
  { key: "instinct", label: "Instinct", sub: ["Perceive", "Sense", "Navigate"] },
  { key: "presence", label: "Presence", sub: ["Charm", "Perform", "Deceive"] },
  { key: "knowledge", label: "Knowledge", sub: ["Recall", "Analyze", "Comprehend"] },
];
export const STANDARD_ARRAY: Traits = { agility: 0, strength: 0, finesse: 0, instinct: 0, presence: 0, knowledge: 0 };
export const STANDARD_ARRAY_VALUES = [2, 1, 1, 0, 0, -1];

export const CLASS_DOMAINS: Record<string, string[]> = {
  Bard: ["Grace", "Codex"],
  Druid: ["Sage", "Arcana"],
  Guardian: ["Valor", "Blade"],
  Ranger: ["Bone", "Sage"],
  Rogue: ["Midnight", "Grace"],
  Seraph: ["Splendor", "Valor"],
  Sorcerer: ["Arcana", "Midnight"],
  Warrior: ["Blade", "Bone"],
  Wizard: ["Codex", "Splendor"],
};
export const SUBCLASSES: Record<string, string[]> = {
  Bard: ["Troubadour", "Wordsmith"],
  Druid: ["Warden of the Elements", "Warden of Renewal"],
  Guardian: ["Stalwart", "Vengeance"],
  Ranger: ["Wayfinder", "Beastbound"],
  Rogue: ["Syndicate", "Nightwalker"],
  Seraph: ["Winged Sentinel", "Divine Wielder"],
  Sorcerer: ["Primal Origin", "Elemental Origin"],
  Warrior: ["Call of the Slayer", "Call of the Brave"],
  Wizard: ["School of Knowledge", "School of War"],
};
export const CLASSES = Object.keys(CLASS_DOMAINS);
export const DOMAINS = ["Arcana", "Blade", "Bone", "Codex", "Grace", "Midnight", "Sage", "Splendor", "Valor"];
export const ANCESTRIES = [
  "Clank",
  "Drakona",
  "Dwarf",
  "Elf",
  "Faerie",
  "Faun",
  "Firbolg",
  "Fungril",
  "Galapa",
  "Giant",
  "Goblin",
  "Halfling",
  "Human",
  "Infernis",
  "Katari",
  "Orc",
  "Ribbet",
  "Simiah",
];
export const COMMUNITIES = [
  "Highborne",
  "Loreborne",
  "Orderborne",
  "Ridgeborne",
  "Seaborne",
  "Skyborne",
  "Underborne",
  "Wanderborne",
  "Wildborne",
];
