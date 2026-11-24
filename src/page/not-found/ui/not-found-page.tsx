import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n";
import { Button } from "@/shared/ui";

export const NotFoundPage = () => {
	const t = useTranslations("not_found");

	return (
		<section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
			<h1 className="text-6xl font-semibold">{t("title")}</h1>
			<p className="text-muted-foreground">{t("description")}</p>
			<Button asChild>
				<Link href="/">{t("home_link")}</Link>
			</Button>
		</section>
	);
};
