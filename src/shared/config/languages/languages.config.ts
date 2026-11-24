export const SUPPORTED_LOCALES = ["en", "ru"] as const;

export type TSupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: TSupportedLocale = "en";

/** Подписи языков не переводятся: каждый язык назван сам на себе */
export const LOCALE_LABELS: Record<TSupportedLocale, string> = {
	en: "English",
	ru: "Русский"
};

/** Формат языка для og:locale (язык_РЕГИОН) */
export const OG_LOCALES: Record<TSupportedLocale, string> = {
	en: "en_US",
	ru: "ru_RU"
};
