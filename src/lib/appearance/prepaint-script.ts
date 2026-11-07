import {
  SCHEME_CSS_KEY,
  SCHEME_KEY,
  SCHEME_STYLE_ID,
  THEME_KEY,
} from "./scheme-keys"

// Mirrors DEFAULT_SCHEME in schemes.ts (kept out so vite.config.ts doesn't load the color math).
const DEFAULT_SCHEME = "amber"

/**
 * Runs inline in <head> (vite.config.ts puts it into index.html), before the
 * first paint: it sets the light or dark class and restores a saved color
 * scheme's stylesheet, so nothing flashes white or amber first.
 */
export const PREPAINT_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY
)})||"system";var k=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);d.classList.add(k?"dark":"light");var s=localStorage.getItem(${JSON.stringify(
  SCHEME_KEY
)});if(!s||s===${JSON.stringify(
  DEFAULT_SCHEME
)})return;var c=localStorage.getItem(${JSON.stringify(
  SCHEME_CSS_KEY
)});if(!c)return;var e=document.createElement("style");e.id=${JSON.stringify(
  SCHEME_STYLE_ID
)};e.textContent=c;document.head.appendChild(e);d.setAttribute("data-scheme",s)}catch(e){}})();`
