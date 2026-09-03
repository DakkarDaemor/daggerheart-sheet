# Daggerheart — Scheda personaggio (IT/EN)

App web statica, autosufficiente, per gestire la scheda personaggio di
[Daggerheart](https://www.daggerheart.com) (Darrington Press). Interfaccia
in italiano/inglese; salvataggio locale nel browser (`localStorage`),
multi-personaggio, calcolatore soglie di danno.

I nomi di classi, sottoclassi, domini, ancestrie e comunità restano in
inglese: non esiste una localizzazione italiana ufficiale del gioco.

## Uso

Basta aprire `index.html` in un browser — anche offline (tranne i font
Google Fonts, che richiedono internet la prima volta; in assenza cadono
su un font di sistema).

## Sviluppo

Il sorgente React/TypeScript è in `src/` (entry point: `src/entry.tsx`).
`index.html` è già compilato e pronto all'uso: non serve alcuna build per
usarlo così com'è.

Per modificarlo:

```bash
npm install
# modifica i file in src/
npm run build   # rigenera index.html da src/entry.tsx + src/template.html
```

`npm run build` impacchetta React/ReactDOM e il componente in un unico
bundle (esbuild) e lo inietta in `src/template.html`, producendo un
`index.html` singolo e autosufficiente — nessuna CDN esterna a runtime,
a parte i font.

Altri comandi utili:

```bash
npm run typecheck    # controllo tipi TypeScript (tsc --noEmit)
npm run lint          # ESLint
npm run lint:fix       # ESLint con fix automatico
npm run format         # riformatta con Prettier
npm run format:check   # verifica la formattazione senza modificare i file
npm run test            # esegue la suite di test (Vitest)
npm run test:watch      # test in watch mode
npm run verify           # typecheck + lint + format:check + test + build
```

`npm run verify` è la stessa sequenza eseguita in CI (GitHub Actions,
vedi `.github/workflows/ci.yml`) su ogni push/PR.

### Aggiungere personaggi precompilati

In `src/data/presets.ts` aggiungi voci all'array `PRESETS` così:

```js
const PRESETS = [
  {
    id: "preset-thorne",
    name: "Thorne",
    className: "Guardian",
    level: 3,
    data: {
      identity: { name: "Thorne", ancestry: "Dwarf", community: "Ridgeborne",
        className: "Guardian", subclass: "Stalwart", level: 3, proficiency: 2 },
      traits: { agility: 0, strength: 2, finesse: 0, instinct: 1, presence: -1, knowledge: 0 },
      // ... solo i campi che vuoi precompilare: il resto parte dallo scheletro vuoto
    },
  },
];
```

Poi `npm run build` e ricommit di `index.html`. I preset compaiono nel
pannello "Carica" → "Personaggi precompilati", con un pulsante "Usa come
base" che ne crea una copia locale modificabile (l'originale nel codice
resta intatto).

## Pubblicarla su GitHub Pages

1. Crea un repository su GitHub e pusha questo contenuto sul branch `main`.
2. Impostazioni del repo → **Pages** → Source: **Deploy from a branch** →
   Branch: `main`, cartella `/ (root)` → Save.
3. Dopo un minuto la pagina è live su
   `https://<tuo-utente>.github.io/<nome-repo>/`.

Da lì in poi, ogni volta che aggiorni `index.html` e fai push su `main`,
GitHub Pages ripubblica automaticamente.

## Licenza e attribuzione

Contenuti di gioco (nomi di classi, domini, ancestrie, comunità, regole
delle soglie di danno) tratti dal *Daggerheart System Reference Document*,
© Darrington Press, distribuiti secondo la
[Darrington Press Community Gaming License (DPCGL)](https://www.daggerheart.com).
Questo è un progetto fan-made non ufficiale, non affiliato a Darrington
Press / Critical Role. Il codice di questa app è tuo: fanne quello che
vuoi.
