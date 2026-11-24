export interface IFailureRow {
	cause: string;
	effect: string;
}

interface IFailureTableProps {
	rows: IFailureRow[];
}

/** Причина → последствие: последствие подсвечено цветом отказа */
export const FailureTable = ({ rows }: IFailureTableProps) => (
	<ul className="mt-1 divide-y overflow-hidden rounded-lg border">
		{rows.map(({ cause, effect }) => (
			<li
				key={cause}
				className="grid grid-cols-1 gap-0 px-3 py-2 text-sm sm:grid-cols-2 sm:gap-2.5"
			>
				<span className="text-soft">{cause}</span>
				<span className="text-danger">{effect}</span>
			</li>
		))}
	</ul>
);
