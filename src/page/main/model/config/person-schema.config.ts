import {
	SITE_CONTACTS,
	SITE_LINKS,
	SITE_URL,
	type TSupportedLocale
} from "@/shared/config";
import { getLocalePath } from "@/shared/lib";

interface IPersonSchemaTexts {
	locale: TSupportedLocale;
	name: string;
	jobTitle: string;
	description: string;
	siteName: string;
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * schema.org-граф: Person — кто это, WebSite — чей сайт, ProfilePage — страница о человеке.
 * Поисковики связывают сайт с профилями (sameAs) и могут показать карточку человека
 */
export const createPersonSchema = ({
	locale,
	name,
	jobTitle,
	description,
	siteName
}: IPersonSchemaTexts) => {
	const pageUrl = `${SITE_URL}${getLocalePath(locale)}`;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Person",
				"@id": PERSON_ID,
				name,
				jobTitle,
				description,
				url: SITE_URL,
				image: `${SITE_URL}/images/og-portrait.jpg`,
				email: `mailto:${SITE_CONTACTS.email}`,
				sameAs: [
					SITE_LINKS.github,
					SITE_LINKS.linkedin,
					SITE_LINKS.telegram
				],
				knowsAbout: [
					"Distributed systems",
					"Payments",
					"Real-time systems",
					"AI agents",
					"RAG",
					"MCP",
					"Node.js",
					"Python",
					"PostgreSQL",
					"React",
					"Next.js"
				]
			},
			{
				"@type": "WebSite",
				"@id": WEBSITE_ID,
				url: SITE_URL,
				name: siteName,
				inLanguage: locale,
				publisher: { "@id": PERSON_ID }
			},
			{
				"@type": "ProfilePage",
				"@id": `${pageUrl}#profile`,
				url: pageUrl,
				name: `${name} — ${jobTitle}`,
				description,
				inLanguage: locale,
				isPartOf: { "@id": WEBSITE_ID },
				mainEntity: { "@id": PERSON_ID }
			}
		]
	};
};
