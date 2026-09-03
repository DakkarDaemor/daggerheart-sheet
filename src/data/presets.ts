import type { Preset } from "../types.js";

/* ---------------------------------------------------------------------
   PERSONAGGI PRECOMPILATI
   Aggiungi qui i personaggi da offrire come base pronta all'uso.
   "data" può contenere anche solo alcuni campi: viene unito allo
   scheletro vuoto (initialCharacter), quindi puoi restare parziale.
   Esempio:
   { id: "preset-thorne", name: "Thorne", className: "Guardian", level: 3,
     data: { identity: { name: "Thorne", className: "Guardian", ... }, ... } }
--------------------------------------------------------------------- */
export const PRESETS: Preset[] = [
  {
    id: "preset-khari-nix",
    name: "Khari Nix",
    className: "Guardian",
    level: 1,
    data: {
      identity: {
        name: "Khari Nix",
        pronouns: "She/Her",
        ancestry: "Giant",
        mixed: false,
        ancestry2: "",
        community: "Ridgeborne",
        className: "Guardian",
        subclass: "Stalwart",
        level: 1,
        proficiency: 1,
      },
      traits: { agility: 0, strength: 2, finesse: -1, instinct: 1, presence: 0, knowledge: 1 },
      vitals: {
        evasion: 8,
        armorScore: 4,
        hpMax: 7,
        hpMarked: 0,
        stressMax: 6,
        stressMarked: 0,
        hopeMax: 6,
        hopeMarked: 2,
        armorSlotsMax: 4,
        armorSlotsMarked: 0,
        goldHandfuls: 1,
        goldBags: 0,
        goldChest: 0,
      },
      thresholds: { baseMajor: 8, baseSevere: 16 },
      weapons: {
        primary: { name: "Battleaxe", trait: "Strength", range: "Very Close", damage: "1d10+3 phy", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Chainmail Armor", baseScore: 4, baseMajor: 7, baseSevere: 15 },
      inventory: "Minor Health Potion (cura 1d4 PF)",
      classFeature:
        "Guardian – Unstoppable: una volta per riposo lungo diventi Instancabile (Dado d4 che sale a ogni danno inflitto; finché è attivo riduci la gravità del danno fisico subito di una soglia, aggiungi il dado al danno, non puoi essere Restrained/Vulnerable).\nStalwart (sottoclasse) – Unwavering: +1 permanente alle soglie di danno (già incluso sopra). Iron Will: quando subisci danno fisico puoi segnare uno Slot Armatura extra per ridurne la gravità.",
      hopeFeature: "Frontline Tank: spendi 3 Speranza per rimuovere 2 Slot Armatura.",
      ancestryFeature1:
        "Giant – Endurance: uno slot PF in più alla creazione (già incluso). Reach: le tue armi/abilità Melee valgono come Very Close.",
      ancestryFeature2: "",
      communityFeature:
        "Ridgeborne – Steady: vantaggio su prove per muoverti su terreni impervi, orientarti in ambienti ostili e sopravvivenza.",
      experiences: [
        { id: "khari-e1", name: "I've Got Your Back", mod: 2 },
        { id: "khari-e2", name: "Not Afraid of Anything", mod: 2 },
      ],
      domainCards: [
        {
          id: "khari-c1",
          name: "Whirlwind",
          domain: "Blade",
          level: 1,
          recall: 0,
          description:
            "Attacco riuscito in Very Close: spendi Speranza per colpire anche gli altri bersagli in Very Close (danno dimezzato su questi).",
          location: "loadout",
        },
        {
          id: "khari-c2",
          name: "I Am Your Shield",
          domain: "Valor",
          level: 1,
          recall: 1,
          description:
            "Se un alleato in Very Close subirebbe danno, segna Stress per diventare tu il bersaglio; puoi segnare Slot Armatura per il danno ricevuto.",
          location: "loadout",
        },
      ],
    },
  },
  {
    id: "preset-varian-soto",
    name: "Varian Soto",
    className: "Ranger",
    level: 1,
    data: {
      identity: {
        name: "Varian Soto",
        pronouns: "They/Them",
        ancestry: "Katari",
        mixed: false,
        ancestry2: "",
        community: "Wildborne",
        className: "Ranger",
        subclass: "Wayfinder",
        level: 1,
        proficiency: 1,
      },
      traits: { agility: 2, strength: 0, finesse: 1, instinct: 1, presence: -1, knowledge: 0 },
      vitals: {
        evasion: 13,
        armorScore: 3,
        hpMax: 6,
        hpMarked: 0,
        stressMax: 6,
        stressMarked: 0,
        hopeMax: 6,
        hopeMarked: 2,
        armorSlotsMax: 3,
        armorSlotsMarked: 0,
        goldHandfuls: 1,
        goldBags: 0,
        goldChest: 0,
      },
      thresholds: { baseMajor: 6, baseSevere: 13 },
      weapons: {
        primary: { name: "Shortbow", trait: "Agility", range: "Far", damage: "1d6+3 phy", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Leather Armor", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Minor Stamina Potion (elimina 1d4 Stress)",
      classFeature:
        "Ranger – Ranger's Focus: spendi Speranza e attacca un bersaglio; se colpisci diventa il tuo Focus (sai dove si trova, gli infliggi Stress quando lo danneggi, puoi terminare il Focus per ritirare i Dadi Duality su un attacco fallito).\nWayfinder (sottoclasse) – Spellcast: Agility. Ruthless Predator: sui danni segna Stress per +1 Competenza; il danno Severe forza uno Stress al bersaglio. Path Forward: su un luogo già visitato o con un oggetto legato ad esso, conosci il percorso più diretto.",
      hopeFeature:
        "Hold Them Off: spendi 3 Speranza quando colpisci con un'arma per usare lo stesso tiro anche contro due avversari aggiuntivi a portata.",
      ancestryFeature1:
        "Katari – Feline Instincts: spendi 2 Speranza per ritirare il Dado Speranza su una prova di Agilità. Retracting Claws: prova di Agilità in Melee per graffiare, successo = bersaglio Vulnerable.",
      ancestryFeature2: "",
      communityFeature:
        "Wildborne – Lightfoot: movimento silenzioso, vantaggio su prove per muoverti senza farti sentire.",
      experiences: [
        { id: "varian-e1", name: "Deadly Aim", mod: 2 },
        { id: "varian-e2", name: "Nature's Friend", mod: 2 },
      ],
      domainCards: [
        {
          id: "varian-c1",
          name: "Untouchable",
          domain: "Bone",
          level: 1,
          recall: 0,
          description: "Bonus alla Schivata pari alla metà della tua Agilità.",
          location: "loadout",
        },
        {
          id: "varian-c2",
          name: "Vicious Entangle",
          domain: "Sage",
          level: 1,
          recall: 1,
          description:
            "Prova di Lancio Incantesimi (Instinct) a portata Far: successo = 1d8+1 danno fisico e Restrain al bersaglio; spendi Speranza per Restrain anche un secondo avversario vicino.",
          location: "loadout",
        },
      ],
    },
  },
  {
    id: "preset-barnacle",
    name: "Barnacle",
    className: "Rogue",
    level: 1,
    data: {
      identity: {
        name: "Barnacle",
        pronouns: "He/Him",
        ancestry: "Ribbet",
        mixed: false,
        ancestry2: "",
        community: "Underborne",
        className: "Rogue",
        subclass: "Nightwalker",
        level: 1,
        proficiency: 1,
      },
      traits: { agility: 1, strength: -1, finesse: 2, instinct: 0, presence: 1, knowledge: 0 },
      vitals: {
        evasion: 13,
        armorScore: 3,
        hpMax: 6,
        hpMarked: 0,
        stressMax: 6,
        stressMarked: 0,
        hopeMax: 6,
        hopeMarked: 2,
        armorSlotsMax: 3,
        armorSlotsMarked: 0,
        goldHandfuls: 1,
        goldBags: 0,
        goldChest: 0,
      },
      thresholds: { baseMajor: 5, baseSevere: 11 },
      weapons: {
        primary: { name: "Dagger", trait: "Finesse", range: "Melee", damage: "1d8+1 phy", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Gambeson Armor", baseScore: 3, baseMajor: 5, baseSevere: 11 },
      inventory: "Minor Stamina Potion (elimina 1d4 Stress)",
      classFeature:
        "Rogue – Cloaked: al posto di Nascosto sei Cloaked (resti invisibile anche se un nemico si sposterebbe per vederti, finché stai fermo; svanisce dopo un attacco o un movimento a vista). Sneak Attack: attacco riuscito da Cloaked o con un alleato in Melee sul bersaglio = aggiungi un numero di d6 pari al tuo Tier al danno (Tier 1 a livello 1).\nNightwalker (sottoclasse) – Spellcast: Finesse. Shadow Stepper: da un'ombra segna Stress per teletrasportarti in un'altra ombra entro Far range, riapparendo Cloaked.",
      hopeFeature:
        "Rogue's Dodge: spendi 3 Speranza per +2 alla Schivata fino al prossimo attacco subito con successo (altrimenti dura fino al prossimo riposo).",
      ancestryFeature1:
        "Ribbet – Amphibious: respiri e ti muovi normalmente sott'acqua. Long Tongue: segna Stress per usare la lingua come arma Finesse Close (d12 danno fisico × Competenza).",
      ancestryFeature2: "",
      communityFeature:
        "Underborne – Low-Light Living: vantaggio su prove per nasconderti, investigare o percepire dettagli in zone poco illuminate o in ombra.",
      experiences: [
        { id: "barnacle-e1", name: "They Don't See Me Coming!", mod: 2 },
        { id: "barnacle-e2", name: "Strike a Deal", mod: 2 },
      ],
      domainCards: [
        {
          id: "barnacle-c1",
          name: "Pick and Pull",
          domain: "Midnight",
          level: 1,
          recall: 0,
          description:
            "Vantaggio su prove per scassinare serrature non magiche, disinnescare trappole non magiche o rubare oggetti (con furtività o forza).",
          location: "loadout",
        },
        {
          id: "barnacle-c2",
          name: "Inspirational Words",
          domain: "Grace",
          level: 1,
          recall: 1,
          description:
            "Dopo un riposo lungo ottieni gettoni pari alla tua Presenza. Parlando con un alleato puoi spenderne uno per fargli eliminare uno Stress, curare un PF, o guadagnare Speranza.",
          location: "loadout",
        },
      ],
    },
  },
  {
    id: "preset-marlowe-fairwind",
    name: "Marlowe Fairwind",
    className: "Sorcerer",
    level: 1,
    data: {
      identity: {
        name: "Marlowe Fairwind",
        pronouns: "She/Her",
        ancestry: "Elf",
        mixed: false,
        ancestry2: "",
        community: "Loreborne",
        className: "Sorcerer",
        subclass: "Primal Origin",
        level: 1,
        proficiency: 1,
      },
      traits: { agility: 0, strength: -1, finesse: 1, instinct: 2, presence: 1, knowledge: 0 },
      vitals: {
        evasion: 10,
        armorScore: 3,
        hpMax: 6,
        hpMarked: 0,
        stressMax: 6,
        stressMarked: 0,
        hopeMax: 6,
        hopeMarked: 2,
        armorSlotsMax: 3,
        armorSlotsMarked: 0,
        goldHandfuls: 1,
        goldBags: 0,
        goldChest: 0,
      },
      thresholds: { baseMajor: 6, baseSevere: 13 },
      weapons: {
        primary: { name: "Dualstaff", trait: "Instinct", range: "Far", damage: "1d6+3 mag", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Leather Armor", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Minor Stamina Potion (elimina 1d4 Stress)",
      classFeature:
        "Sorcerer – Arcane Sense: percepisci presenze/oggetti magici in Close range. Minor Illusion: Prova di Lancio Incantesimi (10) per creare un'illusione visiva minore in Close range. Channel Raw Power: una volta per riposo lungo, manda in Vault una carta dominio dal loadout per ottenere Speranza pari al suo livello, oppure potenziare un incantesimo di danno (+2×livello carta).\nPrimal Origin (sottoclasse) – Spellcast: Instinct. Manipulate Magic: dopo un incantesimo/attacco magico segna Stress per: estendere la gittata di un range, +2 al tiro, raddoppiare un dado danno, o colpire un bersaglio aggiuntivo.",
      hopeFeature:
        "Volatile Magic: spendi 3 Speranza per ritirare un numero qualsiasi di dadi danno su un attacco che infligge danno magico.",
      ancestryFeature1:
        "Elf – Quick Reactions: segna Stress per vantaggio su un tiro di reazione. Celestial Trance: durante un riposo, entra in trance per scegliere una mossa di riposo aggiuntiva.",
      ancestryFeature2: "",
      communityFeature:
        "Loreborne – Well-Read: vantaggio su prove riguardanti storia, cultura o politica di persone o luoghi rilevanti.",
      experiences: [
        { id: "marlowe-e1", name: "Royal Mage", mod: 2 },
        { id: "marlowe-e2", name: "Not On My Watch", mod: 2 },
      ],
      domainCards: [
        {
          id: "marlowe-c1",
          name: "Unleash Chaos",
          domain: "Arcana",
          level: 1,
          recall: 1,
          description:
            "A inizio sessione ottieni gettoni pari al tuo tratto di Lancio Incantesimi. Prova di Lancio Incantesimi a portata Far: spendi gettoni per tirare altrettanti d10 di danno magico; segna Stress per ricaricare un gettone.",
          location: "loadout",
        },
        {
          id: "marlowe-c2",
          name: "Rain of Blades",
          domain: "Midnight",
          level: 1,
          recall: 1,
          description:
            "Spendi Speranza per una Prova di Lancio Incantesimi: lame volanti colpiscono tutti i bersagli in Very Close (1d8+2 danno magico × Competenza, +1d8 extra su bersagli Vulnerable).",
          location: "loadout",
        },
      ],
    },
  },
  {
    id: "preset-garrick-reed",
    name: "Garrick Reed",
    className: "Warrior",
    level: 1,
    data: {
      identity: {
        name: "Garrick Reed",
        pronouns: "He/Him",
        ancestry: "Human",
        mixed: false,
        ancestry2: "",
        community: "Highborne",
        className: "Warrior",
        subclass: "Call of the Brave",
        level: 1,
        proficiency: 1,
      },
      traits: { agility: 2, strength: 1, finesse: 1, instinct: 0, presence: -1, knowledge: 0 },
      vitals: {
        evasion: 11,
        armorScore: 3,
        hpMax: 6,
        hpMarked: 0,
        stressMax: 7,
        stressMarked: 0,
        hopeMax: 6,
        hopeMarked: 2,
        armorSlotsMax: 3,
        armorSlotsMarked: 0,
        goldHandfuls: 1,
        goldBags: 0,
        goldChest: 0,
      },
      thresholds: { baseMajor: 6, baseSevere: 13 },
      weapons: {
        primary: { name: "Longsword", trait: "Agility", range: "Melee", damage: "1d8+3 phy", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Leather Armor", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Minor Health Potion (cura 1d4 PF)",
      classFeature:
        "Warrior – Attack of Opportunity: se un nemico in Melee tenta di allontanarsi, tiro di reazione con un tratto a scelta contro la sua Difficoltà; successo = uno tra bloccarlo/danno pari all'arma primaria/seguirlo (2 effetti su critico). Combat Training: ignori l'ingombro delle armi; il danno fisico ottiene un bonus pari al livello.\nCall of the Brave (sottoclasse) – Courage: se fallisci un tiro con Fear, guadagni Speranza. Battle Ritual: una volta per riposo lungo, prima di un pericolo enorme, elimina 2 Stress e guadagna 2 Speranza descrivendo un rituale o una preparazione.",
      hopeFeature: "No Mercy: spendi 3 Speranza per +1 ai tiri d'attacco fino al prossimo riposo.",
      ancestryFeature1:
        "Human – High Stamina: uno slot Stress in più alla creazione (già incluso). Adaptability: se fallisci un tiro che usava un'Esperienza, segna Stress per ritirare.",
      ancestryFeature2: "",
      communityFeature:
        "Highborne – Privilege: vantaggio su prove per trattare con nobili, negoziare prezzi o sfruttare la tua reputazione.",
      experiences: [
        { id: "garrick-e1", name: "Affable", mod: 2 },
        { id: "garrick-e2", name: "Hit Them Hard", mod: 2 },
      ],
      domainCards: [
        {
          id: "garrick-c1",
          name: "Not Good Enough",
          domain: "Blade",
          level: 1,
          recall: 1,
          description: "Sui dadi danno puoi ritirare qualsiasi 1 o 2.",
          location: "loadout",
        },
        {
          id: "garrick-c2",
          name: "I See It Coming",
          domain: "Bone",
          level: 1,
          recall: 1,
          description:
            "Se sei bersaglio di un attacco da oltre Melee, segna Stress per tirare un d4 e aggiungerlo alla tua Schivata contro quell'attacco.",
          location: "loadout",
        },
      ],
    },
  },
];
