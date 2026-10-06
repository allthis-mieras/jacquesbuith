# Changelog

Alle noemenswaardige wijzigingen aan dit project. Nieuwste bovenaan.
Format gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.1.0/).

Categorieën: **Toegevoegd**, **Gewijzigd**, **Opgelost**, **Verwijderd**, **Beveiliging**, **Onderhoud**.

## [Unreleased]

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
