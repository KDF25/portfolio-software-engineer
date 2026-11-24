/**
 * Переменные окружения читаются только здесь.
 * NEXT_PUBLIC_* Next.js подставляет при сборке, поэтому каждое обращение
 * к process.env записано явно, а не через process.env[name]
 */
const required = (name: string, value: string | undefined): string => {
	if (!value) {
		throw new Error(
			`Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`
		);
	}

	return value;
};

/** Публичный адрес сайта — база для OG-картинок и канонических ссылок */
const NEXT_PUBLIC_SITE_URL = required(
	"NEXT_PUBLIC_SITE_URL",
	process.env.NEXT_PUBLIC_SITE_URL
);
const NEXT_PUBLIC_CONTACT_EMAIL = required(
	"NEXT_PUBLIC_CONTACT_EMAIL",
	process.env.NEXT_PUBLIC_CONTACT_EMAIL
);
/** Имя пользователя без @ */
const NEXT_PUBLIC_CONTACT_TELEGRAM = required(
	"NEXT_PUBLIC_CONTACT_TELEGRAM",
	process.env.NEXT_PUBLIC_CONTACT_TELEGRAM
);
/** Часть адреса профиля после /in/ */
const NEXT_PUBLIC_CONTACT_LINKEDIN = required(
	"NEXT_PUBLIC_CONTACT_LINKEDIN",
	process.env.NEXT_PUBLIC_CONTACT_LINKEDIN
);
const NEXT_PUBLIC_CONTACT_GITHUB = required(
	"NEXT_PUBLIC_CONTACT_GITHUB",
	process.env.NEXT_PUBLIC_CONTACT_GITHUB
);

/** ID контейнера Google Tag Manager (GTM-XXXXXXX), GA4 настроен внутри. Пусто — аналитика не подключается */
const NEXT_PUBLIC_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
/** Коды подтверждения Google Search Console и Яндекс Вебмастера (meta-тег). Пусто — тег не выводится */
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION ?? "";
const YANDEX_VERIFICATION = process.env.YANDEX_VERIFICATION ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const ENV = {
	NEXT_PUBLIC_SITE_URL,
	NEXT_PUBLIC_CONTACT_EMAIL,
	NEXT_PUBLIC_CONTACT_TELEGRAM,
	NEXT_PUBLIC_CONTACT_LINKEDIN,
	NEXT_PUBLIC_CONTACT_GITHUB,
	NEXT_PUBLIC_GTM_ID,
	GOOGLE_SITE_VERIFICATION,
	YANDEX_VERIFICATION,
	IS_PRODUCTION
} as const;
