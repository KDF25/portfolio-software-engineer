import { useTranslations } from "next-intl";

import { SECTION_IDS, type TMainKeys } from "@/shared/config";
import { ScreenSection, SectionHeading, TagChip } from "@/shared/ui";

import { CAPABILITIES, CAPABILITY_FALLBACK, CAPABILITY_FLOW } from "../model";

import { CapabilityCard } from "./capability-card";

const HEADING_ID = "capabilities-title";

/** Направления: bento-сетка из одного типа карточки */
export const Capabilities = () => {
	const t = useTranslations("main");

	const renderFlow = (
		steps: TMainKeys[],
		label: string,
		highlight: "success" | "danger"
	) => (
		<ol
			aria-label={label}
			className="my-1 flex flex-wrap items-center gap-2 font-mono text-sm"
		>
			{steps.map((step, index) => {
				const isLast = index === steps.length - 1;

				return (
					<li key={step} className="flex items-center gap-2">
						<TagChip
							variant={isLast ? highlight : "outline"}
							size="md"
						>
							{t(step)}
						</TagChip>
						{!isLast && (
							<span
								aria-hidden="true"
								className="text-muted-foreground"
							>
								→
							</span>
						)}
					</li>
				);
			})}
		</ol>
	);

	return (
		<ScreenSection id={SECTION_IDS.capabilities} labelledBy={HEADING_ID}>
			<SectionHeading
				id={HEADING_ID}
				title={t("capabilities.title")}
				note={t("capabilities.note")}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{CAPABILITIES.map(
					({ id, icon, title, text, tags, size, withFlow }) => (
						<CapabilityCard
							key={id}
							icon={icon}
							title={t(title)}
							text={t(text)}
							tags={tags}
							size={size}
						>
							{withFlow && (
								<>
									{renderFlow(
										CAPABILITY_FLOW,
										t("capabilities.flow.label"),
										"success"
									)}
									{renderFlow(
										CAPABILITY_FALLBACK,
										t("capabilities.flow.fallback_label"),
										"danger"
									)}
								</>
							)}
						</CapabilityCard>
					)
				)}
			</div>
		</ScreenSection>
	);
};
