import {
	ArrowLeftRight,
	FileText,
	Flag,
	type LucideIcon,
	TrendingUp
} from "lucide-react";

import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

export interface IAboutItem {
	id: string;
	title: TMainKeys;
	text: TMainKeys;
}

export interface IWorkStyleItem extends IAboutItem {
	icon: LucideIcon;
}

export const ABOUT_PATH = [key("about.path.first"), key("about.path.second")];

export const WORK_STYLE_ITEMS: IWorkStyleItem[] = [
	{
		id: "autonomy",
		icon: Flag,
		title: key("about.work.items.autonomy.title"),
		text: key("about.work.items.autonomy.text")
	},
	{
		id: "business",
		icon: TrendingUp,
		title: key("about.work.items.business.title"),
		text: key("about.work.items.business.text")
	},
	{
		id: "writing",
		icon: FileText,
		title: key("about.work.items.writing.title"),
		text: key("about.work.items.writing.text")
	},
	{
		id: "bridging",
		icon: ArrowLeftRight,
		title: key("about.work.items.bridging.title"),
		text: key("about.work.items.bridging.text")
	}
];

export const OUTSIDE_ITEMS: IAboutItem[] = [
	{
		id: "psychology",
		title: key("about.outside.items.psychology.title"),
		text: key("about.outside.items.psychology.text")
	},
	{
		id: "systems",
		title: key("about.outside.items.systems.title"),
		text: key("about.outside.items.systems.text")
	},
	{
		id: "products",
		title: key("about.outside.items.products.title"),
		text: key("about.outside.items.products.text")
	}
];
