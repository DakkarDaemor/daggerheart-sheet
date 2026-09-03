import { useRef, useState, type ChangeEvent } from "react";
import { CLASS_DOMAINS, SUBCLASSES } from "./data/gameData.js";
import { PRESETS } from "./data/presets.js";
import { STR } from "./i18n.js";
import { useCharacterSheet } from "./hooks/useCharacterSheet.js";
import { IdentityTab } from "./components/tabs/IdentityTab.js";
import { TraitsTab } from "./components/tabs/TraitsTab.js";
import { EquipTab } from "./components/tabs/EquipTab.js";
import { AbilitiesTab } from "./components/tabs/AbilitiesTab.js";
import type { Lang } from "./types.js";

type TabKey = "identity" | "traits" | "equip" | "abilities";

/* ---------------------------------------------------------------------
   APP PRINCIPALE
--------------------------------------------------------------------- */
export function DaggerheartSheet() {
  const [lang, setLang] = useState<Lang>("it");
  const t = STR[lang];
  const [tab, setTab] = useState<TabKey>("identity");
  const [showActionMenu, setShowActionMenu] = useState(false);

  const {
    char,
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
    duplicateCharacter,
    applyStandardArray,
    exportCurrent,
    exportSaved,
    importFromFile,
  } = useCharacterSheet(t);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImportFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // permette di riselezionare lo stesso file in seguito
    if (file) void importFromFile(file);
  };

  // Le azioni Nuovo/Salva/Carica/Esporta/Importa/Fullscreen non si usano di
  // continuo come le tab: vivono in un menu nell'header invece che in una
  // riga di pulsanti sempre in vista sopra le tab.
  const runMenuAction = (action: () => void) => () => {
    setShowActionMenu(false);
    action();
  };
  const openFilePicker = () => {
    setShowActionMenu(false);
    fileInputRef.current?.click();
  };

  const { identity, traits, vitals, thresholds, weapons, armorItem } = char;
  const domainOptions = (identity.className ? CLASS_DOMAINS[identity.className] : []) ?? [];
  const subclassOptions = (identity.className ? SUBCLASSES[identity.className] : []) ?? [];

  const tabs: { key: TabKey; label: string }[] = [
    { key: "identity", label: t.tabIdentity },
    { key: "traits", label: t.tabTraits },
    { key: "equip", label: t.tabEquip },
    { key: "abilities", label: t.tabAbilities },
  ];

  const statusText =
    status === "loading"
      ? t.loading
      : status === "new"
        ? t.statusNew
        : status === "saving"
          ? t.saving
          : status === "error"
            ? t.storageWarning
            : t.saved;

  return (
    <div className="dh-root">
      <div className="header">
        <div>
          <h1 className="title">Daggerheart</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <div className="header-controls">
          <div className="lang-toggle">
            <button className={lang === "it" ? "active" : ""} onClick={() => setLang("it")}>
              IT
            </button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button
            className={`menu-btn ${showActionMenu ? "active" : ""}`}
            aria-label={t.actionsMenu}
            aria-expanded={showActionMenu}
            onClick={() => setShowActionMenu((v) => !v)}
          >
            ⋮
          </button>
          {showActionMenu && (
            <div className="action-menu">
              <button onClick={runMenuAction(startNew)}>{t.newSheet}</button>
              <button onClick={runMenuAction(saveNow)}>{t.save}</button>
              <button onClick={runMenuAction(openLoadPanel)}>{t.load}</button>
              <button onClick={runMenuAction(exportCurrent)}>{t.exportBtn}</button>
              <button onClick={openFilePicker}>{t.importBtn}</button>
              <button onClick={runMenuAction(toggleFullscreen)}>
                {isFullscreen ? t.exitFullscreen : t.fullscreen}
              </button>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImportFile}
          style={{ display: "none" }}
        />
      </div>

      <div className="status-row">
        <span className={`status-dot ${status === "saving" ? "saving" : status === "error" ? "error" : ""}`} />
        {statusText}
      </div>

      {showLoadPanel && (
        <div className="load-panel">
          <div className="load-panel-head">
            <h3 className="section-title" style={{ margin: 0 }}>
              {t.loadTitle}
            </h3>
            <button className="small-btn" onClick={() => setShowLoadPanel(false)}>
              {t.close}
            </button>
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
                <button className="small-btn accent" onClick={() => loadCharacter(entry.id)}>
                  {t.open}
                </button>
                <button className="small-btn" onClick={() => duplicateCharacter(entry.id)}>
                  {t.duplicateBtn}
                </button>
                <button className="small-btn" onClick={() => exportSaved(entry.id)}>
                  {t.exportBtn}
                </button>
                <button className="small-btn danger" onClick={() => deleteCharacter(entry.id)}>
                  {t.delete}
                </button>
              </div>
            </div>
          ))}

          {PRESETS.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: 14 }}>
                {t.presetsTitle}
              </h3>
              {PRESETS.map((preset) => (
                <div className="load-item" key={preset.id}>
                  <div className="load-item-info">
                    <div className="load-item-name">{preset.name}</div>
                    <div className="load-item-meta">
                      {[preset.className, preset.level ? `Lv ${preset.level}` : null].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="load-item-actions">
                    <button className="small-btn accent" onClick={() => loadPreset(preset)}>
                      {t.usePreset}
                    </button>
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
        <IdentityTab
          t={t}
          identity={identity}
          update={update}
          domainOptions={domainOptions}
          subclassOptions={subclassOptions}
        />
      )}

      {tab === "traits" && (
        <TraitsTab
          t={t}
          traits={traits}
          vitals={vitals}
          thresholds={thresholds}
          conditions={char.conditions}
          level={identity.level}
          update={update}
          applyStandardArray={applyStandardArray}
        />
      )}

      {tab === "equip" && (
        <EquipTab t={t} weapons={weapons} armorItem={armorItem} inventory={char.inventory} update={update} />
      )}

      {tab === "abilities" && (
        <AbilitiesTab t={t} char={char} identity={identity} update={update} domainOptions={domainOptions} />
      )}
    </div>
  );
}
