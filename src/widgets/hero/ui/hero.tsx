import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SECTION_IDS } from "@/shared/config";
import { Ticker } from "@/shared/ui";

import { HERO_TICKER_ITEMS } from "../model";

/** Первый экран: имя, тезис, фото во всю высоту справа и лента сбоев */
export const Hero = () => {
	const t = useTranslations("main");

	return (
		<section className="h-screen-hero relative flex flex-col overflow-hidden max-md:h-auto max-md:min-h-screen-section">
			<figure className="portrait-fade relative min-h-80 w-full flex-1 md:absolute md:flex-none md:top-0 md:right-0 md:bottom-ticker md:h-auto md:w-1/2 md:max-w-205">
				<Image
					src="/images/damir.png"
					alt={t("hero.photo_alt")}
					fill
					sizes="(min-width: 768px) 50vw, 100vw"
					loading="eager"
					fetchPriority="high"
					className="object-cover object-top"
				/>
			</figure>

			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center gap-6 px-5 pt-8 pb-8 md:flex-1 md:py-8 md:gap-8 md:px-10">
				<p className="font-display text-2xl font-semibold">
					{t("hero.name")}
				</p>
				<h1 className="max-w-3xl font-display text-hero font-semibold md:w-1/2">
					{t.rich("hero.title", {
						accent: (chunks) => (
							<em className="text-success not-italic">
								{chunks}
							</em>
						)
					})}
				</h1>
				<a
					href={`#${SECTION_IDS.stance}`}
					className="inline-flex w-fit items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowDown className="size-4" aria-hidden="true" />
					{t("hero.scroll")}
				</a>
			</div>

			<Ticker
				label={t("hero.ticker_label")}
				items={HERO_TICKER_ITEMS.map(({ event, fix }) => ({
					event: t(event),
					fix: t(fix)
				}))}
			/>
		</section>
	);
};
