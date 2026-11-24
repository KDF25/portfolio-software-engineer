import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { DEFAULT_LOCALE } from "@/shared/config";
import { routing } from "@/shared/i18n";

const OG_SIZE = { width: 1200, height: 630 };

/** Цвета карточки повторяют тёмную тему сайта */
const OG_COLORS = {
	background: "#09090b",
	foreground: "#f2f2ef",
	muted: "#9aa0a5",
	accent: "#8ff0c0"
};

const FONTS_DIR = join(process.cwd(), "src/shared/assets/fonts");
const PORTRAIT_PATH = join(process.cwd(), "public/images/og-portrait.jpg");

const loadFonts = async () => {
	/** Латиница и кириллица — разные файлы и разные имена: Satori берёт недостающие глифы из следующего шрифта */
	const files = [
		["Inter", "inter-latin-400-normal.woff", 400],
		["Inter Cyrillic", "inter-cyrillic-400-normal.woff", 400],
		["Inter", "inter-latin-600-normal.woff", 600],
		["Inter Cyrillic", "inter-cyrillic-600-normal.woff", 600]
	] as const;

	return Promise.all(
		files.map(async ([name, file, weight]) => ({
			name,
			data: await readFile(join(FONTS_DIR, file)),
			weight,
			style: "normal" as const
		}))
	);
};

const resolveLocale = (locale: string) =>
	hasLocale(routing.locales, locale) ? locale : DEFAULT_LOCALE;

type TOgParams = { params: { locale: string } };

export const generateImageMetadata = async ({ params }: TOgParams) => {
	const t = await getTranslations({
		locale: resolveLocale(params.locale),
		namespace: "common.og"
	});

	return [
		{
			id: "card",
			alt: t("alt"),
			size: OG_SIZE,
			contentType: "image/png"
		}
	];
};

/** Карточка для соцсетей: имя, тезис и портрет справа, растворённый в фоне */
export default async function OpenGraphImage({
	params
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({
		locale: resolveLocale(locale),
		namespace: "common"
	});
	const [fonts, portrait] = await Promise.all([
		loadFonts(),
		readFile(PORTRAIT_PATH, "base64")
	]);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				background: OG_COLORS.background,
				color: OG_COLORS.foreground,
				fontFamily: "Inter, Inter Cyrillic"
			}}
		>
			<img
				src={`data:image/jpeg;base64,${portrait}`}
				width={630}
				height={630}
				alt=""
				style={{ position: "absolute", top: 0, right: 0 }}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					width: 630,
					height: 630,
					display: "flex",
					backgroundImage: `linear-gradient(to right, ${OG_COLORS.background} 0%, rgba(9,9,11,0.75) 30%, rgba(9,9,11,0) 72%)`
				}}
			/>
			<div
				style={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: 780,
					height: "100%",
					padding: "64px 72px"
				}}
			>
				<div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>
					{t("person.name")}
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							display: "flex",
							fontSize: 60,
							fontWeight: 600,
							lineHeight: 1.05,
							letterSpacing: -1.5
						}}
					>
						{t("og.title")}
					</div>
					<div
						style={{
							display: "flex",
							marginTop: 6,
							fontSize: 60,
							fontWeight: 600,
							lineHeight: 1.05,
							letterSpacing: -1.5,
							color: OG_COLORS.accent
						}}
					>
						{t("og.accent")}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						fontSize: 22,
						color: OG_COLORS.muted
					}}
				>
					<div style={{ display: "flex" }}>{t("og.role")}</div>
					<div style={{ display: "flex", fontSize: 20 }}>
						{t("brand")}
					</div>
				</div>
			</div>
		</div>,
		{ ...OG_SIZE, fonts }
	);
}
