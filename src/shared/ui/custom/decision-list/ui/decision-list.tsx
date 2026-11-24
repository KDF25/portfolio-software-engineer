import { cn } from "@/shared/lib";

export interface IDecision {
	title: string;
	note: string;
	accepted: boolean;
}

interface IDecisionListProps {
	items: IDecision[];
}

/** Решения: отброшенные зачёркнуты ✕, выбранные отмечены ✓ */
export const DecisionList = ({ items }: IDecisionListProps) => (
	<ul className="flex flex-col gap-2">
		{items.map(({ title, note, accepted }) => (
			<li
				key={title}
				className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 leading-snug"
			>
				<span
					aria-hidden="true"
					className={cn(
						"row-span-2 font-mono text-sm",
						accepted ? "text-success" : "text-danger"
					)}
				>
					{accepted ? "✓" : "✕"}
				</span>
				<span
					className={cn(
						"text-sm font-medium",
						!accepted &&
							"text-muted-foreground line-through decoration-danger"
					)}
				>
					{title}
				</span>
				<span className="text-sm text-muted-foreground">{note}</span>
			</li>
		))}
	</ul>
);
