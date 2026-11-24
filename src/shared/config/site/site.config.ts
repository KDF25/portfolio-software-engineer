import { ENV } from "../env";

/** Контакты и публичные адреса: одни на все языки, значения — из окружения */
export const SITE_CONTACTS = {
	email: ENV.NEXT_PUBLIC_CONTACT_EMAIL,
	telegram: ENV.NEXT_PUBLIC_CONTACT_TELEGRAM,
	linkedin: ENV.NEXT_PUBLIC_CONTACT_LINKEDIN,
	github: ENV.NEXT_PUBLIC_CONTACT_GITHUB
} as const;

export const SITE_URL = ENV.NEXT_PUBLIC_SITE_URL;

/** Цвет фона темы: адресная строка мобильного браузера и манифест */
export const SITE_THEME_COLORS = {
	light: "#edf1f7",
	dark: "#09090b"
} as const;

export const SITE_LINKS = {
	email: `mailto:${SITE_CONTACTS.email}`,
	telegram: `https://t.me/${SITE_CONTACTS.telegram}`,
	linkedin: `https://www.linkedin.com/in/${SITE_CONTACTS.linkedin}`,
	github: `https://github.com/${SITE_CONTACTS.github}`
} as const;

/** Якоря глав главной страницы */
export const SECTION_IDS = {
	stance: "stance",
	capabilities: "what",
	cases: "case-payouts",
	experience: "experience",
	about: "about",
	build: "build",
	contact: "contact"
} as const;
