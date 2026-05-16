/**
 * Legacy Docusaurus → new app redirect.
 *
 * The Docusaurus app is KEPT in the repo for reference/rollback, but the
 * deployed site only redirects: every path bounces to the new Fumadocs app
 * at https://ai-hub.emersonbraun.dev, preserving the path and folding
 * unsupported locales (es/fr/de/zh-Hans) to EN while keeping pt-BR.
 *
 * Runs client-side only. Skips localhost so local Docusaurus dev still works.
 */
const NEW_ORIGIN = 'https://ai-hub.emersonbraun.dev';
const BASE = '/ai-summary-hub';
const KEEP_LOCALES = {'pt-BR': 1};
const DROP_LOCALES = {es: 1, fr: 1, de: 1, 'zh-Hans': 1};

if (typeof window !== 'undefined') {
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
  if (!isLocal) {
    let path = window.location.pathname || '/';
    if (path.indexOf(BASE) === 0) path = path.slice(BASE.length);
    let dest;
    if (path === '' || path === '/') {
      dest = NEW_ORIGIN + '/';
    } else {
      const parts = path.split('/').filter(Boolean);
      if (DROP_LOCALES[parts[0]]) parts.shift();
      else if (KEEP_LOCALES[parts[0]]) {
        /* keep pt-BR prefix */
      }
      dest =
        NEW_ORIGIN +
        '/' +
        parts.join('/') +
        window.location.search +
        window.location.hash;
    }
    window.location.replace(dest);
  }
}
