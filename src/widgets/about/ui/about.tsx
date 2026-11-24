import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { SECTION_IDS } from "@/shared/config";
import { ScreenSection, StarStep } from "@/shared/ui";

import { ABOUT_PATH, OUTSIDE_ITEMS, WORK_STYLE_ITEMS } from "../model";

const HEADING_ID = "about-title";

const AboutBlock = ({
	title,
	children
}: {
	title: string;
	children: ReactNode;
}) => (
	<div className="border-t pt-10 first:border-t-0 first:pt-0">
		<h3 className="mb-5 font-display text-xl font-semibold">{title}</h3>
		{children}
	</div>
);

/** Обо мне: путь, как работаю, интересы вне кода */
export const About = () => {
	const t = useTranslations("main");

	return (
		<ScreenSection id={SECTION_IDS.about} labelledBy={HEADING_ID}>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-20">
				<div className="flex flex-col gap-4 self-start lg:sticky lg:top-24">
					<h2
						id={HEADING_ID}
						className="font-display text-section font-semibold"
					>
						{t("about.title")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("about.note")}
					</p>
				</div>

				<div className="flex flex-col gap-10 lg:col-span-2">
					<AboutBlock title={t("about.path.title")}>
						<div className="flex max-w-2xl flex-col gap-3.5 text-soft">
							{ABOUT_PATH.map((paragraph) => (
								<p key={paragraph}>{t(paragraph)}</p>
							))}
						</div>
					</AboutBlock>

					<AboutBlock title={t("about.work.title")}>
						<ul className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
							{WORK_STYLE_ITEMS.map(
								({ id, icon: Icon, title, text }) => (
									<li key={id}>
										<StarStep
											marker={<Icon strokeWidth={1.7} />}
											tone="success"
											title={t(title)}
										>
											<p className="text-sm text-muted-foreground">
												{t(text)}
											</p>
										</StarStep>
									</li>
								)
							)}
						</ul>
					</AboutBlock>

					<AboutBlock title={t("about.outside.title")}>
						<ul className="flex flex-col gap-2.5">
							{OUTSIDE_ITEMS.map(({ id, title, text }) => (
								<li
									key={id}
									className="relative pl-5 text-muted-foreground before:absolute before:top-2.5 before:left-0.5 before:size-2 before:rounded-full before:border before:border-success"
								>
									<b className="font-semibold text-foreground">
										{t(title)}
									</b>{" "}
									— {t(text)}
								</li>
							))}
						</ul>
					</AboutBlock>
				</div>
			</div>
		</ScreenSection>
	);
};
