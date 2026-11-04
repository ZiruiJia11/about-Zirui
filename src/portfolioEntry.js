export const portfolioHome = "/?view=2d";

let tourSupported;

export function supports3DTour() {
  if (tourSupported !== undefined) return tourSupported;
  try {
    // The installed Three.js renderer requires WebGL2, not just WebGL1.
    const context = document.createElement("canvas").getContext("webgl2");
    tourSupported = Boolean(context && !context.isContextLost());
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    tourSupported = false;
  }
  return tourSupported;
}

export function resolveEntryPath(path, search, supported) {
  if (path === "/tour" && !supported) return "/";
  if (path === "/" && supported && new URLSearchParams(search).get("view") !== "2d") {
    return "/tour";
  }
  return path;
}
