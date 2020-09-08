import * as i18n from 'i18n';
import { LOCALES_FOLDER } from '@main/constants';

export interface TranslationData {
  [key: string]: number | string | undefined;
}

export function initI18n(): void {
  i18n.configure({
    defaultLocale: 'en',
    directory: LOCALES_FOLDER,
    autoReload: true,
  });
}

export function setLocale(lang: string): void {
  i18n.setLocale(lang);
}

export function t(
  key: string,
  data?: TranslationData
): string | string[] | undefined {
  const catalog = i18n.getCatalog(i18n.getLocale());
  const text: string[] = [];
  let i = 1;
  let ki = `${key}${i}`;

  while (catalog[ki]) {
    const txt = i18n.__mf(`${key}${i}`, data);
    if (txt) {
      text.push(txt);
    }
    ki = `${key}${++i}`;
  }

  if (text.length === 0) {
    return catalog[key]
      ? i18n.__mf(key, (data as unknown) as i18n.Replacements)
      : undefined;
  }
  return text.length === 1 ? text[0] : text;
}

export function isDefined<K extends keyof TranslationData>(
  key: K,
  locale?: string
): boolean {
  return i18n.getCatalog(locale || i18n.getLocale())[key] !== undefined;
}
