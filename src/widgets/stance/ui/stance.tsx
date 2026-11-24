import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

import { SECTION_IDS } from "@/shared/config";
import { Button, ScreenSection, TagChip } from "@/shared/ui";

import {
	ENUM_FAILURE_MODE,
	type ENUM_FAILURE_MODE_TYPE,
	FAILURE_MODES,
	STANCE_BADGES
} from "../model";

import { ModelGlyph, NetworkGlyph, RaceGlyph } from "./failure-glyphs";

const FAILURE_GLYPHS: Record<ENUM_FAILURE_MODE_TYPE, ComponentType> = {
	[ENUM_FAILURE_MODE.NETWORK]: NetworkGlyph,
	[ENUM_FAILURE_MODE.RACE]: RaceGlyph,
	[ENUM_FAILURE_MODE.MODEL]: ModelGlyph
};

/** Роль и позиция: три вида отказа, с которых я начинаю проектирование */
export const Stance = () => {
	const t = useTranslations("main");

	return (
		<ScreenSection id={SECTION_IDS.stance}>
			<p className="max-w-4xl font-display text-role font-semibold">
				{t.rich("stance.role", {
					muted: (chunks) => (
						<span className="text-muted-foreground">{chunks}</span>
					)
				})}
			</p>

			<ul className="mt-5 flex flex-wrap gap-2">
				{STANCE_BADGES.map((badge) => (
					<li key={badge}>
						<TagChip variant="outline" size="md">
							{t(badge)}
						</TagChip>
					</li>
				))}
			</ul>

			<p className="mt-7 max-w-2xl text-lg text-muted-foreground">
				{t("stance.lede")}
			</p>

			<div className="my-8 grid grid-cols-1 gap-5 md:my-12 md:grid-cols-3">
				{FAILURE_MODES.map(({ id, title, text, link, href }) => {
					const Glyph = FAILURE_GLYPHS[id];

					return (
						<a
							key={id}
							href={href}
							className="group flex flex-col gap-3.5 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-success"
						>
							<Glyph />
							<h3 className="font-display text-xl font-semibold">
								{t(title)}
							</h3>
							<p className="text-muted-foreground">{t(text)}</p>
							<span className="mt-auto font-mono text-sm text-success">
								{t(link)}
							</span>
						</a>
					);
				})}
			</div>

			<div className="flex flex-wrap gap-3">
				<Button asChild size="lg">
					<a href={`#${SECTION_IDS.contact}`}>
						{t("stance.cta.contact")}
					</a>
				</Button>
				<Button asChild size="lg" variant="outline">
					<a href={`#${SECTION_IDS.capabilities}`}>
						{t("stance.cta.capabilities")}
					</a>
				</Button>
			</div>
		</ScreenSection>
	);
};
