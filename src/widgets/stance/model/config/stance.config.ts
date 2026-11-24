import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

export const STANCE_BADGES = [
	key("stance.badges.timezone"),
	key("stance.badges.agents"),
	key("stance.badges.payments"),
	key("stance.badges.harness"),
	key("stance.badges.ownership")
];

export const ENUM_FAILURE_MODE = {
	NETWORK: "network",
	RACE: "race",
	MODEL: "model"
} as const;

export type ENUM_FAILURE_MODE_TYPE =
	(typeof ENUM_FAILURE_MODE)[keyof typeof ENUM_FAILURE_MODE];

export interface IFailureModeConfig {
	id: ENUM_FAILURE_MODE_TYPE;
	title: TMainKeys;
	text: TMainKeys;
	link: TMainKeys;
	/** Якорь кейса, который раскрывает этот вид отказа */
	href: string;
}

export const FAILURE_MODES: IFailureModeConfig[] = [
	{
		id: ENUM_FAILURE_MODE.NETWORK,
		title: key("stance.modes.network.title"),
		text: key("stance.modes.network.text"),
		link: key("stance.modes.network.link"),
		href: "#case-payouts"
	},
	{
		id: ENUM_FAILURE_MODE.RACE,
		title: key("stance.modes.race.title"),
		text: key("stance.modes.race.text"),
		link: key("stance.modes.race.link"),
		href: "#case-claims"
	},
	{
		id: ENUM_FAILURE_MODE.MODEL,
		title: key("stance.modes.model.title"),
		text: key("stance.modes.model.text"),
		link: key("stance.modes.model.link"),
		href: "#case-agent"
	}
];
