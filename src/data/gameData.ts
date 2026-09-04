import type { Lang, Traits } from "../types.js";

/* ---------------------------------------------------------------------
   DATI DI GIOCO (Daggerheart SRD 1.0, licenza DPCGL — Darrington Press)

   Le chiavi (CLASSES, DOMAINS, SUBCLASSES, ANCESTRIES, COMMUNITIES, ecc.)
   restano in inglese: sono identificatori interni, salvati nei personaggi
   e nei preset, quindi cambiarle romperebbe dati esistenti. Le mappe
   *_LABELS forniscono solo l'etichetta da mostrare, tradotta dalle
   schede italiane ufficiali (Daggerheart © Darrington Press 2025: schede
   personaggio, schede aggiuntive, carte stampabili del set base).
--------------------------------------------------------------------- */

export interface TraitDef {
  key: keyof Traits;
  label: string;
  sub: string[];
}

const TRAITS_EN: TraitDef[] = [
  { key: "agility", label: "Agility", sub: ["Sprint", "Leap", "Maneuver"] },
  { key: "strength", label: "Strength", sub: ["Lift", "Smash", "Grapple"] },
  { key: "finesse", label: "Finesse", sub: ["Control", "Hide", "Tinker"] },
  { key: "instinct", label: "Instinct", sub: ["Perceive", "Sense", "Navigate"] },
  { key: "presence", label: "Presence", sub: ["Charm", "Perform", "Deceive"] },
  { key: "knowledge", label: "Knowledge", sub: ["Recall", "Analyze", "Comprehend"] },
];

const TRAITS_IT: TraitDef[] = [
  { key: "agility", label: "Agilità", sub: ["Scattare", "Saltare", "Destreggiarsi"] },
  { key: "strength", label: "Forza", sub: ["Sollevare", "Colpire", "Afferrare"] },
  { key: "finesse", label: "Astuzia", sub: ["Mantenere il Sangue Freddo", "Nascondersi", "Usare uno Strumento"] },
  { key: "instinct", label: "Istinto", sub: ["Percepire", "Intuire", "Orientarsi"] },
  { key: "presence", label: "Presenza", sub: ["Affascinare", "Esibirsi", "Ingannare"] },
  { key: "knowledge", label: "Conoscenza", sub: ["Ricordare", "Analizzare", "Comprendere"] },
];

export const TRAITS_BY_LANG: Record<Lang, TraitDef[]> = { it: TRAITS_IT, en: TRAITS_EN };
export const TRAIT_KEYS: (keyof Traits)[] = TRAITS_EN.map((tr) => tr.key);
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

/* Etichette da mostrare per classi e domini (le chiavi sopra restano invariate). */
export const CLASS_LABELS: Record<string, Record<Lang, string>> = {
  Bard: { it: "Bardo", en: "Bard" },
  Druid: { it: "Druido", en: "Druid" },
  Guardian: { it: "Guardiano", en: "Guardian" },
  Ranger: { it: "Ranger", en: "Ranger" },
  Rogue: { it: "Fuorilegge", en: "Rogue" },
  Seraph: { it: "Consacrato", en: "Seraph" },
  Sorcerer: { it: "Stregone", en: "Sorcerer" },
  Warrior: { it: "Guerriero", en: "Warrior" },
  Wizard: { it: "Mago", en: "Wizard" },
};
export const DOMAIN_LABELS: Record<string, Record<Lang, string>> = {
  Arcana: { it: "Arcano", en: "Arcana" },
  Blade: { it: "Lame", en: "Blade" },
  Bone: { it: "Ossa", en: "Bone" },
  Codex: { it: "Codice", en: "Codex" },
  Grace: { it: "Grazia", en: "Grace" },
  Midnight: { it: "Mezzanotte", en: "Midnight" },
  Sage: { it: "Saggezza", en: "Sage" },
  Splendor: { it: "Splendore", en: "Splendor" },
  Valor: { it: "Valore", en: "Valor" },
};
export const SUBCLASS_LABELS: Record<string, Record<Lang, string>> = {
  Troubadour: { it: "Trovatore", en: "Troubadour" },
  Wordsmith: { it: "Oratore", en: "Wordsmith" },
  "Warden of the Elements": { it: "Custode degli Elementi", en: "Warden of the Elements" },
  "Warden of Renewal": { it: "Custode del Rinnovamento", en: "Warden of Renewal" },
  Stalwart: { it: "Valoroso", en: "Stalwart" },
  Vengeance: { it: "Vendicatore", en: "Vengeance" },
  Wayfinder: { it: "Apripista", en: "Wayfinder" },
  Beastbound: { it: "Ferale", en: "Beastbound" },
  Syndicate: { it: "Ladro", en: "Syndicate" },
  Nightwalker: { it: "Ombra Notturna", en: "Nightwalker" },
  "Winged Sentinel": { it: "Sentinella Alata", en: "Winged Sentinel" },
  "Divine Wielder": { it: "Emissario Divino", en: "Divine Wielder" },
  "Primal Origin": { it: "Potere Primordiale", en: "Primal Origin" },
  "Elemental Origin": { it: "Potere Elementale", en: "Elemental Origin" },
  "Call of the Slayer": { it: "Chiamata dello Sterminatore", en: "Call of the Slayer" },
  "Call of the Brave": { it: "Chiamata del Coraggio", en: "Call of the Brave" },
  "School of Knowledge": { it: "Scuola della Conoscenza", en: "School of Knowledge" },
  "School of War": { it: "Scuola della Guerra", en: "School of War" },
};
/* Fonte: Carte_Stampabili-Daggerheart_Set-Base_ITA.pdf. Manca la carta Faun (ID 063,
   assente nell'estratto ricevuto): resta senza etichetta italiana finché non la si trova. */
export const ANCESTRY_LABELS: Record<string, Record<Lang, string>> = {
  Clank: { it: "Clank", en: "Clank" },
  Drakona: { it: "Drakona", en: "Drakona" },
  Dwarf: { it: "Nani", en: "Dwarf" },
  Elf: { it: "Elfi", en: "Elf" },
  Faerie: { it: "Fatati", en: "Faerie" },
  Firbolg: { it: "Firbolg", en: "Firbolg" },
  Fungril: { it: "Fungril", en: "Fungril" },
  Galapa: { it: "Galapa", en: "Galapa" },
  Giant: { it: "Giganti", en: "Giant" },
  Goblin: { it: "Goblin", en: "Goblin" },
  Halfling: { it: "Halfling", en: "Halfling" },
  Human: { it: "Umani", en: "Human" },
  Infernis: { it: "Infernis", en: "Infernis" },
  Katari: { it: "Katàri", en: "Katari" },
  Orc: { it: "Orchi", en: "Orc" },
  Ribbet: { it: "Ribbet", en: "Ribbet" },
  Simiah: { it: "Simiah", en: "Simiah" },
};
export const COMMUNITY_LABELS: Record<string, Record<Lang, string>> = {
  Highborne: { it: "Privilegiata", en: "Highborne" },
  Loreborne: { it: "Erudita", en: "Loreborne" },
  Orderborne: { it: "Austera", en: "Orderborne" },
  Ridgeborne: { it: "Montanara", en: "Ridgeborne" },
  Seaborne: { it: "Marittima", en: "Seaborne" },
  Skyborne: { it: "Bassifondi", en: "Skyborne" },
  Underborne: { it: "Sotterranea", en: "Underborne" },
  Wanderborne: { it: "Nomade", en: "Wanderborne" },
  Wildborne: { it: "Forestale", en: "Wildborne" },
};
export const classLabel = (key: string, lang: Lang): string => CLASS_LABELS[key]?.[lang] ?? key;
export const domainLabel = (key: string, lang: Lang): string => DOMAIN_LABELS[key]?.[lang] ?? key;
export const subclassLabel = (key: string, lang: Lang): string => SUBCLASS_LABELS[key]?.[lang] ?? key;
export const ancestryLabel = (key: string, lang: Lang): string => ANCESTRY_LABELS[key]?.[lang] ?? key;
export const communityLabel = (key: string, lang: Lang): string => COMMUNITY_LABELS[key]?.[lang] ?? key;
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
