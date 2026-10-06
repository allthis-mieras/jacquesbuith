// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import netlify from '@astrojs/netlify';
import icon from "astro-icon";


const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_USE_CDN,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");


export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['styled-components'],
    },
    optimizeDeps: {
      include: ['styled-components'],
      exclude: [
        'PostMessageRefreshMutations',
        'PostMessagePreviewSnapshots',
        'PresentationToolGrantsCheck',
        'refractor',
      ],
    },
  },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: "2023-05-31",
      studioBasePath: "/admin",
      useCdn: PUBLIC_SANITY_USE_CDN === "true",
      stega: {
        studioUrl: "/admin",
      },
    }),
    react(),
    icon()
  ],
  output: 'server',
  adapter: netlify({
    imageCDN: false,
  }),
  image: {
    domains: ['sanity.io'],
    remotePatterns: [{
    protocol: 'https',
    hostname: '**.sanity.io',
  }],
  },
});
