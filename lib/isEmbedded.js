export const isEmbedded = () => {
  const embedded =
    typeof window !== "undefined" &&
    (window.self !== window.top ||
     new URLSearchParams(window.location.search).get("embed") === "1");
  console.log("isEmbedded?", embedded);
  return embedded;
};
