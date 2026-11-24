import { useLocale, useTranslations } from "next-intl";

import type { TSupportedLocale } from "@/shared/config";
import { JsonLd } from "@/shared/ui";

import { About } from "@/widgets/about";
import { Capabilities } from "@/widgets/capabilities";
import { CASE_STUDY_ORDER, CaseStudy } from "@/widgets/case-study";
import { Contact } from "@/widgets/contact";
import { Experience } from "@/widgets/experience";
import { Hero } from "@/widgets/hero";
import { HowIBuild } from "@/widgets/how-i-build";
import { Stance } from "@/widgets/stance";

import { createPersonSchema } from "../model";

/** Главная: главы идут одна за другой, кейсы — один виджет на каждый тип */
export const MainPage = () => {
	const t = useTranslations("common");
	const locale = useLocale() as TSupportedLocale;

	return (
		<>
			<JsonLd
				data={createPersonSchema({
					locale,
					siteName: t("brand"),
					name: t("person.name"),
					jobTitle: t("person.job_title"),
					description: t("seo.description")
				})}
			/>
			<Hero />
			<Stance />
			<Capabilities />
			{CASE_STUDY_ORDER.map((type) => (
				<CaseStudy key={type} type={type} />
			))}
			<Experience />
			<About />
			<HowIBuild />
			<Contact />
		</>
	);
};
