"use client";

import { useLocale, useTranslations } from "next-intl";

import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/shared/config";
import { Link, usePathname } from "@/shared/i18n";
import { cn } from "@/shared/lib";

import { buttonVariants } from "../../../shadcn-ui";

/** Язык — сегмент URL, поэтому переключатель — это ссылки на ту же страницу */
export const LanguageToggle = () => {
	const t = useTranslations("common");
	const activeLocale = useLocale();
	const pathname = usePathname();

	return (
		<nav
			aria-label={t("language_toggle.label")}
			className="flex items-center gap-1"
		>
			{SUPPORTED_LOCALES.map((locale) => {
				const isActive = locale === activeLocale;

				return (
					<Link
						key={locale}
						href={pathname}
						locale={locale}
						lang={locale}
						hrefLang={locale}
						scroll={false}
						aria-label={LOCALE_LABELS[locale]}
						aria-current={isActive ? "true" : undefined}
						className={cn(
							buttonVariants({ variant: "ghost", size: "sm" }),
							"px-2 uppercase",
							isActive
								? "bg-accent text-accent-foreground"
								: "text-muted-foreground"
						)}
					>
						{locale}
					</Link>
				);
			})}
		</nav>
	);
};
