import type common from "../../../../messages/en/common.json";
import type main from "../../../../messages/en/main.json";
import type notFound from "../../../../messages/en/not_found.json";

import type { TNestedKeyOf } from "./i18n.types";

/** Эталон ключей — английские JSON */
export type TCommon = typeof common;
export type TMain = typeof main;
export type TNotFound = typeof notFound;

export type TResources = {
	common: TCommon;
	main: TMain;
	not_found: TNotFound;
};

export const NS = [
	"common",
	"main",
	"not_found"
] as const satisfies readonly (keyof TResources)[];
export type TNS = (typeof NS)[number];

export type TCommonKeys = TNestedKeyOf<TCommon>;
export type TMainKeys = TNestedKeyOf<TMain>;
export type TNotFoundKeys = TNestedKeyOf<TNotFound>;
