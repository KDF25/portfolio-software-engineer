import { useTranslations } from "next-intl";

import { SECTION_IDS } from "@/shared/config";
import { cn } from "@/shared/lib";
import { ScreenSection, SectionHeading, TagChip, Timeline } from "@/shared/ui";

import { HARNESS_STEPS, STACK_GROUPS } from "../model";

const HEADING_ID = "build-title";

/** Как я работаю: таймлайн харнеса и стек плашками */
export const HowIBuild = () => {
	const t = useTranslations("main");

	return (
		<ScreenSection id={SECTION_IDS.build} labelledBy={HEADING_ID}>
			<SectionHeading
				id={HEADING_ID}
				title={t("build.title")}
				note={t("build.note")}
			/>

			<h3 className="mb-6 text-lg font-semibold text-soft">
				{t("build.harness_title")}
			</h3>
			<Timeline
				label={t("build.harness_label")}
				steps={HARNESS_STEPS.map(({ title, text, tools }) => ({
					title: t(title),
					text: t(text),
					tools
				}))}
			/>

			<div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
				{STACK_GROUPS.map(({ id, title, items, isHighlighted }) => (
					<div
						key={id}
						className={cn(
							"border-t pt-4",
							isHighlighted && "border-success"
						)}
					>
						<h4
							className={cn(
								"text-base font-semibold",
								isHighlighted && "text-success"
							)}
						>
							{t(title)}
						</h4>
						<ul className="mt-2.5 flex flex-wrap gap-1.5">
							{items.map((item) => (
								<li key={item}>
									<TagChip
										size="lg"
										className="text-foreground"
									>
										{item}
									</TagChip>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</ScreenSection>
	);
};
