import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";
import {
	DecisionList,
	FailureTable,
	ScreenSection,
	SequenceDiagram,
	StarStep,
	TagChip
} from "@/shared/ui";

import {
	CASE_STUDIES,
	CASE_STUDY_ORDER,
	type ENUM_CASE_STUDY_TYPE,
	type ICaseSequenceConfig
} from "../model";

interface ICaseStudyProps {
	type: ENUM_CASE_STUDY_TYPE;
}

/**
 * Кейс в формате STAR на один экран. Разметка одна на все кейсы —
 * тексты, метрика и схема приходят из CASE_STUDIES по типу
 */
export const CaseStudy = ({ type }: ICaseStudyProps) => {
	const t = useTranslations("main");
	const config = CASE_STUDIES[type];
	const index = CASE_STUDY_ORDER.indexOf(type);
	const isFlipped = index % 2 === 1;
	const isLast = index === CASE_STUDY_ORDER.length - 1;
	const headingId = `${config.anchor}-title`;

	const translateScenario = ({
		outcome,
		messages
	}: ICaseSequenceConfig["normal"]) => ({
		outcome: t(outcome),
		messages: messages.map(({ label, ...message }) => ({
			...message,
			label: t(label)
		}))
	});

	return (
		<ScreenSection id={config.anchor} labelledBy={headingId}>
			<div className="mb-6 flex flex-wrap items-end justify-between gap-x-12 gap-y-3 border-b pb-5 md:mb-8">
				<div>
					<p className="mb-2 text-sm text-muted-foreground">
						{t("cases.counter", {
							current: index + 1,
							total: CASE_STUDY_ORDER.length
						})}{" "}
						· {t(config.stack)}
					</p>
					<h2
						id={headingId}
						className="max-w-3xl font-display text-case font-semibold"
					>
						{t(config.title)}
					</h2>
				</div>
				<p className="flex max-w-xs flex-col md:items-end md:text-right">
					<span className="font-mono text-metric font-medium text-success">
						{t(config.metric)}
					</span>
					<span className="mt-1.5 text-sm text-muted-foreground">
						{t(config.metricLabel)}
					</span>
				</p>
			</div>

			<div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-13 lg:gap-10">
				<div className="flex flex-col gap-6 lg:col-span-4">
					<StarStep marker="S" title={t("cases.steps.situation")}>
						<p className="text-sm text-muted-foreground">
							{t(config.situation)}
						</p>
						<FailureTable
							rows={config.risks.map(({ cause, effect }) => ({
								cause: t(cause),
								effect: t(effect)
							}))}
						/>
					</StarStep>
					<StarStep marker="T" title={t("cases.steps.task")}>
						<ul className="flex flex-wrap gap-1.5">
							{config.tasks.map((task) => (
								<li key={task}>
									<TagChip size="md" className="font-sans">
										{t(task)}
									</TagChip>
								</li>
							))}
						</ul>
					</StarStep>
				</div>

				<div className="flex flex-col gap-6 lg:col-span-4">
					<StarStep marker="A" title={t("cases.steps.action")}>
						<DecisionList
							items={config.actions.map(
								({ title, note, accepted }) => ({
									title: t(title),
									note: t(note),
									accepted
								})
							)}
						/>
					</StarStep>
					<StarStep
						marker="R"
						tone="success"
						title={t("cases.steps.result")}
					>
						<p className="text-sm text-muted-foreground">
							{t(config.result)}
						</p>
						<blockquote className="rounded-lg bg-success-soft px-4 py-3 text-sm text-soft">
							{t(config.quote)}
						</blockquote>
					</StarStep>
				</div>

				<div
					className={cn(
						"md:col-span-2 lg:col-span-5",
						isFlipped && "lg:order-first"
					)}
				>
					<SequenceDiagram
						kicker={t("cases.diagram.kicker")}
						name={t(config.sequence.name)}
						lanes={config.sequence.lanes.map((lane) => t(lane))}
						normal={translateScenario(config.sequence.normal)}
						failure={translateScenario(config.sequence.failure)}
						labels={{
							normal: t("cases.diagram.normal"),
							failure: t("cases.diagram.failure")
						}}
					/>
				</div>
			</div>

			{isLast && (
				<p className="mt-5 text-sm text-muted-foreground">
					{t("cases.note")}
				</p>
			)}
		</ScreenSection>
	);
};
