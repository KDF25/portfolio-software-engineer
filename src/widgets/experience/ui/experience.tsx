import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { SECTION_IDS } from "@/shared/config";
import { cn } from "@/shared/lib";
import { METRIC_VALUE_CLASS, MetricBadge, ScreenSection } from "@/shared/ui";

import { EXPERIENCE_GROUPS } from "../model";

const HEADING_ID = "experience-title";

/** Опыт буллетами без компаний: бейдж и цвет цифры показывают, что изменилось */
export const Experience = () => {
	const t = useTranslations("main");

	return (
		<ScreenSection id={SECTION_IDS.experience} labelledBy={HEADING_ID}>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-20">
				<div className="flex flex-col gap-4 self-start lg:sticky lg:top-24">
					<h2
						id={HEADING_ID}
						className="font-display text-section font-semibold"
					>
						{t("experience.title")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("experience.note")}
					</p>
				</div>

				<div className="flex flex-col gap-10 lg:col-span-2">
					{EXPERIENCE_GROUPS.map(
						({ id, icon: Icon, title, items }) => (
							<div key={id}>
								<h3 className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 font-display text-xl font-semibold">
									<Icon
										className="size-5 text-success"
										strokeWidth={1.6}
										aria-hidden="true"
									/>
									{t(title)}
								</h3>
								<ul className="mt-4 flex flex-col gap-3">
									{items.map(({ text, direction }) => {
										const renderMetric = (
											chunks: ReactNode
										) => (
											<b
												className={cn(
													"font-mono text-lg font-semibold whitespace-nowrap",
													METRIC_VALUE_CLASS[
														direction
													]
												)}
											>
												{chunks}
											</b>
										);

										return (
											<li
												key={text}
												className="grid grid-cols-1 items-baseline gap-1.5 py-1.5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4"
											>
												<span className="sm:w-22">
													<MetricBadge
														direction={direction}
													/>
												</span>
												<p className="text-soft">
													{t.rich(text, {
														metric: renderMetric,
														plain: (chunks) => (
															<b className="font-mono text-lg font-semibold whitespace-nowrap">
																{chunks}
															</b>
														)
													})}
												</p>
											</li>
										);
									})}
								</ul>
							</div>
						)
					)}
				</div>
			</div>
		</ScreenSection>
	);
};
