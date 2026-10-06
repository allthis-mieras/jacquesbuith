import { defineMiddleware } from "astro:middleware";
import { PREVIEW_COOKIE, runWithVisualEditing } from "./utils/visual-editing";

export const onRequest = defineMiddleware((context, next) => {
  const visualEditing = context.cookies.get(PREVIEW_COOKIE)?.value === "true";
  context.locals.visualEditing = visualEditing;

  // Zo kan loadQuery() de status lezen zonder dat elke page of component
  // hem moet doorgeven.
  return runWithVisualEditing(visualEditing, next);
});
