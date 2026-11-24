import type common from "../../../../messages/ru/common.json";
import type main from "../../../../messages/ru/main.json";
import type notFound from "../../../../messages/ru/not_found.json";

import type {
	TCommonKeys,
	TMainKeys,
	TNS,
	TNotFoundKeys,
	TResources
} from "./i18n.config";
import type { TNestedKeyOf } from "./i18n.types";

/** Ошибка компиляции, если T не never — в сообщении видны проблемные ключи */
type TAssertNoKeys<T extends never> = T;

export const RU_TRANSLATION_CHECKER = {
	common: {} as typeof common,
	main: {} as typeof main,
	not_found: {} as typeof notFound
} satisfies TResources;

/** Каждый namespace из TResources обязан быть в NS — иначе он не загрузится */
export type TUnloadedNamespaces = TAssertNoKeys<Exclude<keyof TResources, TNS>>;

export type TRuCommonMissingKeys = TAssertNoKeys<
	Exclude<TCommonKeys, TNestedKeyOf<typeof common>>
>;
export type TRuCommonExtraKeys = TAssertNoKeys<
	Exclude<TNestedKeyOf<typeof common>, TCommonKeys>
>;

export type TRuMainMissingKeys = TAssertNoKeys<
	Exclude<TMainKeys, TNestedKeyOf<typeof main>>
>;
export type TRuMainExtraKeys = TAssertNoKeys<
	Exclude<TNestedKeyOf<typeof main>, TMainKeys>
>;

export type TRuNotFoundMissingKeys = TAssertNoKeys<
	Exclude<TNotFoundKeys, TNestedKeyOf<typeof notFound>>
>;
export type TRuNotFoundExtraKeys = TAssertNoKeys<
	Exclude<TNestedKeyOf<typeof notFound>, TNotFoundKeys>
>;
