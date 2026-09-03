export interface Identity {
  name: string;
  pronouns: string;
  ancestry: string;
  mixed: boolean;
  ancestry2: string;
  community: string;
  className: string;
  subclass: string;
  level: number;
  proficiency: number;
}

export interface Traits {
  agility: number;
  strength: number;
  finesse: number;
  instinct: number;
  presence: number;
  knowledge: number;
}

export interface Vitals {
  evasion: number;
  armorScore: number;
  hpMax: number;
  hpMarked: number;
  stressMax: number;
  stressMarked: number;
  hopeMax: number;
  hopeMarked: number;
  armorSlotsMax: number;
  armorSlotsMarked: number;
  goldHandfuls: number;
  goldBags: number;
  goldChest: number;
}

export interface Thresholds {
  baseMajor: number;
  baseSevere: number;
}

export interface Weapon {
  name: string;
  trait: string;
  range: string;
  damage: string;
  feature: string;
}

export interface Weapons {
  primary: Weapon;
  secondary: Weapon;
}

export interface ArmorItem {
  name: string;
  baseScore: number;
  baseMajor: number;
  baseSevere: number;
}

export interface Experience {
  id: string;
  name: string;
  mod: number;
}

export type DomainCardLocation = "loadout" | "vault";

export interface DomainCard {
  id: string;
  name: string;
  domain: string;
  level: number;
  recall: number;
  description: string;
  location: DomainCardLocation;
}

export interface Conditions {
  hidden: boolean;
  restrained: boolean;
  vulnerable: boolean;
}

export interface Character {
  identity: Identity;
  traits: Traits;
  vitals: Vitals;
  thresholds: Thresholds;
  conditions: Conditions;
  weapons: Weapons;
  armorItem: ArmorItem;
  inventory: string;
  classFeature: string;
  hopeFeature: string;
  ancestryFeature1: string;
  ancestryFeature2: string;
  communityFeature: string;
  experiences: Experience[];
  domainCards: DomainCard[];
}

export interface Preset {
  id: string;
  name: string;
  className: string;
  level: number;
  data: Partial<Character>;
}

export interface IndexEntry {
  id: string;
  name: string;
  className: string;
  level: number;
  updatedAt: number;
}

export type Lang = "it" | "en";

export type StorageStatus = "loading" | "new" | "saving" | "saved" | "error";

// Aggiornamento per path puntato (es. "identity.name", "weapons.primary.name"):
// tipizzarlo in modo puntuale richiederebbe mapped types ricorsivi non
// proporzionati alla dimensione dell'app — resta stringly-typed di proposito.
export type UpdateFn = (path: string, value: unknown) => void;
