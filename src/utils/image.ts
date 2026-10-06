import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { sanityClient } from "sanity:client";

const builder = createImageUrlBuilder(sanityClient);

/** Stappen die de layoutbreedte × pixelratio dekken, zonder boven het bronbestand uit te schalen. */
const WIDTH_STEPS = [480, 768, 1080, 1440, 1920, 2400];
const MAX_WIDTH = 2560;
const FALLBACK_WIDTH = 1280;
const QUALITY = 75;

export function urlFor(source: Image) {
  return builder.image(source);
}

export function buildResponsiveImage(
  source: Image | { asset?: unknown } | null | undefined,
  widths: number[] = WIDTH_STEPS,
) {
  if (!source) return null;

  const intrinsic = readDimensions(source);
  const maxWidth = Math.min(intrinsic?.width ?? MAX_WIDTH, MAX_WIDTH);
  const candidates = [
    ...new Set(
      [...widths.filter((width) => width > 0 && width < maxWidth), maxWidth].sort(
        (a, b) => a - b,
      ),
    ),
  ];

  const sources = candidates.map((width) => ({
    width,
    url: urlFor(source as Image)
      .width(width)
      .auto("format")
      .quality(QUALITY)
      .fit("max")
      .url(),
  }));

  const fallback =
    sources.find((item) => item.width >= FALLBACK_WIDTH) ?? sources[sources.length - 1];

  return {
    src: fallback.url,
    srcset: sources.map((item) => `${item.url} ${item.width}w`).join(", "),
    width: intrinsic?.width ?? fallback.width,
    height: intrinsic?.height,
  };
}

function readDimensions(
  source: Image | { asset?: unknown },
): { width: number; height: number } | null {
  const record = source as Image & {
    _id?: string;
    _ref?: string;
    url?: string;
    asset?: {
      _id?: string;
      _ref?: string;
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
    metadata?: { dimensions?: { width?: number; height?: number } };
  };

  const meta = record.metadata?.dimensions ?? record.asset?.metadata?.dimensions;
  if (meta?.width && meta?.height) {
    return { width: meta.width, height: meta.height };
  }

  const match = [record._id, record._ref, record.url, record.asset?._id, record.asset?._ref, record.asset?.url]
    .filter(Boolean)
    .join(" ")
    .match(/(\d+)x(\d+)/);

  if (!match) return null;

  return { width: Number(match[1]), height: Number(match[2]) };
}
