import type { MetadataRoute } from "next";

import { SITE_URL, SUPPORTED_LOCALES } from "@/shared/config";
import { getLocaleAlternates, getLocalePath } from "@/shared/lib";

/** Одна страница на язык; у каждой — ссылки на остальные языки */
export default function sitemap(): MetadataRoute.Sitemap {
	const languages = getLocaleAlternates(SITE_URL);

	return SUPPORTED_LOCALES.map((locale) => ({
		url: `${SITE_URL}${getLocalePath(locale)}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 1,
		alternates: { languages }
	}));
}
