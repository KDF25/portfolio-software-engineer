import { type TMainKeys, i18nKey } from "@/shared/config";

const key = i18nKey<TMainKeys>();

/** Пары «сбой → как система его обработала» для бегущей строки */
export const HERO_TICKER_ITEMS = [
	{
		event: key("hero.ticker.payout.event"),
		fix: key("hero.ticker.payout.fix")
	},
	{
		event: key("hero.ticker.claim.event"),
		fix: key("hero.ticker.claim.fix")
	},
	{
		event: key("hero.ticker.agent.event"),
		fix: key("hero.ticker.agent.fix")
	},
	{
		event: key("hero.ticker.crash.event"),
		fix: key("hero.ticker.crash.fix")
	},
	{
		event: key("hero.ticker.stale.event"),
		fix: key("hero.ticker.stale.fix")
	},
	{
		event: key("hero.ticker.prompt.event"),
		fix: key("hero.ticker.prompt.fix")
	}
];
