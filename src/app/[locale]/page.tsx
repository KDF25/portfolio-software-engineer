import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/shared/i18n";

import { MainPage } from "@/page/main";

type TPageProps = {
	params: Promise<{ locale: string }>;
};

export default async function Page({ params }: TPageProps) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return <MainPage />;
}
