import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";

/* ---------------------------------------------------------------------
   DATI DI GIOCO (Daggerheart SRD 1.0, licenza DPCGL — Darrington Press)
   Nomi di classi / domini / ancestrie / comunità lasciati in inglese:
   non esiste una localizzazione italiana ufficiale del gioco.
--------------------------------------------------------------------- */

const TRAITS = [
  { key: "agility", label: "Agility", sub: ["Sprint", "Leap", "Maneuver"] },
  { key: "strength", label: "Strength", sub: ["Lift", "Smash", "Grapple"] },
  { key: "finesse", label: "Finesse", sub: ["Control", "Hide", "Tinker"] },
  { key: "instinct", label: "Instinct", sub: ["Perceive", "Sense", "Navigate"] },
  { key: "presence", label: "Presence", sub: ["Charm", "Perform", "Deceive"] },
  { key: "knowledge", label: "Knowledge", sub: ["Recall", "Analyze", "Comprehend"] },
];
const STANDARD_ARRAY = { agility: 0, strength: 0, finesse: 0, instinct: 0, presence: 0, knowledge: 0 };
const STANDARD_ARRAY_VALUES = [2, 1, 1, 0, 0, -1];

const CLASS_DOMAINS = {
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
const SUBCLASSES = {
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
const CLASSES = Object.keys(CLASS_DOMAINS);
const DOMAINS = ["Arcana", "Blade", "Bone", "Codex", "Grace", "Midnight", "Sage", "Splendor", "Valor"];
const ANCESTRIES = ["Clank", "Drakona", "Dwarf", "Elf", "Faerie", "Faun", "Firbolg", "Fungril", "Galapa", "Giant", "Goblin", "Halfling", "Human", "Infernis", "Katari", "Orc", "Ribbet", "Simiah"];
const COMMUNITIES = ["Highborne", "Loreborne", "Orderborne", "Ridgeborne", "Seaborne", "Skyborne", "Underborne", "Wanderborne", "Wildborne"];

const INDEX_KEY = "daggerheart:index";
const LAST_OPENED_KEY = "daggerheart:last-opened";
const charKey = (id) => `daggerheart:char:${id}`;

/* ---------------------------------------------------------------------
   PERSONAGGI PRECOMPILATI
   Aggiungi qui i personaggi da offrire come base pronta all'uso.
   "data" può contenere anche solo alcuni campi: viene unito allo
   scheletro vuoto (initialCharacter), quindi puoi restare parziale.
   Esempio:
   { id: "preset-thorne", name: "Thorne", className: "Guardian", level: 3,
     data: { identity: { name: "Thorne", className: "Guardian", ... }, ... } }
--------------------------------------------------------------------- */
const PRESETS = [];

/* ---------------------------------------------------------------------
   STORAGE: localStorage del browser (pagina eseguita fuori da Claude,
   quindi qui localStorage è quello giusto, non un sostituto di ripiego)
--------------------------------------------------------------------- */
function storageGet(key) {
  const v = localStorage.getItem(key);
  return v === null ? null : { key, value: v };
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); return { key, value }; } catch (e) { return null; }
}
function storageDelete(key) {
  localStorage.removeItem(key);
  return { key, deleted: true };
}

/* ---------------------------------------------------------------------
   TRADUZIONI INTERFACCIA
--------------------------------------------------------------------- */
const STR = {
  it: {
    subtitle: "Scheda personaggio",
    tabIdentity: "Identità", tabTraits: "Tratti & Vitali", tabEquip: "Equipaggiamento", tabAbilities: "Abilità & Domini",
    name: "Nome", pronouns: "Pronomi", ancestry: "Ancestria", mixed: "Ancestria mista",
    secondAncestry: "Seconda ancestria (tratto inferiore)", community: "Comunità",
    className: "Classe", subclass: "Sottoclasse", level: "Livello", proficiency: "Competenza",
    domainAccess: "Domini di accesso", noOfficialIt: "Nomi di classi, domini, ancestrie e comunità restano in inglese: non esiste una localizzazione italiana ufficiale del gioco.",
    traits: "Tratti", standardArrayBtn: "Assegna array standard (+2,+1,+1,0,0,-1)",
    vitals: "Vitali", evasion: "Schivata", armorScore: "Punteggio Armatura",
    hp: "Punti Ferita", stress: "Stress", hope: "Speranza", armorSlots: "Slot Armatura", max: "max",
    gold: "Oro", handfuls: "Manciate", bags: "Sacche", chest: "Forziere",
    thresholds: "Soglie di danno", baseMajor: "Base Major (da armatura)", baseSevere: "Base Severe (da armatura)",
    effMajor: "Major effettiva", effSevere: "Severe effettiva", thresholdHint: "effettiva = base armatura + livello",
    dmgCalcTitle: "Calcola danno subito", incomingDamage: "Danno in arrivo", markResultPrefix: "Segna",
    markMinor: "1 PF (sotto Major)", markMajor: "2 PF (Major–Severe)", markSevere: "3 PF (Severe o oltre)",
    massiveHint: "Se il danno è ≥ 2× Severe, regola opzionale: segna 4 PF.", noDamage: "Nessun danno segnato (0 o meno).",
    weapons: "Armi", primaryWeapon: "Arma primaria", secondaryWeapon: "Arma secondaria",
    wName: "Nome", wTrait: "Tratto", wRange: "Gittata", wDamage: "Danno", wFeature: "Caratteristica",
    armorEquipped: "Armatura equipaggiata", inventory: "Inventario", inventoryPh: "Oggetti, provviste, curiosità...",
    classFeature: "Caratteristica di Classe", hopeFeature: "Caratteristica di Speranza (costa 3 Speranza)",
    ancestryFeatures: "Caratteristiche di Ancestria", communityFeature: "Caratteristica di Comunità",
    experiences: "Esperienze", addExperience: "+ Aggiungi esperienza", expName: "Esperienza", expMod: "Mod.",
    domainCards: "Carte Dominio", addCard: "+ Aggiungi carta", cardName: "Nome carta", cardDomain: "Dominio",
    cardLevel: "Livello", cardRecall: "Costo Recall", cardDesc: "Effetto (riassunto tuo)",
    remove: "Rimuovi",
    loading: "Caricamento…", statusNew: "Non ancora salvato", saving: "Salvataggio…", saved: "Salvato",
    storageWarning: "Salvataggio non riuscito: la scheda resta solo in memoria per questa sessione.",
    newSheet: "Nuovo", save: "Salva", load: "Carica", fullscreen: "Schermo intero", exitFullscreen: "Esci da schermo intero",
    loadTitle: "Personaggi salvati", noSaved: "Nessun personaggio salvato per ora.",
    untitled: "Senza nome", open: "Apri", delete: "Elimina", close: "Chiudi",
    presetsTitle: "Personaggi precompilati", usePreset: "Usa come base",
    confirmDeleteChar: "Eliminare questo personaggio salvato? Non è reversibile.",
    confirmDiscardUnsaved: "Questo personaggio non è ancora salvato: i dati inseriti andranno persi. Continuare?",
  },
  en: {
    subtitle: "Character sheet",
    tabIdentity: "Identity", tabTraits: "Traits & Vitals", tabEquip: "Equipment", tabAbilities: "Abilities & Domains",
    name: "Name", pronouns: "Pronouns", ancestry: "Ancestry", mixed: "Mixed ancestry",
    secondAncestry: "Second ancestry (bottom feature)", community: "Community",
    className: "Class", subclass: "Subclass", level: "Level", proficiency: "Proficiency",
    domainAccess: "Domain access", noOfficialIt: "Class, domain, ancestry and community names stay in English: there is no official Italian localization of the game.",
    traits: "Traits", standardArrayBtn: "Assign standard array (+2,+1,+1,0,0,-1)",
    vitals: "Vitals", evasion: "Evasion", armorScore: "Armor Score",
    hp: "Hit Points", stress: "Stress", hope: "Hope", armorSlots: "Armor Slots", max: "max",
    gold: "Gold", handfuls: "Handfuls", bags: "Bags", chest: "Chest",
    thresholds: "Damage thresholds", baseMajor: "Base Major (from armor)", baseSevere: "Base Severe (from armor)",
    effMajor: "Effective Major", effSevere: "Effective Severe", thresholdHint: "effective = armor base + level",
    dmgCalcTitle: "Calculate incoming damage", incomingDamage: "Incoming damage", markResultPrefix: "Mark",
    markMinor: "1 HP (below Major)", markMajor: "2 HP (Major–Severe)", markSevere: "3 HP (Severe or above)",
    massiveHint: "If damage ≥ 2× Severe, optional rule: mark 4 HP.", noDamage: "No HP marked (0 or less).",
    weapons: "Weapons", primaryWeapon: "Primary weapon", secondaryWeapon: "Secondary weapon",
    wName: "Name", wTrait: "Trait", wRange: "Range", wDamage: "Damage", wFeature: "Feature",
    armorEquipped: "Equipped armor", inventory: "Inventory", inventoryPh: "Items, supplies, curiosities...",
    classFeature: "Class Feature", hopeFeature: "Hope Feature (costs 3 Hope)",
    ancestryFeatures: "Ancestry Features", communityFeature: "Community Feature",
    experiences: "Experiences", addExperience: "+ Add experience", expName: "Experience", expMod: "Mod.",
    domainCards: "Domain Cards", addCard: "+ Add card", cardName: "Card name", cardDomain: "Domain",
    cardLevel: "Level", cardRecall: "Recall cost", cardDesc: "Effect (your summary)",
    remove: "Remove",
    loading: "Loading…", statusNew: "Not saved yet", saving: "Saving…", saved: "Saved",
    storageWarning: "Save failed: the sheet stays in memory for this session only.",
    newSheet: "New", save: "Save", load: "Load", fullscreen: "Fullscreen", exitFullscreen: "Exit fullscreen",
    loadTitle: "Saved characters", noSaved: "No saved characters yet.",
    untitled: "Untitled", open: "Open", delete: "Delete", close: "Close",
    presetsTitle: "Preset characters", usePreset: "Use as base",
    confirmDeleteChar: "Delete this saved character? This cannot be undone.",
    confirmDiscardUnsaved: "This character hasn't been saved yet: the data you entered will be lost. Continue?",
  },
};

/* ---------------------------------------------------------------------
   STATO INIZIALE
--------------------------------------------------------------------- */
let uid = 0;
const nextId = () => `id${Date.now()}_${uid++}`;
const emptyWeapon = () => ({ name: "", trait: "", range: "", damage: "", feature: "" });

const initialCharacter = () => ({
  identity: {
    name: "", pronouns: "", ancestry: "", mixed: false, ancestry2: "",
    community: "", className: "", subclass: "", level: 1, proficiency: 1,
  },
  traits: { ...STANDARD_ARRAY },
  vitals: {
    evasion: 10, armorScore: 0,
    hpMax: 6, hpMarked: 0, stressMax: 6, stressMarked: 0,
    hopeMax: 6, hopeMarked: 0, armorSlotsMax: 0, armorSlotsMarked: 0,
    goldHandfuls: 0, goldBags: 0, goldChest: 0,
  },
  thresholds: { baseMajor: 0, baseSevere: 0 },
  weapons: { primary: emptyWeapon(), secondary: emptyWeapon() },
  armorItem: { name: "", baseScore: 0, baseMajor: 0, baseSevere: 0 },
  inventory: "",
  classFeature: "", hopeFeature: "",
  ancestryFeature1: "", ancestryFeature2: "", communityFeature: "",
  experiences: [
    { id: nextId(), name: "", mod: 2 },
    { id: nextId(), name: "", mod: 2 },
  ],
  domainCards: [],
});

const hasMeaningfulData = (c) =>
  !!(c.identity.name.trim() || c.identity.className || c.identity.ancestry || c.identity.community);

/* ---------------------------------------------------------------------
   PICCOLI COMPONENTI DI UI
--------------------------------------------------------------------- */
function PipTrack({ max, marked, onToggle, tone }) {
  const pips = [];
  for (let i = 0; i < max; i++) {
    pips.push(
      <button key={i} type="button" onClick={() => onToggle(i)} aria-label={`${i + 1}/${max}`} className="pip"
        style={{ background: i < marked ? tone : "transparent", borderColor: tone }} />
    );
  }
  return <div className="pip-track">{pips}</div>;
}

function Field({ label, children, wide }) {
  return (
    <label className={`field ${wide ? "field-wide" : ""}`}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function Section({ title, children, accent }) {
  return (
    <div className="section" style={accent ? { borderTopColor: accent } : undefined}>
      {title && <h3 className="section-title">{title}</h3>}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------
   APP PRINCIPALE
--------------------------------------------------------------------- */
function DaggerheartSheet() {
  const [lang, setLang] = useState("it");
  const t = STR[lang];
  const [tab, setTab] = useState("identity");
  const [char, setChar] = useState(initialCharacter());
  const [currentId, setCurrentId] = useState(null);
  const [status, setStatus] = useState("loading");
  const [showLoadPanel, setShowLoadPanel] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const saveTimer = useRef(null);
  const hasLoaded = useRef(false);
  const skipNextAutosave = useRef(false);

  const readIndex = () => {
    const res = storageGet(INDEX_KEY);
    if (res && res.value) { try { return JSON.parse(res.value); } catch (e) { return []; } }
    return [];
  };
  const writeIndex = (list) => storageSet(INDEX_KEY, JSON.stringify(list));
  const upsertIndexEntry = (entry) => {
    const list = readIndex();
    const i = list.findIndex((e) => e.id === entry.id);
    if (i >= 0) list[i] = entry; else list.push(entry);
    writeIndex(list);
  };
  const entryFor = (id, c) => ({
    id, name: c.identity.name.trim() || t.untitled,
    className: c.identity.className || "", level: c.identity.level || 1, updatedAt: Date.now(),
  });

  useEffect(() => {
    const ptr = storageGet(LAST_OPENED_KEY);
    const id = ptr && ptr.value;
    if (id) {
      const res = storageGet(charKey(id));
      if (res && res.value) {
        try {
          setChar({ ...initialCharacter(), ...JSON.parse(res.value) });
          setCurrentId(id);
          hasLoaded.current = true;
          setStatus("saved");
          return;
        } catch (e) { /* dati corrotti: si riparte da vuoto */ }
      }
    }
    hasLoaded.current = true;
    setStatus("new");
  }, []);

  useEffect(() => {
    if (!hasLoaded.current || !currentId) return;
    if (skipNextAutosave.current) { skipNextAutosave.current = false; return; }
    setStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const result = storageSet(charKey(currentId), JSON.stringify(char));
      if (result) { upsertIndexEntry(entryFor(currentId, char)); setStatus("saved"); }
      else setStatus("error");
    }, 400);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [char]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const update = useCallback((path, value) => {
    setChar((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const startNew = () => {
    if (!currentId && hasMeaningfulData(char) && !window.confirm(t.confirmDiscardUnsaved)) return;
    skipNextAutosave.current = true;
    setChar(initialCharacter());
    setCurrentId(null);
    setStatus("new");
    storageDelete(LAST_OPENED_KEY);
  };

  const saveNow = () => {
    setStatus("saving");
    const id = currentId || nextId();
    const result = storageSet(charKey(id), JSON.stringify(char));
    if (!result) { setStatus("error"); return; }
    upsertIndexEntry(entryFor(id, char));
    storageSet(LAST_OPENED_KEY, id);
    if (!currentId) setCurrentId(id);
    setStatus("saved");
  };

  const openLoadPanel = () => {
    const list = readIndex();
    list.sort((a, b) => b.updatedAt - a.updatedAt);
    setSavedList(list);
    setShowLoadPanel(true);
  };

  const loadCharacter = (id) => {
    const res = storageGet(charKey(id));
    if (res && res.value) {
      try {
        skipNextAutosave.current = true;
        setChar({ ...initialCharacter(), ...JSON.parse(res.value) });
        setCurrentId(id);
        setStatus("saved");
        storageSet(LAST_OPENED_KEY, id);
      } catch (e) { /* ignorato */ }
    }
    setShowLoadPanel(false);
  };

  const loadPreset = (preset) => {
    const id = nextId();
    const data = { ...initialCharacter(), ...structuredClone(preset.data) };
    storageSet(charKey(id), JSON.stringify(data));
    upsertIndexEntry(entryFor(id, data));
    storageSet(LAST_OPENED_KEY, id);
    skipNextAutosave.current = true;
    setChar(data);
    setCurrentId(id);
    setStatus("saved");
    setShowLoadPanel(false);
  };

  const deleteCharacter = (id) => {
    if (!window.confirm(t.confirmDeleteChar)) return;
    storageDelete(charKey(id));
    const list = readIndex().filter((e) => e.id !== id);
    writeIndex(list);
    setSavedList(list);
    if (id === currentId) {
      skipNextAutosave.current = true;
      setChar(initialCharacter());
      setCurrentId(null);
      setStatus("new");
      storageDelete(LAST_OPENED_KEY);
    }
  };

  const applyStandardArray = () => {
    const traits = {};
    TRAITS.forEach((tr, i) => { traits[tr.key] = STANDARD_ARRAY_VALUES[i]; });
    update("traits", traits);
  };

  const { identity, traits, vitals, thresholds, weapons, armorItem } = char;
  const effMajor = (Number(thresholds.baseMajor) || 0) + (Number(identity.level) || 0);
  const effSevere = (Number(thresholds.baseSevere) || 0) + (Number(identity.level) || 0);

  const [incomingDamage, setIncomingDamage] = useState("");
  const dmg = Number(incomingDamage);
  let dmgResult = null;
  if (incomingDamage !== "" && !isNaN(dmg)) {
    if (dmg <= 0) dmgResult = t.noDamage;
    else if (dmg >= effSevere && effSevere > 0) dmgResult = `${t.markResultPrefix} ${t.markSevere}`;
    else if (dmg >= effMajor && effMajor > 0) dmgResult = `${t.markResultPrefix} ${t.markMajor}`;
    else dmgResult = `${t.markResultPrefix} ${t.markMinor}`;
  }
  const massive = incomingDamage !== "" && effSevere > 0 && dmg >= effSevere * 2;

  const domainOptions = identity.className ? CLASS_DOMAINS[identity.className] : [];
  const subclassOptions = identity.className ? SUBCLASSES[identity.className] : [];

  const addExperience = () => update("experiences", [...char.experiences, { id: nextId(), name: "", mod: 2 }]);
  const removeExperience = (id) => update("experiences", char.experiences.filter((e) => e.id !== id));
  const editExperience = (id, field, value) =>
    update("experiences", char.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));

  const addDomainCard = () =>
    update("domainCards", [...char.domainCards, { id: nextId(), name: "", domain: domainOptions[0] || DOMAINS[0], level: 1, recall: 0, description: "" }]);
  const removeDomainCard = (id) => update("domainCards", char.domainCards.filter((c) => c.id !== id));
  const editDomainCard = (id, field, value) =>
    update("domainCards", char.domainCards.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  const tabs = [
    { key: "identity", label: t.tabIdentity },
    { key: "traits", label: t.tabTraits },
    { key: "equip", label: t.tabEquip },
    { key: "abilities", label: t.tabAbilities },
  ];

  const statusText = status === "loading" ? t.loading
    : status === "new" ? t.statusNew
    : status === "saving" ? t.saving
    : status === "error" ? t.storageWarning
    : t.saved;

  return (
    <div className="dh-root">
      <div className="header">
        <div>
          <h1 className="title">Daggerheart</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <div className="lang-toggle">
          <button className={lang === "it" ? "active" : ""} onClick={() => setLang("it")}>IT</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>

      <div className="status-row">
        <span className={`status-dot ${status === "saving" ? "saving" : status === "error" ? "error" : ""}`} />
        {statusText}
      </div>

      <div className="action-row">
        <button className="action-btn" onClick={startNew}>{t.newSheet}</button>
        <button className="action-btn primary" onClick={saveNow}>{t.save}</button>
        <button className="action-btn secondary" onClick={openLoadPanel}>{t.load}</button>
        <button className="action-btn" onClick={toggleFullscreen}>{isFullscreen ? "⤦" : "⛶"}</button>
      </div>

      {showLoadPanel && (
        <div className="load-panel">
          <div className="load-panel-head">
            <h3 className="section-title" style={{ margin: 0 }}>{t.loadTitle}</h3>
            <button className="small-btn" onClick={() => setShowLoadPanel(false)}>{t.close}</button>
          </div>
          {savedList.length === 0 && <p className="hint">{t.noSaved}</p>}
          {savedList.map((entry) => (
            <div className="load-item" key={entry.id}>
              <div className="load-item-info">
                <div className="load-item-name">{entry.name}</div>
                <div className="load-item-meta">
                  {[entry.className, entry.level ? `Lv ${entry.level}` : null].filter(Boolean).join(" · ")}
                </div>
              </div>
              <div className="load-item-actions">
                <button className="small-btn accent" onClick={() => loadCharacter(entry.id)}>{t.open}</button>
                <button className="small-btn danger" onClick={() => deleteCharacter(entry.id)}>{t.delete}</button>
              </div>
            </div>
          ))}

          {PRESETS.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: 14 }}>{t.presetsTitle}</h3>
              {PRESETS.map((preset) => (
                <div className="load-item" key={preset.id}>
                  <div className="load-item-info">
                    <div className="load-item-name">{preset.name}</div>
                    <div className="load-item-meta">
                      {[preset.className, preset.level ? `Lv ${preset.level}` : null].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="load-item-actions">
                    <button className="small-btn accent" onClick={() => loadPreset(preset)}>{t.usePreset}</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <div className="tabs">
        {tabs.map((tb) => (
          <button key={tb.key} className={`tab-btn ${tab === tb.key ? "active" : ""}`} onClick={() => setTab(tb.key)}>
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "identity" && (
        <Section accent="var(--hope)">
          <div className="grid2">
            <Field label={t.name}><input value={identity.name} onChange={(e) => update("identity.name", e.target.value)} /></Field>
            <Field label={t.pronouns}><input value={identity.pronouns} onChange={(e) => update("identity.pronouns", e.target.value)} /></Field>

            <Field label={t.ancestry}>
              <select value={identity.ancestry} onChange={(e) => update("identity.ancestry", e.target.value)}>
                <option value="">—</option>
                {ANCESTRIES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field label={t.community}>
              <select value={identity.community} onChange={(e) => update("identity.community", e.target.value)}>
                <option value="">—</option>
                {COMMUNITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            <label className="field field-wide" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <input type="checkbox" style={{ width: "auto" }} checked={identity.mixed} onChange={(e) => update("identity.mixed", e.target.checked)} />
              <span className="field-label" style={{ margin: 0 }}>{t.mixed}</span>
            </label>
            {identity.mixed && (
              <Field label={t.secondAncestry} wide>
                <select value={identity.ancestry2} onChange={(e) => update("identity.ancestry2", e.target.value)}>
                  <option value="">—</option>
                  {ANCESTRIES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </Field>
            )}

            <Field label={t.className}>
              <select value={identity.className} onChange={(e) => update("identity.className", e.target.value)}>
                <option value="">—</option>
                {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label={t.subclass}>
              <select value={identity.subclass} onChange={(e) => update("identity.subclass", e.target.value)} disabled={!identity.className}>
                <option value="">—</option>
                {subclassOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label={t.level}>
              <input type="number" min="1" max="10" value={identity.level} onChange={(e) => update("identity.level", Number(e.target.value))} />
            </Field>
            <Field label={t.proficiency}>
              <input type="number" min="0" value={identity.proficiency} onChange={(e) => update("identity.proficiency", Number(e.target.value))} />
            </Field>
          </div>

          {identity.className && (
            <p className="hint">{t.domainAccess}: <b style={{ color: "var(--text)" }}>{domainOptions.join(" · ")}</b></p>
          )}
          <p className="hint">{t.noOfficialIt}</p>
        </Section>
      )}

      {tab === "traits" && (
        <>
          <Section title={t.traits} accent="var(--hope)">
            <div className="grid2" style={{ marginBottom: 8 }}>
              {TRAITS.map((tr) => (
                <div className="trait-card" key={tr.key}>
                  <div className="trait-head">
                    <span className="trait-name">{tr.label}</span>
                    <input className="trait-mod-input" type="number" value={traits[tr.key]}
                      onChange={(e) => update(`traits.${tr.key}`, Number(e.target.value))} />
                  </div>
                  <div className="trait-subs">
                    {tr.sub.map((s) => <span className="trait-sub" key={s}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <button className="ghost-btn" onClick={applyStandardArray}>{t.standardArrayBtn}</button>
          </Section>

          <Section title={t.vitals} accent="var(--fear)">
            <div className="grid2" style={{ marginBottom: 12 }}>
              <Field label={t.evasion}><input type="number" value={vitals.evasion} onChange={(e) => update("vitals.evasion", Number(e.target.value))} /></Field>
              <Field label={t.armorScore}><input type="number" value={vitals.armorScore} onChange={(e) => update("vitals.armorScore", Number(e.target.value))} /></Field>
            </div>

            <div className="vital-block">
              <div className="vital-head">
                <span className="vital-label">{t.hp}</span>
                <span className="vital-max">{t.max} <input type="number" value={vitals.hpMax} onChange={(e) => update("vitals.hpMax", Number(e.target.value))} /></span>
              </div>
              <PipTrack max={vitals.hpMax} marked={vitals.hpMarked} tone="var(--danger)"
                onToggle={(i) => update("vitals.hpMarked", i < vitals.hpMarked ? i : i + 1)} />
            </div>

            <div className="vital-block">
              <div className="vital-head">
                <span className="vital-label">{t.stress}</span>
                <span className="vital-max">{t.max} <input type="number" value={vitals.stressMax} onChange={(e) => update("vitals.stressMax", Number(e.target.value))} /></span>
              </div>
              <PipTrack max={vitals.stressMax} marked={vitals.stressMarked} tone="var(--fear)"
                onToggle={(i) => update("vitals.stressMarked", i < vitals.stressMarked ? i : i + 1)} />
            </div>

            <div className="vital-block">
              <div className="vital-head">
                <span className="vital-label">{t.hope}</span>
                <span className="vital-max">{t.max} <input type="number" value={vitals.hopeMax} onChange={(e) => update("vitals.hopeMax", Number(e.target.value))} /></span>
              </div>
              <PipTrack max={vitals.hopeMax} marked={vitals.hopeMarked} tone="var(--hope)"
                onToggle={(i) => update("vitals.hopeMarked", i < vitals.hopeMarked ? i : i + 1)} />
            </div>

            <div className="vital-block">
              <div className="vital-head">
                <span className="vital-label">{t.armorSlots}</span>
                <span className="vital-max">{t.max} <input type="number" value={vitals.armorSlotsMax} onChange={(e) => update("vitals.armorSlotsMax", Number(e.target.value))} /></span>
              </div>
              <PipTrack max={vitals.armorSlotsMax} marked={vitals.armorSlotsMarked} tone="var(--text-dim)"
                onToggle={(i) => update("vitals.armorSlotsMarked", i < vitals.armorSlotsMarked ? i : i + 1)} />
            </div>

            <div className="vital-block">
              <span className="vital-label">{t.gold}</span>
              <div className="gold-row" style={{ marginTop: 6 }}>
                <div className="gold-col">
                  <span className="field-label">{t.handfuls}</span>
                  <input type="number" min="0" max="9" value={vitals.goldHandfuls} onChange={(e) => update("vitals.goldHandfuls", Number(e.target.value))} />
                </div>
                <div className="gold-col">
                  <span className="field-label">{t.bags}</span>
                  <input type="number" min="0" max="9" value={vitals.goldBags} onChange={(e) => update("vitals.goldBags", Number(e.target.value))} />
                </div>
                <div className="gold-col">
                  <span className="field-label">{t.chest}</span>
                  <input type="number" min="0" value={vitals.goldChest} onChange={(e) => update("vitals.goldChest", Number(e.target.value))} />
                </div>
              </div>
            </div>
          </Section>

          <Section title={t.thresholds} accent="var(--fear)">
            <div className="grid2">
              <Field label={t.baseMajor}><input type="number" value={thresholds.baseMajor} onChange={(e) => update("thresholds.baseMajor", Number(e.target.value))} /></Field>
              <Field label={t.baseSevere}><input type="number" value={thresholds.baseSevere} onChange={(e) => update("thresholds.baseSevere", Number(e.target.value))} /></Field>
            </div>
            <div className="threshold-row">
              <div className="threshold-badge major"><span className="field-label">{t.effMajor}</span><b>{effMajor}</b></div>
              <div className="threshold-badge severe"><span className="field-label">{t.effSevere}</span><b>{effSevere}</b></div>
            </div>
            <p className="hint">{t.thresholdHint}</p>

            <h3 className="section-title" style={{ marginTop: 16 }}>{t.dmgCalcTitle}</h3>
            <Field label={t.incomingDamage}>
              <input type="number" value={incomingDamage} onChange={(e) => setIncomingDamage(e.target.value)} />
            </Field>
            {dmgResult && (
              <div className="dmg-result">
                {dmgResult}
                {massive && <div style={{ color: "var(--danger)", marginTop: 4, fontWeight: 600 }}>{t.massiveHint}</div>}
              </div>
            )}
          </Section>
        </>
      )}

      {tab === "equip" && (
        <>
          <Section title={t.armorEquipped} accent="var(--fear)">
            <div className="grid2">
              <Field label={t.wName} wide><input value={armorItem.name} onChange={(e) => update("armorItem.name", e.target.value)} /></Field>
              <Field label={t.armorScore}><input type="number" value={armorItem.baseScore} onChange={(e) => update("armorItem.baseScore", Number(e.target.value))} /></Field>
              <Field label={t.baseMajor}><input type="number" value={armorItem.baseMajor} onChange={(e) => update("armorItem.baseMajor", Number(e.target.value))} /></Field>
              <Field label={t.baseSevere}><input type="number" value={armorItem.baseSevere} onChange={(e) => update("armorItem.baseSevere", Number(e.target.value))} /></Field>
            </div>
          </Section>

          <Section title={t.weapons} accent="var(--hope)">
            {["primary", "secondary"].map((slot) => (
              <div className="weapon-block" key={slot}>
                <div className="weapon-title">{slot === "primary" ? t.primaryWeapon : t.secondaryWeapon}</div>
                <div className="grid2">
                  <Field label={t.wName} wide><input value={weapons[slot].name} onChange={(e) => update(`weapons.${slot}.name`, e.target.value)} /></Field>
                  <Field label={t.wTrait}><input value={weapons[slot].trait} onChange={(e) => update(`weapons.${slot}.trait`, e.target.value)} /></Field>
                  <Field label={t.wRange}><input value={weapons[slot].range} onChange={(e) => update(`weapons.${slot}.range`, e.target.value)} /></Field>
                  <Field label={t.wDamage} wide><input value={weapons[slot].damage} onChange={(e) => update(`weapons.${slot}.damage`, e.target.value)} /></Field>
                  <Field label={t.wFeature} wide><textarea value={weapons[slot].feature} onChange={(e) => update(`weapons.${slot}.feature`, e.target.value)} /></Field>
                </div>
              </div>
            ))}
          </Section>

          <Section title={t.inventory} accent="var(--text-dim)">
            <textarea placeholder={t.inventoryPh} value={char.inventory} onChange={(e) => update("inventory", e.target.value)} style={{ minHeight: 100 }} />
          </Section>
        </>
      )}

      {tab === "abilities" && (
        <>
          <Section title={t.classFeature} accent="var(--hope)">
            <textarea value={char.classFeature} onChange={(e) => update("classFeature", e.target.value)} />
          </Section>
          <Section title={t.hopeFeature} accent="var(--hope)">
            <textarea value={char.hopeFeature} onChange={(e) => update("hopeFeature", e.target.value)} />
          </Section>
          <Section title={t.ancestryFeatures} accent="var(--fear)">
            <Field label={identity.ancestry || "1"} wide><textarea value={char.ancestryFeature1} onChange={(e) => update("ancestryFeature1", e.target.value)} /></Field>
            <Field label={identity.mixed ? (identity.ancestry2 || "2") : "2"} wide><textarea value={char.ancestryFeature2} onChange={(e) => update("ancestryFeature2", e.target.value)} /></Field>
          </Section>
          <Section title={t.communityFeature} accent="var(--fear)">
            <textarea value={char.communityFeature} onChange={(e) => update("communityFeature", e.target.value)} />
          </Section>

          <Section title={t.experiences} accent="var(--hope)">
            {char.experiences.map((exp) => (
              <div className="list-row" key={exp.id}>
                <div className="grid2">
                  <Field label={t.expName} wide><input value={exp.name} onChange={(e) => editExperience(exp.id, "name", e.target.value)} /></Field>
                  <Field label={t.expMod}><input type="number" value={exp.mod} onChange={(e) => editExperience(exp.id, "mod", Number(e.target.value))} /></Field>
                </div>
                <button className="remove-x" onClick={() => removeExperience(exp.id)} aria-label={t.remove}>×</button>
              </div>
            ))}
            <button className="ghost-btn" onClick={addExperience}>{t.addExperience}</button>
          </Section>

          <Section title={t.domainCards} accent="var(--fear)">
            {char.domainCards.map((card) => (
              <div className="list-row" key={card.id}>
                <div className="grid2">
                  <Field label={t.cardName} wide><input value={card.name} onChange={(e) => editDomainCard(card.id, "name", e.target.value)} /></Field>
                  <Field label={t.cardDomain}>
                    <select value={card.domain} onChange={(e) => editDomainCard(card.id, "domain", e.target.value)}>
                      {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label={t.cardLevel}><input type="number" min="1" max="10" value={card.level} onChange={(e) => editDomainCard(card.id, "level", Number(e.target.value))} /></Field>
                  <Field label={t.cardRecall}><input type="number" min="0" value={card.recall} onChange={(e) => editDomainCard(card.id, "recall", Number(e.target.value))} /></Field>
                  <Field label={t.cardDesc} wide><textarea value={card.description} onChange={(e) => editDomainCard(card.id, "description", e.target.value)} /></Field>
                </div>
                <button className="remove-x" onClick={() => removeDomainCard(card.id)} aria-label={t.remove}>×</button>
              </div>
            ))}
            <button className="ghost-btn" onClick={addDomainCard}>{t.addCard}</button>
          </Section>
        </>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<DaggerheartSheet />);
