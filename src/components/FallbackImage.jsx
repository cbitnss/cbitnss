"use client";
import React, { useEffect, useState } from "react";

// Tries a list of candidate URLs (original + common alternatives) when an image fails to load.
export default function FallbackImage({ src, alt = "", className, style, ...rest }) {
  const [candidates, setCandidates] = useState([src]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Generate candidate list from the incoming src
    const generate = (s) => {
      if (!s) return [s];
      const m = s.match(/^(.*)\.([^.]+)$/);
      if (!m) return [s];
      const base = m[1];
      const ext = m[2].toLowerCase();

      // prefer common browser-friendly formats after the original
      const fallbacks = ["jpg", "jpeg", "png", "webp", "heif", "heic"];

      const list = [];

      // original exact
      list.push(s);

      // try same base with common extensions
      for (const f of fallbacks) {
        const cand = `${base}.${f}`;
        if (!list.includes(cand)) list.push(cand);
      }

      // also try lowercase base variants (some files in public use different casing)
      const baseLower = base.toLowerCase();
      if (baseLower !== base) {
        // original lowercase with original ext
        const origLower = `${baseLower}.${ext}`;
        if (!list.includes(origLower)) list.push(origLower);
        for (const f of fallbacks) {
          const cand = `${baseLower}.${f}`;
          if (!list.includes(cand)) list.push(cand);
        }
      }

      return list;
    };

    setCandidates(generate(src));
    setIndex(0);
  }, [src]);

  // Move to next candidate on error
  const handleError = () => {
    setIndex((i) => (i + 1 < candidates.length ? i + 1 : i));
  };

  const current = candidates[index];

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={current}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
}
