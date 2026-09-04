import { useState } from "react";
import { TRAITS_BY_LANG } from "../../data/gameData.js";
import { Field, PipTrack, Section } from "../UI.js";
import type { Conditions, Lang, Thresholds, Traits, UpdateFn, Vitals } from "../../types.js";
import type { Strings } from "../../i18n.js";

export function TraitsTab({
  t,
  lang,
  traits,
  vitals,
  thresholds,
  conditions,
  level,
  update,
  applyStandardArray,
}: {
  t: Strings;
  lang: Lang;
  traits: Traits;
  vitals: Vitals;
  thresholds: Thresholds;
  conditions: Conditions;
  level: number;
  update: UpdateFn;
  applyStandardArray: () => void;
}) {
  const TRAITS = TRAITS_BY_LANG[lang];
  const effMajor = (Number(thresholds.baseMajor) || 0) + (Number(level) || 0);
  const effSevere = (Number(thresholds.baseSevere) || 0) + (Number(level) || 0);

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

  return (
    <>
      <Section title={t.traits} accent="var(--hope)">
        <div className="grid2" style={{ marginBottom: 8 }}>
          {TRAITS.map((tr) => (
            <div className="trait-card" key={tr.key}>
              <div className="trait-head">
                <span className="trait-name">{tr.label}</span>
                <input
                  className="trait-mod-input"
                  type="number"
                  value={traits[tr.key]}
                  onChange={(e) => update(`traits.${tr.key}`, Number(e.target.value))}
                />
              </div>
              <div className="trait-subs">
                {tr.sub.map((s) => (
                  <span className="trait-sub" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="ghost-btn" onClick={applyStandardArray}>
          {t.standardArrayBtn}
        </button>
      </Section>

      <Section title={t.vitals} accent="var(--fear)">
        <div className="grid2" style={{ marginBottom: 12 }}>
          <Field label={t.evasion}>
            <input
              type="number"
              value={vitals.evasion}
              onChange={(e) => update("vitals.evasion", Number(e.target.value))}
            />
          </Field>
          <Field label={t.armorScore}>
            <input
              type="number"
              value={vitals.armorScore}
              onChange={(e) => update("vitals.armorScore", Number(e.target.value))}
            />
          </Field>
        </div>

        <div className="vital-block">
          <div className="vital-head">
            <span className="vital-label">{t.hp}</span>
            <span className="vital-max">
              {t.max}{" "}
              <input
                type="number"
                value={vitals.hpMax}
                onChange={(e) => update("vitals.hpMax", Number(e.target.value))}
              />
            </span>
          </div>
          <PipTrack
            max={vitals.hpMax}
            marked={vitals.hpMarked}
            tone="var(--danger)"
            onToggle={(i) => update("vitals.hpMarked", i < vitals.hpMarked ? i : i + 1)}
          />
        </div>

        <div className="vital-block">
          <div className="vital-head">
            <span className="vital-label">{t.stress}</span>
            <span className="vital-max">
              {t.max}{" "}
              <input
                type="number"
                value={vitals.stressMax}
                onChange={(e) => update("vitals.stressMax", Number(e.target.value))}
              />
            </span>
          </div>
          <PipTrack
            max={vitals.stressMax}
            marked={vitals.stressMarked}
            tone="var(--fear)"
            onToggle={(i) => update("vitals.stressMarked", i < vitals.stressMarked ? i : i + 1)}
          />
        </div>

        <div className="vital-block">
          <div className="vital-head">
            <span className="vital-label">{t.hope}</span>
            <span className="vital-max">
              {t.max}{" "}
              <input
                type="number"
                value={vitals.hopeMax}
                onChange={(e) => update("vitals.hopeMax", Number(e.target.value))}
              />
            </span>
          </div>
          <PipTrack
            max={vitals.hopeMax}
            marked={vitals.hopeMarked}
            tone="var(--hope)"
            onToggle={(i) => update("vitals.hopeMarked", i < vitals.hopeMarked ? i : i + 1)}
          />
        </div>

        <div className="vital-block">
          <div className="vital-head">
            <span className="vital-label">{t.armorSlots}</span>
            <span className="vital-max">
              {t.max}{" "}
              <input
                type="number"
                value={vitals.armorSlotsMax}
                onChange={(e) => update("vitals.armorSlotsMax", Number(e.target.value))}
              />
            </span>
          </div>
          <PipTrack
            max={vitals.armorSlotsMax}
            marked={vitals.armorSlotsMarked}
            tone="var(--text-dim)"
            onToggle={(i) => update("vitals.armorSlotsMarked", i < vitals.armorSlotsMarked ? i : i + 1)}
          />
        </div>

        <div className="vital-block">
          <span className="vital-label">{t.gold}</span>
          <div className="gold-row" style={{ marginTop: 6 }}>
            <div className="gold-col">
              <span className="field-label">{t.handfuls}</span>
              <input
                type="number"
                min="0"
                max="9"
                value={vitals.goldHandfuls}
                onChange={(e) => update("vitals.goldHandfuls", Number(e.target.value))}
              />
            </div>
            <div className="gold-col">
              <span className="field-label">{t.bags}</span>
              <input
                type="number"
                min="0"
                max="9"
                value={vitals.goldBags}
                onChange={(e) => update("vitals.goldBags", Number(e.target.value))}
              />
            </div>
            <div className="gold-col">
              <span className="field-label">{t.chest}</span>
              <input
                type="number"
                min="0"
                value={vitals.goldChest}
                onChange={(e) => update("vitals.goldChest", Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title={t.conditions} accent="var(--fear)">
        <div className="condition-row">
          {(
            [
              ["hidden", t.conditionHidden],
              ["restrained", t.conditionRestrained],
              ["vulnerable", t.conditionVulnerable],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`tab-btn ${conditions[key] ? "active" : ""}`}
              onClick={() => update(`conditions.${key}`, !conditions[key])}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title={t.thresholds} accent="var(--fear)">
        <div className="grid2">
          <Field label={t.baseMajor}>
            <input
              type="number"
              value={thresholds.baseMajor}
              onChange={(e) => update("thresholds.baseMajor", Number(e.target.value))}
            />
          </Field>
          <Field label={t.baseSevere}>
            <input
              type="number"
              value={thresholds.baseSevere}
              onChange={(e) => update("thresholds.baseSevere", Number(e.target.value))}
            />
          </Field>
        </div>
        <div className="threshold-row">
          <div className="threshold-badge major">
            <span className="field-label">{t.effMajor}</span>
            <b>{effMajor}</b>
          </div>
          <div className="threshold-badge severe">
            <span className="field-label">{t.effSevere}</span>
            <b>{effSevere}</b>
          </div>
        </div>
        <p className="hint">{t.thresholdHint}</p>

        <h3 className="section-title" style={{ marginTop: 16 }}>
          {t.dmgCalcTitle}
        </h3>
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
  );
}
