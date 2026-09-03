import { DOMAINS } from "../../data/gameData.js";
import { nextId } from "../../character.js";
import { AutoTextarea, Field, Section } from "../UI.js";
import type { Character, DomainCard, Experience, Identity, UpdateFn } from "../../types.js";
import type { Strings } from "../../i18n.js";

export function AbilitiesTab({
  t,
  char,
  identity,
  update,
  domainOptions,
}: {
  t: Strings;
  char: Character;
  identity: Identity;
  update: UpdateFn;
  domainOptions: string[];
}) {
  const addExperience = () => update("experiences", [...char.experiences, { id: nextId(), name: "", mod: 2 }]);
  const removeExperience = (id: string) => {
    if (!window.confirm(t.confirmRemoveItem)) return;
    update(
      "experiences",
      char.experiences.filter((e) => e.id !== id)
    );
  };
  const editExperience = (id: string, field: keyof Experience, value: string | number) =>
    update(
      "experiences",
      char.experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );

  const addDomainCard = () =>
    update("domainCards", [
      ...char.domainCards,
      { id: nextId(), name: "", domain: domainOptions[0] || DOMAINS[0] || "", level: 1, recall: 0, description: "" },
    ]);
  const removeDomainCard = (id: string) => {
    if (!window.confirm(t.confirmRemoveItem)) return;
    update(
      "domainCards",
      char.domainCards.filter((c) => c.id !== id)
    );
  };
  const editDomainCard = (id: string, field: keyof DomainCard, value: string | number) =>
    update(
      "domainCards",
      char.domainCards.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );

  return (
    <>
      <Section title={t.classFeature} accent="var(--hope)">
        <AutoTextarea value={char.classFeature} onChange={(e) => update("classFeature", e.target.value)} />
      </Section>
      <Section title={t.hopeFeature} accent="var(--hope)">
        <AutoTextarea value={char.hopeFeature} onChange={(e) => update("hopeFeature", e.target.value)} />
      </Section>
      <Section title={t.ancestryFeatures} accent="var(--fear)">
        <Field label={identity.ancestry || "1"} wide>
          <AutoTextarea value={char.ancestryFeature1} onChange={(e) => update("ancestryFeature1", e.target.value)} />
        </Field>
        <Field label={identity.mixed ? identity.ancestry2 || "2" : "2"} wide>
          <AutoTextarea value={char.ancestryFeature2} onChange={(e) => update("ancestryFeature2", e.target.value)} />
        </Field>
      </Section>
      <Section title={t.communityFeature} accent="var(--fear)">
        <AutoTextarea value={char.communityFeature} onChange={(e) => update("communityFeature", e.target.value)} />
      </Section>

      <Section title={t.experiences} accent="var(--hope)">
        {char.experiences.map((exp) => (
          <div className="list-row" key={exp.id}>
            <div className="grid2">
              <Field label={t.expName} wide>
                <input value={exp.name} onChange={(e) => editExperience(exp.id, "name", e.target.value)} />
              </Field>
              <Field label={t.expMod}>
                <input
                  type="number"
                  value={exp.mod}
                  onChange={(e) => editExperience(exp.id, "mod", Number(e.target.value))}
                />
              </Field>
            </div>
            <button className="remove-x" onClick={() => removeExperience(exp.id)} aria-label={t.remove}>
              ×
            </button>
          </div>
        ))}
        <button className="ghost-btn" onClick={addExperience}>
          {t.addExperience}
        </button>
      </Section>

      <Section title={t.domainCards} accent="var(--fear)">
        {char.domainCards.map((card) => (
          <div className="list-row" key={card.id}>
            <div className="grid2">
              <Field label={t.cardName} wide>
                <input value={card.name} onChange={(e) => editDomainCard(card.id, "name", e.target.value)} />
              </Field>
              <Field label={t.cardDomain}>
                <select value={card.domain} onChange={(e) => editDomainCard(card.id, "domain", e.target.value)}>
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t.cardLevel}>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={card.level}
                  onChange={(e) => editDomainCard(card.id, "level", Number(e.target.value))}
                />
              </Field>
              <Field label={t.cardRecall}>
                <input
                  type="number"
                  min="0"
                  value={card.recall}
                  onChange={(e) => editDomainCard(card.id, "recall", Number(e.target.value))}
                />
              </Field>
              <Field label={t.cardDesc} wide>
                <AutoTextarea
                  className="tall"
                  value={card.description}
                  onChange={(e) => editDomainCard(card.id, "description", e.target.value)}
                />
              </Field>
            </div>
            <button className="remove-x" onClick={() => removeDomainCard(card.id)} aria-label={t.remove}>
              ×
            </button>
          </div>
        ))}
        <button className="ghost-btn" onClick={addDomainCard}>
          {t.addCard}
        </button>
      </Section>
    </>
  );
}
