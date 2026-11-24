import { useTranslations } from "next-intl";

export const Footer = () => {
	const t = useTranslations("common.footer");

	return (
		<footer className="border-t text-sm text-muted-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-2 px-5 py-6 md:px-10">
				<p>{t("copyright", { year: new Date().getFullYear() })}</p>
				<p>{t("timezone")}</p>
			</div>
		</footer>
	);
};
