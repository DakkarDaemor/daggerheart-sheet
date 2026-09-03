import { AutoTextarea, Field, Section } from "../UI.js";
import type { ArmorItem, UpdateFn, Weapons } from "../../types.js";
import type { Strings } from "../../i18n.js";

export function EquipTab({
  t,
  weapons,
  armorItem,
  inventory,
  update,
}: {
  t: Strings;
  weapons: Weapons;
  armorItem: ArmorItem;
  inventory: string;
  update: UpdateFn;
}) {
  return (
    <>
      <Section title={t.armorEquipped} accent="var(--fear)">
        <div className="grid2">
          <Field label={t.wName} wide>
            <input value={armorItem.name} onChange={(e) => update("armorItem.name", e.target.value)} />
          </Field>
          <Field label={t.armorScore}>
            <input
              type="number"
              value={armorItem.baseScore}
              onChange={(e) => update("armorItem.baseScore", Number(e.target.value))}
            />
          </Field>
          <Field label={t.baseMajor}>
            <input
              type="number"
              value={armorItem.baseMajor}
              onChange={(e) => update("armorItem.baseMajor", Number(e.target.value))}
            />
          </Field>
          <Field label={t.baseSevere}>
            <input
              type="number"
              value={armorItem.baseSevere}
              onChange={(e) => update("armorItem.baseSevere", Number(e.target.value))}
            />
          </Field>
        </div>
      </Section>

      <Section title={t.weapons} accent="var(--hope)">
        {(["primary", "secondary"] as const).map((slot) => (
          <div className="weapon-block" key={slot}>
            <div className="weapon-title">{slot === "primary" ? t.primaryWeapon : t.secondaryWeapon}</div>
            <div className="grid2">
              <Field label={t.wName} wide>
                <input value={weapons[slot].name} onChange={(e) => update(`weapons.${slot}.name`, e.target.value)} />
              </Field>
              <Field label={t.wTrait}>
                <input value={weapons[slot].trait} onChange={(e) => update(`weapons.${slot}.trait`, e.target.value)} />
              </Field>
              <Field label={t.wRange}>
                <input value={weapons[slot].range} onChange={(e) => update(`weapons.${slot}.range`, e.target.value)} />
              </Field>
              <Field label={t.wDamage} wide>
                <input
                  value={weapons[slot].damage}
                  onChange={(e) => update(`weapons.${slot}.damage`, e.target.value)}
                />
              </Field>
              <Field label={t.wFeature} wide>
                <AutoTextarea
                  value={weapons[slot].feature}
                  onChange={(e) => update(`weapons.${slot}.feature`, e.target.value)}
                />
              </Field>
            </div>
          </div>
        ))}
      </Section>

      <Section title={t.inventory} accent="var(--text-dim)">
        <AutoTextarea
          placeholder={t.inventoryPh}
          value={inventory}
          onChange={(e) => update("inventory", e.target.value)}
        />
      </Section>
    </>
  );
}
