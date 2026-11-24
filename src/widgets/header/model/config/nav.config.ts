import { SECTION_IDS, type TCommonKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TCommonKeys>();

export const HEADER_NAV_ITEMS = [
	{ href: `#${SECTION_IDS.capabilities}`, label: key("nav.capabilities") },
	{ href: `#${SECTION_IDS.cases}`, label: key("nav.cases") },
	{ href: `#${SECTION_IDS.experience}`, label: key("nav.experience") },
	{ href: `#${SECTION_IDS.about}`, label: key("nav.about") },
	{ href: `#${SECTION_IDS.build}`, label: key("nav.build") },
	{ href: `#${SECTION_IDS.contact}`, label: key("nav.contact") }
];
