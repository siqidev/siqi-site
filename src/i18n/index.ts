import { en } from "./en";
import { ja } from "./ja";

export type Locale = "en" | "ja";

export const locales: Locale[] = ["en", "ja"];

export const defaultLocale: Locale = "en";

export type TranslationKey = keyof typeof ja;

const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  ja,
};

/**
 * ページ言語に応じた翻訳関数 t(key) を返す。
 * client/src/contexts/LanguageContext.tsx の useLanguage().t 相当。
 */
export function useTranslations(locale: Locale) {
  const dictionary = dictionaries[locale];
  return (key: TranslationKey): string => dictionary[key];
}

/** 指定ロケールでのパスを組み立てる（例: getLocalizedPath("ja", "/avatarui") -> "/ja/avatarui"） */
export function getLocalizedPath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}
