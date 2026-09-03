import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TraitsTab } from "./TraitsTab.js";
import { STR } from "../../i18n.js";
import { initialCharacter } from "../../character.js";

function setup(overrides?: Partial<ReturnType<typeof initialCharacter>>) {
  const char = { ...initialCharacter(), ...overrides };
  const update = vi.fn();
  render(
    <TraitsTab
      t={STR.it}
      traits={char.traits}
      vitals={char.vitals}
      thresholds={char.thresholds}
      level={char.identity.level}
      update={update}
      applyStandardArray={vi.fn()}
    />
  );
  return { update };
}

describe("TraitsTab — calcolo danno subito", () => {
  it("shows no result before any damage is entered", () => {
    setup({ thresholds: { baseMajor: 6, baseSevere: 13 } });
    expect(screen.queryByText(/Segna/)).not.toBeInTheDocument();
  });

  it("marks 1 HP for damage below the major threshold", async () => {
    setup({ thresholds: { baseMajor: 6, baseSevere: 13 } });
    await userEvent.type(screen.getByLabelText(STR.it.incomingDamage), "3");
    expect(screen.getByText(/1 PF \(sotto Major\)/)).toBeInTheDocument();
  });

  it("marks 2 HP for damage between major and severe", async () => {
    setup({ thresholds: { baseMajor: 6, baseSevere: 13 } });
    await userEvent.type(screen.getByLabelText(STR.it.incomingDamage), "8");
    expect(screen.getByText(/2 PF \(Major–Severe\)/)).toBeInTheDocument();
  });

  it("marks 3 HP for damage at or above severe, and flags the massive-damage hint at 2x severe", async () => {
    // effective severe = baseSevere(13) + level(1) = 14; massive threshold = 2x14 = 28.
    setup({ thresholds: { baseMajor: 6, baseSevere: 13 } });
    await userEvent.type(screen.getByLabelText(STR.it.incomingDamage), "30");
    expect(screen.getByText(/3 PF \(Severe o oltre\)/)).toBeInTheDocument();
    expect(screen.getByText(/regola opzionale: segna 4 PF/)).toBeInTheDocument();
  });

  it("factors the character level into the effective thresholds", async () => {
    // baseMajor 6 + level 3 => effective major 9: 7 damage should stay below it.
    const char = initialCharacter();
    char.identity.level = 3;
    char.thresholds = { baseMajor: 6, baseSevere: 13 };
    setup(char);
    await userEvent.type(screen.getByLabelText(STR.it.incomingDamage), "7");
    expect(screen.getByText(/1 PF \(sotto Major\)/)).toBeInTheDocument();
  });
});
