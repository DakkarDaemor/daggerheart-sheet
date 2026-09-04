import {
  ANCESTRIES,
  COMMUNITIES,
  CLASSES,
  classLabel,
  domainLabel,
  subclassLabel,
  ancestryLabel,
  communityLabel,
} from "../../data/gameData.js";
import { Field, Section } from "../UI.js";
import type { Identity, Lang, UpdateFn } from "../../types.js";
import type { Strings } from "../../i18n.js";

export function IdentityTab({
  t,
  lang,
  identity,
  update,
  domainOptions,
  subclassOptions,
}: {
  t: Strings;
  lang: Lang;
  identity: Identity;
  update: UpdateFn;
  domainOptions: string[];
  subclassOptions: string[];
}) {
  return (
    <Section accent="var(--hope)">
      <div className="grid2">
        <Field label={t.name}>
          <input value={identity.name} onChange={(e) => update("identity.name", e.target.value)} />
        </Field>
        <Field label={t.pronouns}>
          <input value={identity.pronouns} onChange={(e) => update("identity.pronouns", e.target.value)} />
        </Field>

        <Field label={t.ancestry}>
          <select value={identity.ancestry} onChange={(e) => update("identity.ancestry", e.target.value)}>
            <option value="">—</option>
            {ANCESTRIES.map((a) => (
              <option key={a} value={a}>
                {ancestryLabel(a, lang)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.community}>
          <select value={identity.community} onChange={(e) => update("identity.community", e.target.value)}>
            <option value="">—</option>
            {COMMUNITIES.map((c) => (
              <option key={c} value={c}>
                {communityLabel(c, lang)}
              </option>
            ))}
          </select>
        </Field>

        <label className="field field-wide" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            style={{ width: "auto" }}
            checked={identity.mixed}
            onChange={(e) => update("identity.mixed", e.target.checked)}
          />
          <span className="field-label" style={{ margin: 0 }}>
            {t.mixed}
          </span>
        </label>
        {identity.mixed && (
          <Field label={t.secondAncestry} wide>
            <select value={identity.ancestry2} onChange={(e) => update("identity.ancestry2", e.target.value)}>
              <option value="">—</option>
              {ANCESTRIES.map((a) => (
                <option key={a} value={a}>
                  {ancestryLabel(a, lang)}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label={t.className}>
          <select value={identity.className} onChange={(e) => update("identity.className", e.target.value)}>
            <option value="">—</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {classLabel(c, lang)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.subclass}>
          <select
            value={identity.subclass}
            onChange={(e) => update("identity.subclass", e.target.value)}
            disabled={!identity.className}
          >
            <option value="">—</option>
            {subclassOptions.map((s) => (
              <option key={s} value={s}>
                {subclassLabel(s, lang)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.level}>
          <input
            type="number"
            min="1"
            max="10"
            value={identity.level}
            onChange={(e) => update("identity.level", Number(e.target.value))}
          />
        </Field>
        <Field label={t.proficiency}>
          <input
            type="number"
            min="0"
            value={identity.proficiency}
            onChange={(e) => update("identity.proficiency", Number(e.target.value))}
          />
        </Field>
      </div>

      {identity.className && (
        <p className="hint">
          {t.domainAccess}:{" "}
          <b style={{ color: "var(--text)" }}>{domainOptions.map((d) => domainLabel(d, lang)).join(" · ")}</b>
        </p>
      )}
    </Section>
  );
}
