
"use client";

import { useEffect } from "react";

export default function BodyClassController() {
  useEffect(() => {
    const embedded =
      window.self !== window.top ||
      new URLSearchParams(window.location.search).get("embed") === "1";
    document.body.classList.toggle("embedded", embedded);
  }, []);

  return null;
}
