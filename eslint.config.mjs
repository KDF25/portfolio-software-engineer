import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const COLOR_UTILITIES =
	"(bg|text|border|ring|outline|shadow|fill|stroke|from|via|to|divide|accent|caret|decoration|placeholder)";
const FORBIDDEN_PALETTE =
	"((slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]+|white|black)";

const FORBIDDEN_COLOR = `(^|[ :])${COLOR_UTILITIES}-${FORBIDDEN_PALETTE}($|[^a-z0-9-])`;
const ARBITRARY_VALUE = "(^|[ :])-?[a-z][a-z-]*-\\[(#|[0-9.]|-|calc|rgb|hsl)";

const COLOR_MESSAGE =
	"Tailwind palette and white/black are forbidden. Use design tokens (bg-primary, text-muted-foreground, ...).";
const ARBITRARY_MESSAGE =
	"Arbitrary Tailwind values are forbidden. Use the scale or a token from shared/styles.";

/** Значения классов встречаются и в строках, и в template literals */
const forbidClass = (regex, message) => [
	{ selector: `Literal[value=/${regex}/]`, message },
	{ selector: `TemplateElement[value.raw=/${regex}/]`, message }
];

const NO_ENUM = {
	selector: "TSEnumDeclaration",
	message:
		"enum is forbidden. Use `const ENUM_X = {...} as const` and `type ENUM_X_TYPE`."
};

const CONVERTERS_MESSAGE =
	"Converters are private: import only from the same entity api via '../converters'.";
const OPENAPI_MESSAGE =
	"Raw backend.types are allowed only in entities/*/types (*-backend.interface.ts). Alias as T*Backend.";

const CONVERTERS_PATTERN = {
	group: ["**/entities/*/converters", "**/entities/*/converters/**"],
	message: CONVERTERS_MESSAGE
};
const RELATIVE_CONVERTERS_PATTERN = {
	group: ["../converters", "../converters/**", "../../converters/**"],
	message: CONVERTERS_MESSAGE
};
const OPENAPI_PATTERN = {
	group: ["**/shared/api/generated/backend.types*"],
	message: OPENAPI_MESSAGE
};

export default defineConfig([
	globalIgnores([
		".next/**",
		"out/**",
		"build/**",
		"node_modules/**",
		".vercel/**",
		"next-env.d.ts",
		"src/shared/api/generated/**"
	]),

	...nextVitals,
	...nextTs,

	{
		files: ["**/*.{ts,tsx}"],
		ignores: ["*.config.{ts,js,mjs}"],
		languageOptions: {
			globals: globals.browser,
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: { boundaries, unicorn },
		rules: {
			"no-console": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			],
			"@typescript-eslint/no-explicit-any": "error",
			"no-restricted-syntax": ["error", NO_ENUM],

			// Имена файлов: kebab-case, включая хуки (use-x.ts)
			"unicorn/filename-case": [
				"error",
				{
					cases: {
						kebabCase: true,
						camelCase: false,
						pascalCase: false
					},
					ignore: [
						/^[a-z0-9-]+\.(service|api|util|config|types|interface|store|hook|slice|schema|converters|handlers|mock)\.ts$/,
						/^[a-z0-9-]+\.(service|store|api|util|config|hook|slice)\.(types|interface)\.ts$/,
						/^[a-z0-9-]+-backend\.interface\.ts$/,
						/^(page|layout|loading|error|not-found|template|default)\.tsx?$/,
						/^i18n\.(init|blocks|checker)\.ts$/,
						/^[a-z0-9-]+\.context\.ts$/
					]
				}
			],

			// Соглашения именования: I* / T* / ENUM_* / UPPER_CASE / use*
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],
					prefix: ["I"]
				},
				{
					selector: "typeAlias",
					format: ["PascalCase"],
					filter: { regex: "^ENUM_[A-Z]", match: false },
					prefix: ["T"]
				},
				{
					selector: "variable",
					modifiers: ["const", "exported"],
					types: ["string", "number", "boolean"],
					// Служебные экспорты route-файлов Next.js
					filter: {
						regex: "^(dynamic|revalidate|runtime|preferredRegion|fetchCache|dynamicParams|maxDuration)$",
						match: false
					},
					format: ["UPPER_CASE"]
				},
				{
					selector: "function",
					format: ["camelCase", "PascalCase"]
				},
				{
					selector: "variable",
					modifiers: ["const", "exported"],
					filter: { regex: "^use[A-Z]", match: true },
					format: ["camelCase"]
				},
				{
					selector: "function",
					filter: { regex: "^use[A-Z]", match: true },
					format: ["camelCase"]
				}
			],

			// FSD: импорт только из нижележащих слоёв
			"boundaries/element-types": [
				"error",
				{
					default: "disallow",
					rules: [
						{
							from: "app",
							allow: [
								"app",
								"page",
								"widgets",
								"features",
								"entities",
								"shared"
							]
						},
						{
							from: "page",
							allow: ["widgets", "features", "entities", "shared"]
						},
						{
							from: "widgets",
							allow: ["features", "entities", "shared"]
						},
						{
							from: "features",
							allow: ["features", "entities", "shared"]
						},
						{ from: "entities", allow: ["shared"] },
						{ from: "shared", allow: ["shared"] }
					]
				}
			],

			// FSD: слайс доступен снаружи только через public API (index)
			"boundaries/entry-point": [
				"error",
				{
					default: "disallow",
					rules: [
						{
							target: ["page", "widgets", "features", "entities"],
							allow: "index.{ts,tsx}"
						},
						{ target: ["app", "shared"], allow: "**" }
					]
				}
			],

			"no-restricted-imports": [
				"error",
				{ patterns: [CONVERTERS_PATTERN, OPENAPI_PATTERN] }
			]
		},
		settings: {
			"boundaries/include": ["src/**/*"],
			"boundaries/elements": [
				{ type: "app", pattern: "src/app", mode: "folder" },
				{ type: "page", pattern: "src/page/*", mode: "folder" },
				{ type: "widgets", pattern: "src/widgets/*", mode: "folder" },
				{ type: "features", pattern: "src/features/*", mode: "folder" },
				{ type: "entities", pattern: "src/entities/*", mode: "folder" },
				{ type: "shared", pattern: "src/shared", mode: "folder" }
			],
			"boundaries/ignore": [
				"**/*.test.{ts,tsx}",
				"**/*.spec.{ts,tsx}",
				"**/*.stories.{ts,tsx}"
			],
			react: { version: "detect" },
			"import/resolver": {
				typescript: { project: ["./tsconfig.json"] }
			}
		}
	},

	// Стили: только дизайн-токены и шкала Tailwind
	{
		files: ["src/**/*.tsx"],
		ignores: ["src/shared/ui/shadcn-ui/**"],
		rules: {
			"no-restricted-syntax": [
				"error",
				NO_ENUM,
				...forbidClass(FORBIDDEN_COLOR, COLOR_MESSAGE),
				...forbidClass(ARBITRARY_VALUE, ARBITRARY_MESSAGE)
			]
		}
	},

	// Внутри entity converters доступны только из api
	{
		files: ["src/entities/*/**/*.{ts,tsx}"],
		ignores: [
			"src/entities/*/api/**",
			"src/entities/*/converters/**",
			"src/entities/*/types/**"
		],
		rules: {
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						CONVERTERS_PATTERN,
						RELATIVE_CONVERTERS_PATTERN,
						OPENAPI_PATTERN
					]
				}
			]
		}
	},

	// Сырые OpenAPI-типы разрешены только в types сущности
	{
		files: ["src/entities/*/types/**/*.{ts,tsx}"],
		rules: {
			"no-restricted-imports": [
				"error",
				{ patterns: [CONVERTERS_PATTERN, RELATIVE_CONVERTERS_PATTERN] }
			]
		}
	},

	// Vendor: код shadcn-ui генерируется CLI
	{
		files: ["src/shared/ui/shadcn-ui/**/*.{ts,tsx}"],
		rules: {
			"@typescript-eslint/naming-convention": "off",
			"@typescript-eslint/no-explicit-any": "off"
		}
	},

	{
		files: ["**/*.d.ts"],
		rules: { "@typescript-eslint/naming-convention": "off" }
	},

	{
		files: ["*.config.{ts,js,mjs}"],
		languageOptions: { globals: globals.node },
		rules: {
			"@typescript-eslint/no-require-imports": "off",
			"no-console": "off"
		}
	}
]);
