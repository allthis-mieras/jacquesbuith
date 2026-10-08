# jacquesbuith.netlify.app

> Persoonlijke website voor Jacques Buith: profiel, posts en media, beheerd in Sanity met Visual Editing.

| | |
|---|---|
| **Klant** | Jacques Buith (TODO: contactpersoon) |
| **Bedrijf** | All This |
| **Status** | Live op netlify.app (TODO: eigen domein) |
| **SLA** | TODO |
| **Live** | https://jacquesbuith.netlify.app |
| **Netlify** | team All This, site `jacquesbuith` |
| **CMS** | Sanity project `5j24etwc`, dataset `production`, Studio https://jacquesbuith.netlify.app/admin |
| **Repo** | [github.com/astrobuildclub/jacquesbuith](https://github.com/astrobuildclub/jacquesbuith) |
| **Notion** | TODO |

## Stack

- Astro 5 · Sanity 4 (Studio in de site op `/admin`) · Node 22 (`.nvmrc`) · SSR (`output: 'server'`, `@astrojs/netlify`)
- Styling: SCSS met `utopia-core-scss` (fluid type en space) · Fonts: Inter, PT Serif, IBM Plex Mono (Google Fonts)
- Slider: Swiper · Animatie: geen
- Consent: geen · Hosting: Netlify

## Lokaal starten

```bash
nvm use
npm install
cp .env.example .env   # vul de waarden in, zie tabel
npm run dev            # http://localhost:4321, Studio op /admin
```

Overige scripts: `npm run build` (incl. `astro check` en `tsc`), `npm run preview`.

### Environment-variabelen

| Naam | Waarvoor | Waar te vinden |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Sanity project (`5j24etwc`) | sanity.io/manage |
| `PUBLIC_SANITY_DATASET` | Dataset (`production`) | sanity.io/manage |
| `PUBLIC_SANITY_USE_CDN` | Sanity API-CDN gebruiken (`true`/`false`) | n.v.t. |
| `SANITY_API_READ_TOKEN` | Drafts en Visual Editing (geheim, rol Viewer) | sanity.io/manage → API → Tokens |

Waarden staan nooit in git. Productiewaarden: Netlify → Site configuration → Environment variables (let op deploy contexts: ook voor Deploy previews zetten).

## Structuur

```
schema/              Sanity-schema's
  contentTypes/      post, page, settings, siteSettings
  sectionBlocks/     text, image, video, quote, textImage
  elements/          blockContent, cta
src/
  components/        Astro-componenten, sectionBlocks/ per blok
  layouts/           Layout.astro (incl. <VisualEditing>)
  pages/             Routes: /, /about, /media, /post/[slug], api/preview
  utils/             Datalaag: load-query.ts, sanity.ts (queries), resolve.ts (Presentation)
  middleware.ts      Zet Visual Editing per request aan of uit
  assets/scss/       Tokens, base, utopia
sanity.config.ts     Studio-config (structure, vision, presentation)
```

## Content en CMS

- Content types: **Posts**, **Pages** (homepage, about, met section blocks) en **Settings** (singleton).
- De klant bewerkt alles in de Studio op `/admin`.
- Visual Editing: open in de Studio de Presentation tool. Die roept `/api/preview` aan met een tijdelijk secret; is dat geldig, dan zet de site een preview-cookie. Alleen binnen de iframe van de Studio zie je dan drafts en klikbare overlays; bezoekers en gewone tabs zien altijd gepubliceerde content.

## Privacy, toegankelijkheid en SEO

- Consent: geen consentoplossing en geen tracking gevonden. `VideoBlock` is nog leeg; bij embeds (YouTube/Vimeo) is consent nodig.
- WCAG 2.2 AA: TODO, nog niet getoetst.
- SEO: meta en Open Graph via `SiteMeta.astro`. Geen sitemap, robots.txt, JSON-LD of `llms.txt`.

## Deploy

### Branches

| Branch | Deploy | URL |
|---|---|---|
| `main` | Productie | https://jacquesbuith.netlify.app |
| `staging` | Branch deploy (goedgekeurde features, nog niet live) | https://staging--jacquesbuith.netlify.app |
| PR's | Deploy preview | link in de PR |

Features gaan via een PR naar `staging`. Naar `main` alleen gebundelde releases (PR `staging → main`) en hotfixes. Commits met alleen documentatie (`*.md`, `.github/`) starten geen build. Zie `~/Code/_standards/DEPLOY.md`.

## Bekende issues en afspraken

- `og:url` valt terug op `https://mier.as/…` omdat `site` niet in `astro.config.mjs` staat.
- Zonder `SANITY_API_READ_TOKEN` op Netlify werkt Visual Editing niet.
- `@astrojs/vercel` staat nog in de dependencies maar wordt niet gebruikt.

---

Eigenaar: All This · Wat er gedaan is: zie [`CHANGELOG.md`](CHANGELOG.md) · Werkafspraken voor ontwikkelaars en AI-agents: [`AGENTS.md`](AGENTS.md)
