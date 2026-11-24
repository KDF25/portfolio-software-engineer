import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	type TSupportedLocale
} from "@/shared/config";

/** Путь главной для языка: `/` у языка по умолчанию, `/ru` у остальных */
export const getLocalePath = (locale: TSupportedLocale) =>
	locale === DEFAULT_LOCALE ? "/" : `/${locale}`;

/** hreflang-карта для alternates и sitemap */
export const getLocaleAlternates = (base = "") => ({
	...Object.fromEntries(
		SUPPORTED_LOCALES.map((locale) => [
			locale,
			`${base}${getLocalePath(locale)}`
		])
	),
	"x-default": `${base}${getLocalePath(DEFAULT_LOCALE)}`
});
