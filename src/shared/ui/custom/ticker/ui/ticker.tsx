export interface ITickerItem {
	event: string;
	fix: string;
}

interface ITickerProps {
	items: ITickerItem[];
	label: string;
}

const TickerRow = ({
	items,
	hidden
}: {
	items: ITickerItem[];
	hidden?: boolean;
}) =>
	items.map(({ event, fix }) => (
		<span key={event} aria-hidden={hidden || undefined}>
			<span className="text-danger">{event}</span> →{" "}
			<span className="text-success">{fix}</span>
		</span>
	));

/** Бегущая строка: две копии ряда сдвигаются на половину ширины без шва */
export const Ticker = ({ items, label }: ITickerProps) => (
	<div
		aria-label={label}
		className="flex h-ticker items-center overflow-hidden border-t"
	>
		<div className="ticker-track flex w-max flex-none animate-ticker gap-12 font-mono text-sm whitespace-nowrap text-muted-foreground [&>span]:flex-none">
			<TickerRow items={items} />
			<TickerRow items={items} hidden />
		</div>
	</div>
);
