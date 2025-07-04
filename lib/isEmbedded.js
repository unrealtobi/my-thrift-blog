// lib/isEmbedded.js
export const isEmbedded = () => {
  // During SSR there is no window
  if (typeof window === "undefined") return false;

  try {
    // True when running inside any <iframe>, even cross-origin
    if (window.self !== window.top) return true;
  } catch {
    /* Comparing window.self with window.top never throws.
       Errors only happen if you try to read window.top.location, which we don't. */
  }

  // Fallback: explicit flag, e.g. https://example.com/page?embed=1
  return new URLSearchParams(window.location.search).get("embed") === "1";
};
