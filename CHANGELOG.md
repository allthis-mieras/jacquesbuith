# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

## [Unreleased]

## [2026-10-06] (PR #5)

### Beveiliging
- De preview-cookie is nu ondertekend (HMAC met `SANITY_API_READ_TOKEN`) en verloopt na 12 uur. Voorheen kon iedereen met een zelfgezette cookie `sanity-preview=true` en de header `Sec-Fetch-Dest: iframe` drafts opvragen.
- Responses aan requests met een geldige preview-cookie krijgen `Cache-Control: private, no-store` en `Vary: Cookie, Sec-Fetch-Dest`.

### Opgelost
- Navigeren in de Presentation tool brak Visual Editing: de page transitions (`ClientRouter`) halen pagina's op via `fetch`, zonder `Sec-Fetch-Dest: iframe`. In de preview wordt elke klik nu een volledige page load; voor bezoekers blijven de transitions gelijk.

## [2026-10-06] (PR #4)

### Gewijzigd
- Sanity-afbeeldingen krijgen een `srcset` via de Sanity-CDN (`auto=format`, kwaliteit 75), afgestemd op de layoutbreedte. Retina kiest zelf een grotere variant. Astro’s `/_image` herschaalt die bestanden niet meer.

### Onderhoud
- TypeScript-waarschuwingen opgelost: ongebruikte imports verwijderd en deprecated `ViewTransitions` vervangen door `ClientRouter`.
- `AGENTS.md` beschrijft hoe Sanity-beelden in Astro worden geleverd.

## [2026-10-06] (PR #2)

### Opgelost
- Visual Editing in de Presentation tool maakt weer verbinding: het script wordt geladen zodra de Studio de preview aanzet.

### Gewijzigd
- Visual Editing staat per request aan via een preview-cookie (draft mode) in plaats van via `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`. Bezoekers zien altijd gepubliceerde content.
- Visual Editing en drafts alleen binnen de iframe van de Presentation tool (`Sec-Fetch-Dest: iframe`); in een gewone tab zie je de live site, ook met preview-cookie.
- `/api/preview` valideert het preview-secret van de Studio met `@sanity/preview-url-secret`.
- Perspective `previewDrafts` vervangen door `drafts`.

### Verwijderd
- Env-variabele `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`.

### Onderhoud
- `CHANGELOG.md`, `AGENTS.md` en `CLAUDE.md` toegevoegd.
- README herschreven volgens de standaard-template.
- `.env.example` wijst nu naar het echte Sanity-project (`5j24etwc`, `production`) in plaats van de starter-waarden.
