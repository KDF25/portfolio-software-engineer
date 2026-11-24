import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

import { DEFAULT_LOCALE, SITE_THEME_COLORS } from "@/shared/config";

/** Web App Manifest: имя и иконка при добавлении сайта на главный экран */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({
		locale: DEFAULT_LOCALE,
		namespace: "common"
	});

	return {
		name: t("seo.title"),
		short_name: t("person.name"),
		description: t("seo.description"),
		start_url: "/",
		display: "browser",
		background_color: SITE_THEME_COLORS.dark,
		theme_color: SITE_THEME_COLORS.dark,
		icons: [
			{ src: "/icon.png", sizes: "512x512", type: "image/png" },
			{ src: "/apple-icon.png", sizes: "180x180", type: "image/png" }
		]
	};
}
