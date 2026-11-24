import { Bot, Layers, type LucideIcon, ShieldCheck } from "lucide-react";

import { type TMainKeys, i18nKey } from "@/shared/config";
import {
	ENUM_METRIC_DIRECTION,
	type ENUM_METRIC_DIRECTION_TYPE
} from "@/shared/ui";

const key = i18nKey<TMainKeys>();

export interface IExperienceItem {
	text: TMainKeys;
	direction: ENUM_METRIC_DIRECTION_TYPE;
}

export interface IExperienceGroup {
	id: string;
	icon: LucideIcon;
	title: TMainKeys;
	items: IExperienceItem[];
}

const { UP, DOWN, SCALE } = ENUM_METRIC_DIRECTION;

export const EXPERIENCE_GROUPS: IExperienceGroup[] = [
	{
		id: "reliability",
		icon: ShieldCheck,
		title: key("experience.groups.reliability.title"),
		items: [
			{
				text: key("experience.groups.reliability.items.wallet"),
				direction: SCALE
			},
			{
				text: key("experience.groups.reliability.items.claim"),
				direction: DOWN
			},
			{
				text: key("experience.groups.reliability.items.sync"),
				direction: DOWN
			},
			{
				text: key("experience.groups.reliability.items.orders"),
				direction: SCALE
			},
			{
				text: key("experience.groups.reliability.items.drafts"),
				direction: DOWN
			}
		]
	},
	{
		id: "ai",
		icon: Bot,
		title: key("experience.groups.ai.title"),
		items: [
			{ text: key("experience.groups.ai.items.voice"), direction: UP },
			{ text: key("experience.groups.ai.items.mcp"), direction: DOWN },
			{ text: key("experience.groups.ai.items.proofs"), direction: DOWN },
			{ text: key("experience.groups.ai.items.esign"), direction: DOWN }
		]
	},
	{
		id: "architecture",
		icon: Layers,
		title: key("experience.groups.architecture.title"),
		items: [
			{
				text: key("experience.groups.architecture.items.mfe"),
				direction: DOWN
			},
			{
				text: key("experience.groups.architecture.items.dashboard"),
				direction: DOWN
			},
			{
				text: key("experience.groups.architecture.items.deposits"),
				direction: UP
			},
			{
				text: key("experience.groups.architecture.items.ssr"),
				direction: DOWN
			},
			{
				text: key("experience.groups.architecture.items.pwa"),
				direction: DOWN
			}
		]
	}
];
