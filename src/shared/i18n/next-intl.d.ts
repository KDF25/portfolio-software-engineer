import type { TResources, TSupportedLocale } from "@/shared/config";

declare module "next-intl" {
	interface AppConfig {
		Locale: TSupportedLocale;
		Messages: TResources;
	}
}
