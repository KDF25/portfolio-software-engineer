import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n";
import { LanguageToggle, Logo, ThemeToggle } from "@/shared/ui";

import { HEADER_NAV_ITEMS } from "../model";

export const Header = () => {
	const t = useTranslations("common");

	return (
		<header className="sticky top-0 z-30 h-header border-b bg-background/90 backdrop-blur-md">
			<div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
				<Link
					href="/"
					aria-label={t("person.name")}
					className="transition-opacity hover:opacity-70"
				>
					<Logo />
				</Link>
				<div className="flex items-center gap-5">
					<nav
						aria-label={t("nav.label")}
						className="hidden items-center gap-5 text-sm lg:flex"
					>
						{HEADER_NAV_ITEMS.map(({ href, label }) => (
							<a
								key={href}
								href={href}
								className="py-2.5 text-muted-foreground transition-colors hover:text-foreground"
							>
								{t(label)}
							</a>
						))}
					</nav>
					<LanguageToggle />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
