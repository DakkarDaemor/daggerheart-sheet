import { useCallback, useEffect, useRef, useState } from "react";
import { TRAITS, STANDARD_ARRAY_VALUES } from "../data/gameData.js";
import { INDEX_KEY, LAST_OPENED_KEY, charKey, storageGet, storageSet, storageDelete, deepClone } from "../storage.js";
import { initialCharacter, hasMeaningfulData, nextId } from "../character.js";
import type { Character, IndexEntry, Preset, StorageStatus } from "../types.js";
import type { Strings } from "../i18n.js";

/* ---------------------------------------------------------------------
   Stato del personaggio corrente + persistenza su localStorage
   (caricamento iniziale, autosave con debounce, salva/nuovo/carica/
   elimina/preset). t sono le stringhe della lingua attiva, servono qui
   solo per i messaggi di conferma e il nome di default "Senza nome".
--------------------------------------------------------------------- */
// Letto una sola volta, in modo sincrono, al primo render (lazy initial
// state) invece che in un useEffect al mount: evita un giro di render con
// dati placeholder seguito da un re-render con i dati caricati.
function loadInitialState(): { char: Character; currentId: string | null; status: StorageStatus } {
  const ptr = storageGet(LAST_OPENED_KEY);
  const id = ptr && ptr.value;
  if (id) {
    const res = storageGet(charKey(id));
    if (res && res.value) {
      try {
        return { char: { ...initialCharacter(), ...JSON.parse(res.value) }, currentId: id, status: "saved" };
      } catch {
        /* dati corrotti: si riparte da vuoto */
      }
    }
  }
  return { char: initialCharacter(), currentId: null, status: "new" };
}

export function useCharacterSheet(t: Strings) {
  const [initial] = useState(loadInitialState);
  const [char, setChar] = useState<Character>(initial.char);
  const [currentId, setCurrentId] = useState<string | null>(initial.currentId);
  const [status, setStatus] = useState<StorageStatus>(initial.status);
  const [showLoadPanel, setShowLoadPanel] = useState(false);
  const [savedList, setSavedList] = useState<IndexEntry[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextAutosave = useRef(false);

  const readIndex = (): IndexEntry[] => {
    const res = storageGet(INDEX_KEY);
    if (res && res.value) {
      try {
        return JSON.parse(res.value);
      } catch {
        return [];
      }
    }
    return [];
  };
  const writeIndex = (list: IndexEntry[]) => storageSet(INDEX_KEY, JSON.stringify(list));
  const upsertIndexEntry = (entry: IndexEntry) => {
    const list = readIndex();
    const i = list.findIndex((e) => e.id === entry.id);
    if (i >= 0) list[i] = entry;
    else list.push(entry);
    writeIndex(list);
  };
  const entryFor = (id: string, c: Character): IndexEntry => ({
    id,
    name: c.identity.name.trim() || t.untitled,
    className: c.identity.className || "",
    level: c.identity.level || 1,
    updatedAt: Date.now(),
  });

  useEffect(() => {
    if (!currentId) return;
    if (skipNextAutosave.current) {
      skipNextAutosave.current = false;
      return;
    }
    setStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const result = storageSet(charKey(currentId), JSON.stringify(char));
      if (result) {
        upsertIndexEntry(entryFor(currentId, char));
        setStatus("saved");
      } else setStatus("error");
    }, 400);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // entryFor/upsertIndexEntry non sono memoizzate ma sono funzioni pure
    // dei loro argomenti: includerle nelle deps romperebbe il debounce
    // (l'effect ripartirebbe a ogni render, non solo quando cambia `char`).
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const update = useCallback((path: string, value: unknown) => {
    setChar((prev) => {
      // Path puntato risolto a runtime: tipizzarlo con precisione servirebbe
      // mapped types ricorsivi sproporzionati alla dimensione dell'app.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next: any = deepClone(prev);
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]!];
      ref[keys[keys.length - 1]!] = value;
      return next;
    });
  }, []);

  const confirmDiscard = (): boolean => {
    if (!currentId && hasMeaningfulData(char)) {
      return window.confirm(t.confirmDiscardUnsaved);
    }
    return true;
  };

  // Se il personaggio corrente è già salvato ma ha una modifica in sospeso
  // (debounce dell'autosave non ancora scattato), la scrive subito prima
  // di lasciare la scheda, per non perdere l'ultima modifica.
  const flushPendingSave = () => {
    if (currentId && saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
      const result = storageSet(charKey(currentId), JSON.stringify(char));
      if (result) upsertIndexEntry(entryFor(currentId, char));
    }
  };

  const startNew = () => {
    if (hasMeaningfulData(char)) {
      const msg = currentId ? t.confirmNewClearsSaved : t.confirmDiscardUnsaved;
      if (!window.confirm(msg)) return;
    }
    flushPendingSave();
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
    if (!result) {
      setStatus("error");
      return;
    }
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

  const loadCharacter = (id: string) => {
    if (!confirmDiscard()) return;
    flushPendingSave();
    const res = storageGet(charKey(id));
    if (res && res.value) {
      try {
        skipNextAutosave.current = true;
        setChar({ ...initialCharacter(), ...JSON.parse(res.value) });
        setCurrentId(id);
        setStatus("saved");
        storageSet(LAST_OPENED_KEY, id);
      } catch {
        /* ignorato */
      }
    }
    setShowLoadPanel(false);
  };

  const loadPreset = (preset: Preset) => {
    if (!confirmDiscard()) return;
    flushPendingSave();
    try {
      const id = nextId();
      const data = { ...initialCharacter(), ...deepClone(preset.data) };
      storageSet(charKey(id), JSON.stringify(data));
      upsertIndexEntry(entryFor(id, data));
      storageSet(LAST_OPENED_KEY, id);
      skipNextAutosave.current = true;
      setChar(data);
      setCurrentId(id);
      setStatus("saved");
      setShowLoadPanel(false);
    } catch {
      setStatus("error");
    }
  };

  const deleteCharacter = (id: string) => {
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
    const traits: Record<string, number> = {};
    TRAITS.forEach((tr, i) => {
      traits[tr.key] = STANDARD_ARRAY_VALUES[i]!;
    });
    update("traits", traits);
  };

  return {
    char,
    currentId,
    status,
    showLoadPanel,
    setShowLoadPanel,
    savedList,
    isFullscreen,
    toggleFullscreen,
    update,
    startNew,
    saveNow,
    openLoadPanel,
    loadCharacter,
    loadPreset,
    deleteCharacter,
    applyStandardArray,
  };
}
