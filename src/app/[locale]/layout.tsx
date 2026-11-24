import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono, Onest, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ENV, OG_LOCALES, SITE_THEME_COLORS, SITE_URL } from "@/shared/config";
import { routing } from "@/shared/i18n";
import { getLocaleAlternates, getLocalePath } from "@/shared/lib";
import "@/shared/styles/globals.css";
import { GoogleAnalytics } from "@/shared/ui";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { Providers } from "../providers";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"]
});

/** Заголовки латиницей. Кириллицы в Space Grotesk нет — для неё Onest */
const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["500", "600"]
});

const onest = Onest({
	variable: "--font-onest",
	subsets: ["latin", "cyrillic"],
	weight: ["500", "600"]
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500"]
});

type TLayoutProps = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
	colorScheme: "dark light",
	themeColor: [
		{
			media: "(prefers-color-scheme: dark)",
			color: SITE_THEME_COLORS.dark
		},
		{
			media: "(prefers-color-scheme: light)",
			color: SITE_THEME_COLORS.light
		}
	]
};

export const generateStaticParams = () =>
	routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
	params
}: Omit<TLayoutProps, "children">): Promise<Metadata> => {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		return {};
	}

	const t = await getTranslations({ locale, namespace: "common" });
	const title = t("seo.title");
	const description = t("seo.description");
	const name = t("person.name");

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		keywords: t("seo.keywords").split(", "),
		applicationName: name,
		authors: [{ name, url: SITE_URL }],
		creator: name,
		publisher: name,
		category: "technology",
		formatDetection: { email: false, address: false, telephone: false },
		alternates: {
			canonical: getLocalePath(locale),
			languages: getLocaleAlternates()
		},
		openGraph: {
			type: "profile",
			url: getLocalePath(locale),
			siteName: t("brand"),
			title,
			description,
			locale: OG_LOCALES[locale],
			alternateLocale: routing.locales
				.filter((item) => item !== locale)
				.map((item) => OG_LOCALES[item])
		},
		twitter: {
			card: "summary_large_image",
			title,
			description
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1
			}
		},
		verification: {
			google: ENV.GOOGLE_SITE_VERIFICATION || undefined,
			yandex: ENV.YANDEX_VERIFICATION || undefined
		}
	};
};

export default async function LocaleLayout({ children, params }: TLayoutProps) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		// next-themes меняет класс на <html> до гидратации
		<html
			lang={locale}
			className={`${inter.variable} ${spaceGrotesk.variable} ${onest.variable} ${jetBrainsMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="flex min-h-full flex-col">
				<Providers>
					<Header />
					<main className="flex w-full flex-1 flex-col">
						{children}
					</main>
					<Footer />
				</Providers>
				<GoogleAnalytics />
				<Analytics />
			</body>
		</html>
	);
}
