import { useTranslations } from "next-intl";

import { SECTION_IDS, SITE_LINKS } from "@/shared/config";
import { Button, CopyButton, LinkRow, ScreenSection } from "@/shared/ui";

import { CONTACT_LINKS } from "../model";

const HEADING_ID = "contact-title";

/** Контакты: призыв слева, ссылки строками справа */
export const Contact = () => {
	const t = useTranslations("main");

	return (
		<ScreenSection id={SECTION_IDS.contact} labelledBy={HEADING_ID}>
			<div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-20">
				<div className="flex flex-col gap-5">
					<h2
						id={HEADING_ID}
						className="font-display text-section font-semibold"
					>
						{t("contact.title")}
					</h2>
					<p className="max-w-xl text-lg text-muted-foreground">
						{t("contact.lede")}
					</p>
					<div className="flex flex-wrap gap-3">
						<Button asChild size="lg">
							<a href={SITE_LINKS.email}>
								{t("contact.email_cta")}
							</a>
						</Button>
						<Button asChild size="lg" variant="outline">
							<a
								href={SITE_LINKS.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								{t("contact.linkedin_cta")}
							</a>
						</Button>
					</div>
				</div>

				<ul className="border-t">
					{CONTACT_LINKS.map(
						({ id, icon, label, value, href, isCopyable }) => (
							<LinkRow
								key={id}
								icon={icon}
								label={t(label)}
								value={value}
								href={href}
								action={
									isCopyable && (
										<CopyButton
											value={value}
											label={t("contact.copy")}
											copiedLabel={t("contact.copied")}
										/>
									)
								}
							/>
						)
					)}
				</ul>
			</div>
		</ScreenSection>
	);
};
