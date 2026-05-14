import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  languages: ['en', 'pt-BR'],
  defaultLanguage: 'en',
  // EN stays at /docs/... (no /en prefix); pt-BR uses /pt-BR/docs/...
  hideLocale: 'default-locale',
  parser: 'dir',
  fallbackLanguage: 'en',
});
