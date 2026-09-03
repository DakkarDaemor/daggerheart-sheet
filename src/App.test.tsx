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
});
