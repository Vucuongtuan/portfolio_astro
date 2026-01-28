import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRoute(lang: string, path: string) {
  if (lang === defaultLang || path === '/') {
    // Handle home page specifically if needed, but usually /en/ is handled by folder structure
    // If path is '/', return '/' for default, '/en/' for en.
    if (path === '/') return lang === defaultLang ? '/' : `/${lang}/`;
  }
  // Remove trailing slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath}`;
}
