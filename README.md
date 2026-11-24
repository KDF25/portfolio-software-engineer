# portfolio-software-engeneer

Next.js (App Router), React, TypeScript, Tailwind CSS v4, next-intl, next-themes.

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить контакты и адрес сайта
npm run dev
```

Переменные окружения читаются только в `src/shared/config/env/env.config.ts`: пустая обязательная переменная останавливает сборку с понятной ошибкой.

## SEO и аналитика

- OG/Twitter-картинка генерируется на каждый язык: `src/app/[locale]/opengraph-image.tsx` (шрифты для неё — `src/shared/assets/fonts`).
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, иконки — файлы в `src/app`.
- `generateMetadata` лейаута: title, description, keywords, canonical, hreflang с `x-default`, og:locale и альтернативные языки, правила для Googlebot (крупные превью картинок). `viewport` задаёт цвет адресной строки под тему.
- Подтверждение прав в Search Console и Яндекс Вебмастере — переменные `GOOGLE_SITE_VERIFICATION` и `YANDEX_VERIFICATION` (код из meta-тега).
- schema.org-граф Person + WebSite + ProfilePage — `src/page/main/model/config/person-schema.config.ts`.
- GA4 подключается через контейнер Google Tag Manager, как на старом сайте. ID контейнера — `NEXT_PUBLIC_GTM_ID`; скрипт грузится только в продакшене.

## Команды

| Команда            | Что делает                             |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Dev-сервер                             |
| `npm run check`    | Типы, ESLint и проверка форматирования |
| `npm run lint:fix` | Автоисправления ESLint                 |
| `npm run format`   | Prettier                               |
| `npm run build`    | `check` и прод-сборка                  |

## Структура (FSD)

```text
messages/<locale>/   # переводы, по файлу на namespace
src/
├── proxy.ts         # определение языка по URL
├── app/             # роуты Next.js и провайдеры
├── page/            # страницы (не pages: это имя занято Pages Router)
├── widgets/         # блоки страницы
├── features/        # действия пользователя
├── entities/        # сущности
└── shared/          # config, i18n, lib, styles, ui
```

Импорты идут только вниз по слоям, снаружи слайс доступен через `index.ts` — это проверяет ESLint.

## Как добавить

**Namespace переводов:** файлы `messages/en/<ns>.json` и `messages/ru/<ns>.json`, затем тип и `NS` в `src/shared/config/i18n/i18n.config.ts` и проверка в `i18n.checker.ts`.

**Язык:** `SUPPORTED_LOCALES` и `LOCALE_LABELS` в `src/shared/config/languages`, папка `messages/<locale>`, проверка в `i18n.checker.ts`.

**Цвет:** токен для `:root` и `.dark` и маппинг в `@theme inline` в `src/shared/styles/theme.css`. Палитра Tailwind и произвольные значения запрещены ESLint.
