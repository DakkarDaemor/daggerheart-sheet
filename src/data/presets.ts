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
        primary: { name: "Ascia da Battaglia", trait: "Forza", range: "Prossima", damage: "1d10+3 fis", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Cotta di Maglia", baseScore: 4, baseMajor: 7, baseSevere: 15 },
      inventory: "Pozione di Guarigione Minore (cura 1d4 PF)",
      classFeature:
        "Guardiano – Instancabile: una volta per riposo lungo diventi Instancabile (Dado d4 che sale a ogni danno inflitto; finché è attivo riduci la gravità del danno fisico subito di una soglia, aggiungi il dado al danno, non puoi essere Trattenuto/Vulnerabile).\nValoroso (sottoclasse) – Saldo: +1 permanente alle soglie di danno (già incluso sopra). Volontà di Ferro: quando subisci danno fisico puoi marcare una Casella Armatura extra per ridurne la gravità.",
      hopeFeature: "Frontline Tank: spendi 3 Speranza per rimuovere 2 Caselle Armatura.",
      ancestryFeature1:
        "Giganti – Resistenza: uno slot PF in più alla creazione (già incluso). Raggiungere: le tue armi/abilità Mischia valgono come Prossima.",
      ancestryFeature2: "",
      communityFeature:
        "Montanara – Costanza: vantaggio su prove per muoverti su terreni impervi, orientarti in ambienti ostili e sopravvivenza.",
      experiences: [
        { id: "khari-e1", name: "I've Got Your Back", mod: 2 },
        { id: "khari-e2", name: "Not Afraid of Anything", mod: 2 },
      ],
      domainCards: [
        {
          id: "khari-c1",
          name: "Turbine",
          domain: "Blade",
          level: 1,
          recall: 0,
          description:
            "Attacco Prossima, successo: spendi Speranza per attaccare con lo stesso risultato tutti gli altri bersagli Prossimi (i bersagli aggiuntivi subiscono metà danni).",
          location: "loadout",
        },
        {
          id: "khari-c2",
          name: "Sono il Tuo Scudo",
          domain: "Valor",
          level: 1,
          recall: 1,
          description:
            "Se un alleato Prossimo sta per subire danno, marca Stress per intercettare l'attacco; puoi marcare Caselle Armatura per il danno ricevuto.",
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
        primary: { name: "Arco Corto", trait: "Agilità", range: "Lontana", damage: "1d6+3 fis", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Corazza di Cuoio", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Pozione di Recupero Minore (elimina 1d4 Stress)",
      classFeature:
        "Ranger – Focus del Ranger: spendi Speranza e attacca un bersaglio; se colpisci diventa il tuo Focus (sai dove si trova, gli infliggi Stress quando lo danneggi, puoi terminare il Focus per ritirare i Dadi Dualità su un attacco fallito).\nApripista (sottoclasse) – Tratto da Incantatore: Agilità. Predatore Spietato: sui danni marca Stress per +1 Competenza; il danno Grave forza uno Stress al bersaglio. La Via Prosegue: su un luogo già visitato o con un oggetto legato ad esso, conosci il percorso più diretto.",
      hopeFeature:
        "Hold Them Off: spendi 3 Speranza quando colpisci con un'arma per usare lo stesso tiro anche contro due avversari aggiuntivi a portata.",
      ancestryFeature1:
        "Katàri – Istinti Felini: spendi 2 Speranza per ritirare il Dado Speranza su un Tiro Agilità. Artigli Retrattili: Tiro Agilità in Mischia per graffiare, successo = bersaglio Vulnerabile temporaneo.",
      ancestryFeature2: "",
      communityFeature:
        "Forestale – Piè Leggero: movimento silenzioso, vantaggio su prove per muoverti senza farti sentire.",
      experiences: [
        { id: "varian-e1", name: "Deadly Aim", mod: 2 },
        { id: "varian-e2", name: "Nature's Friend", mod: 2 },
      ],
      domainCards: [
        {
          id: "varian-c1",
          name: "Intoccabile",
          domain: "Bone",
          level: 1,
          recall: 0,
          description: "Bonus Evasione pari alla metà della tua Agilità.",
          location: "loadout",
        },
        {
          id: "varian-c2",
          name: "Rovi Maligni",
          domain: "Sage",
          level: 1,
          recall: 1,
          description:
            "Tiro Incantesimo (Istinto) a portata Lontana, successo: 1d8+1 danno fisico e Trattenuto al bersaglio; spendi Speranza per Trattenere anche un secondo avversario Prossimo al primo.",
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
        primary: { name: "Pugnale", trait: "Astuzia", range: "Mischia", damage: "1d8+1 fis", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Gambesone", baseScore: 3, baseMajor: 5, baseSevere: 11 },
      inventory: "Pozione di Recupero Minore (elimina 1d4 Stress)",
      classFeature:
        "Fuorilegge – Ammantato: al posto di Nascosto sei Ammantato (resti invisibile anche se un nemico si sposterebbe per vederti, finché stai fermo; svanisce dopo un attacco o un movimento a vista). Attacco Furtivo: attacco riuscito da Ammantato o con un alleato in Mischia sul bersaglio = aggiungi un numero di d6 pari al tuo Rango al danno (Rango 1 a livello 1).\nOmbra Notturna (sottoclasse) – Tratto da Incantatore: Astuzia. Passo d'Ombra: da un'ombra marca Stress per teletrasportarti in un'altra ombra entro Lontana, riapparendo Ammantato.",
      hopeFeature:
        "Rogue's Dodge: spendi 3 Speranza per +2 all'Evasione fino al prossimo attacco subito con successo (altrimenti dura fino al prossimo riposo).",
      ancestryFeature1:
        "Ribbet – Anfibio: respiri e ti muovi normalmente sott'acqua. Lingualunga: marca Stress per usare la lingua come arma Astuzia Ravvicinata (d12 danno fisico × Competenza).",
      ancestryFeature2: "",
      communityFeature:
        "Sotterranea – Vivere nel Crepuscolo: vantaggio su prove per nasconderti, investigare o percepire dettagli in zone poco illuminate o in ombra.",
      experiences: [
        { id: "barnacle-e1", name: "They Don't See Me Coming!", mod: 2 },
        { id: "barnacle-e2", name: "Strike a Deal", mod: 2 },
      ],
      domainCards: [
        {
          id: "barnacle-c1",
          name: "Rapidità di Mano",
          domain: "Midnight",
          level: 1,
          recall: 0,
          description:
            "Vantaggio su prove per scassinare serrature non magiche, disinnescare trappole non magiche o rubare oggetti (con furtività o forza).",
          location: "loadout",
        },
        {
          id: "barnacle-c2",
          name: "Parole Ispiratrici",
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
        primary: { name: "Bastone Gemello", trait: "Istinto", range: "Lontana", damage: "1d6+3 mag", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Corazza di Cuoio", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Pozione di Recupero Minore (elimina 1d4 Stress)",
      classFeature:
        "Stregone – Percezione Arcana: percepisci presenze/oggetti magici in Ravvicinata. Illusione Minore: Tiro Incantesimo (10) per creare un'illusione visiva minore in Ravvicinata. Incanalare Potere Grezzo: una volta per riposo lungo, manda in Vault una carta dominio dal loadout per ottenere Speranza pari al suo livello, oppure potenziare un incantesimo di danno (+2×livello carta).\nPotere Primordiale (sottoclasse) – Tratto da Incantatore: Istinto. Manipolare la Magia: dopo un incantesimo/attacco magico marca Stress per: estendere la portata, +2 al tiro, raddoppiare un dado danno, o colpire un bersaglio aggiuntivo.",
      hopeFeature:
        "Volatile Magic: spendi 3 Speranza per ritirare un numero qualsiasi di dadi danno su un attacco che infligge danno magico.",
      ancestryFeature1:
        "Elfi – Reazione Istintiva: marca Stress per vantaggio su un tiro di reazione. Dormiveglia: durante un riposo, entra in trance per scegliere una mossa di riposo aggiuntiva.",
      ancestryFeature2: "",
      communityFeature:
        "Erudita – Acculturato: vantaggio su prove riguardanti storia, cultura o politica di persone o luoghi rilevanti.",
      experiences: [
        { id: "marlowe-e1", name: "Royal Mage", mod: 2 },
        { id: "marlowe-e2", name: "Not On My Watch", mod: 2 },
      ],
      domainCards: [
        {
          id: "marlowe-c1",
          name: "Scatenare il Caos",
          domain: "Arcana",
          level: 1,
          recall: 1,
          description:
            "A inizio sessione ottieni gettoni pari al tuo tratto Incantatore. Tiro Incantesimo a portata Lontana: spendi gettoni per tirare altrettanti d10 di danno magico; marca Stress per rifornire un gettone.",
          location: "loadout",
        },
        {
          id: "marlowe-c2",
          name: "Pioggia di Lame",
          domain: "Midnight",
          level: 1,
          recall: 1,
          description:
            "Spendi Speranza per un Tiro Incantesimo: coltelli volanti colpiscono tutti i bersagli Prossimi (1d8+2 danno magico × Competenza, +1d8 extra su bersagli Vulnerabili).",
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
        primary: { name: "Spada Lunga", trait: "Agilità", range: "Mischia", damage: "1d8+3 fis", feature: "" },
        secondary: { name: "", trait: "", range: "", damage: "", feature: "" },
      },
      armorItem: { name: "Corazza di Cuoio", baseScore: 3, baseMajor: 6, baseSevere: 13 },
      inventory: "Pozione di Guarigione Minore (cura 1d4 PF)",
      classFeature:
        "Guerriero – Attacco d'Opportunità: se un nemico in Mischia tenta di allontanarsi, tiro di reazione con un tratto a scelta contro la sua Difficoltà; successo = uno tra bloccarlo/danno pari all'arma primaria/seguirlo (2 effetti su critico). Addestramento al Combattimento: ignori l'ingombro delle armi; il danno fisico ottiene un bonus pari al livello.\nChiamata del Coraggio (sottoclasse) – Coraggio: se fallisci un tiro con Paura, guadagni Speranza. Riti di Battaglia: una volta per riposo lungo, prima di un pericolo enorme, elimina 2 Stress e guadagna 2 Speranza descrivendo un rituale o una preparazione.",
      hopeFeature: "No Mercy: spendi 3 Speranza per +1 ai tiri d'attacco fino al prossimo riposo.",
      ancestryFeature1:
        "Umani – Vigore: uno slot Stress in più alla creazione (già incluso). Versatilità: se fallisci un tiro che usava un'Esperienza, marca Stress per ritirare.",
      ancestryFeature2: "",
      communityFeature:
        "Privilegiata – Privilegio: vantaggio su prove per trattare con nobili, negoziare prezzi o sfruttare la tua reputazione.",
      experiences: [
        { id: "garrick-e1", name: "Affable", mod: 2 },
        { id: "garrick-e2", name: "Hit Them Hard", mod: 2 },
      ],
      domainCards: [
        {
          id: "garrick-c1",
          name: "Non È Abbastanza",
          domain: "Blade",
          level: 1,
          recall: 1,
          description: "Tirando i dadi danno, ritira tutti gli 1 e i 2.",
          location: "loadout",
        },
        {
          id: "garrick-c2",
          name: "In Arrivo",
          domain: "Bone",
          level: 1,
          recall: 1,
          description:
            "Se sei bersagliato da un attacco da oltre Mischia, marca Stress per tirare un d4 e aggiungerlo alla tua Evasione contro quell'attacco.",
          location: "loadout",
        },
      ],
    },
  },
];
