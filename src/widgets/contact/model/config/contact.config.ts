import { Briefcase, Code, type LucideIcon, Mail, Send } from "lucide-react";

import {
	SITE_CONTACTS,
	SITE_LINKS,
	type TMainKeys,
	i18nKey
} from "@/shared/config";

const key = i18nKey<TMainKeys>();

export interface IContactLinkConfig {
	id: string;
	icon: LucideIcon;
	label: TMainKeys;
	value: string;
	href: string;
	/** Показать кнопку копирования значения */
	isCopyable?: boolean;
}

export const CONTACT_LINKS: IContactLinkConfig[] = [
	{
		id: "email",
		icon: Mail,
		label: key("contact.labels.email"),
		value: SITE_CONTACTS.email,
		href: SITE_LINKS.email,
		isCopyable: true
	},
	{
		id: "telegram",
		icon: Send,
		label: key("contact.labels.telegram"),
		value: `@${SITE_CONTACTS.telegram}`,
		href: SITE_LINKS.telegram
	},
	{
		id: "linkedin",
		icon: Briefcase,
		label: key("contact.labels.linkedin"),
		value: SITE_CONTACTS.linkedin,
		href: SITE_LINKS.linkedin
	},
	{
		id: "github",
		icon: Code,
		label: key("contact.labels.github"),
		value: SITE_CONTACTS.github,
		href: SITE_LINKS.github
	}
];
