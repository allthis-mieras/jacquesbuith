# AGENTS.md: jacquesbuith

Instructies voor AI-agents (Claude Code, Cursor, Codex) en ontwikkelaars die aan dit project werken.
Lees eerst `README.md` voor context en `CHANGELOG.md` voor recente wijzigingen.

## Project
- Klant: Jacques Buith · Bedrijf: All This · SLA: TODO
- Stack: Astro 5, Sanity 4 (Studio op `/admin`), Netlify SSR, Node 22 (zie `.nvmrc`)

## Werkwijze
- Werk nooit direct op `main`. Branch → PR → deploy preview → merge.
- Branchnamen: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Commit nooit `.env`-bestanden of tokens. Nieuwe variabelen: naam toevoegen aan `.env.example` en de README-tabel.
- Variabelen met `PUBLIC_` komen in de browser terecht: nooit voor tokens.

## Documentatie bijhouden (verplicht)
- Elke wijziging die je commit: voeg een regel toe onder `## [Unreleased]` in `CHANGELOG.md`.
- Bij een merge naar `main`: zet `[Unreleased]` om naar een datumkop.
- Verandert setup, env, stack of deploy? Werk `README.md` bij.

## Conventies
- Moderne CSS: custom properties, OKLCH-kleuren, logical properties, container queries waar zinvol.
- Toegankelijkheid: WCAG 2.2 AA. Semantische HTML, focus-states, `prefers-reduced-motion` respecteren.
- AVG: geen tracking of third-party embeds zonder consent.

## Projectspecifiek
- Visual Editing werkt via draft mode: de Presentation tool roept `/api/preview` aan, dat het secret valideert en de cookie `sanity-preview` zet. `src/middleware.ts` zet Visual Editing alleen aan als die cookie er is én de request uit een iframe komt (`Sec-Fetch-Dest: iframe`); `loadQuery()` en `Layout.astro` gebruiken die status. Haal content altijd op via `loadQuery()`.
- `SANITY_API_READ_TOKEN` (Viewer) is nodig op Netlify, anders werkt de preview niet.
