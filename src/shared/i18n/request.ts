import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { NS, type TResources } from "@/shared/config";

import { routing } from "./routing";

/** Неймспейсы из NS — из messages/<locale>/<ns>.json */
const loadMessages = async (locale: string): Promise<TResources> => {
	const entries = await Promise.all(
		NS.map(async (ns) => {
			const messages = await import(
				`../../../messages/${locale}/${ns}.json`
			);
			return [ns, messages.default] as const;
		})
	);

	return Object.fromEntries(entries) as TResources;
};

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale;

	return { locale, messages: await loadMessages(locale), timeZone: "UTC" };
});
