import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DaggerheartSheet } from "./App.js";
import { PRESETS } from "./data/presets.js";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe("DaggerheartSheet", () => {
  it("renders the identity tab by default", () => {
    render(<DaggerheartSheet />);
    expect(screen.getByRole("heading", { name: "Daggerheart" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("switches tabs on click", async () => {
    render(<DaggerheartSheet />);
    await userEvent.click(screen.getByRole("button", { name: "Equipaggiamento" }));
    expect(screen.getByText("Armatura equipaggiata")).toBeInTheDocument();
  });

  it("loads a preset and populates fields across tabs", async () => {
    render(<DaggerheartSheet />);
    const preset = PRESETS[0]!;

    await userEvent.click(screen.getByRole("button", { name: "Carica" }));
    const presetRow = screen.getByText(preset.name).closest(".load-item") as HTMLElement;
    await userEvent.click(within(presetRow).getByRole("button", { name: "Usa come base" }));

    expect(await screen.findByDisplayValue(preset.data.identity!.name!)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Abilità & Domini" }));
    expect(screen.getByDisplayValue(preset.data.domainCards![0]!.name)).toBeInTheDocument();
  });

  it("imports a character from a JSON file (device-to-device transfer)", async () => {
    render(<DaggerheartSheet />);
    const exported = { identity: { name: "Imported Hero", className: "Wizard" } };
    const file = new File([JSON.stringify(exported)], "daggerheart-imported-hero.json", {
      type: "application/json",
    });

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(fileInput, file);

    expect(await screen.findByDisplayValue("Imported Hero")).toBeInTheDocument();
  });

  it("rejects a JSON file that isn't a character sheet", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<DaggerheartSheet />);
    const file = new File([JSON.stringify({ foo: "bar" })], "not-a-character.json", { type: "application/json" });

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(fileInput, file);

    expect(alertSpy).toHaveBeenCalledWith("Il file scelto non è una scheda personaggio Daggerheart valida.");
    alertSpy.mockRestore();
  });

  it("toggles an active condition", async () => {
    render(<DaggerheartSheet />);
    await userEvent.click(screen.getByRole("button", { name: "Tratti & Vitali" }));

    const vulnerableBtn = screen.getByRole("button", { name: "Vulnerabile" });
    expect(vulnerableBtn).not.toHaveClass("active");

    await userEvent.click(vulnerableBtn);
    expect(vulnerableBtn).toHaveClass("active");

    await userEvent.click(vulnerableBtn);
    expect(vulnerableBtn).not.toHaveClass("active");
  });

  it("adds domain cards to Loadout and Vault separately, and moves a card between them", async () => {
    render(<DaggerheartSheet />);
    await userEvent.click(screen.getByRole("button", { name: "Abilità & Domini" }));
    const addButtons = () => screen.getAllByRole("button", { name: "+ Aggiungi carta" });

    await userEvent.click(addButtons()[0]!); // + Loadout
    expect(screen.getByRole("button", { name: "→ Vault" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "→ Loadout" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "→ Vault" }));
    expect(screen.getByRole("button", { name: "→ Loadout" })).toBeInTheDocument();

    await userEvent.click(addButtons()[1]!); // + Vault
    expect(screen.getAllByRole("button", { name: "→ Loadout" })).toHaveLength(2);
  });

  it("duplicates a saved character without touching the one currently open", async () => {
    render(<DaggerheartSheet />);
    await userEvent.type(screen.getByLabelText("Nome"), "Original Hero");
    await userEvent.click(screen.getByRole("button", { name: "Salva" }));
    await userEvent.click(screen.getByRole("button", { name: "Carica" }));

    const row = screen.getByText("Original Hero").closest(".load-item") as HTMLElement;
    await userEvent.click(within(row).getByRole("button", { name: "Duplica" }));

    expect(await screen.findByText("Original Hero (copia)")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Original Hero")).toBeInTheDocument();
  });
});
