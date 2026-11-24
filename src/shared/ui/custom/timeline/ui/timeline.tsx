import { cn } from "@/shared/lib";

import { TagChip } from "../../tag-chip";

export interface ITimelineStep {
	title: string;
	text: string;
	tools: string;
}

interface ITimelineProps {
	steps: ITimelineStep[];
	label: string;
}

/**
 * Горизонтальный таймлайн: точка и заголовок по центру шага,
 * линия идёт только между точками; на телефоне — вертикально
 */
export const Timeline = ({ steps, label }: ITimelineProps) => (
	<ol aria-label={label} className="grid grid-cols-1 md:grid-cols-5">
		{steps.map(({ title, text, tools }, index) => {
			const isLast = index === steps.length - 1;

			return (
				<li
					key={title}
					className="relative pb-7 pl-10 md:px-3 md:pt-10 md:pb-0 md:pl-3 md:text-center"
				>
					{!isLast && (
						<span
							aria-hidden="true"
							className="absolute top-5 left-2.5 h-full w-0.5 bg-success md:top-2.5 md:left-1/2 md:h-0.5 md:w-full"
						/>
					)}
					<span
						aria-hidden="true"
						className={cn(
							"absolute top-0 left-0 z-10 size-5 rounded-full border-2 border-success md:left-1/2 md:-translate-x-1/2",
							isLast ? "bg-success" : "bg-background"
						)}
					/>
					<h4 className="font-display text-xl font-semibold">
						{title}
					</h4>
					<p className="mt-2 text-sm text-muted-foreground">{text}</p>
					<TagChip variant="success" className="mt-3">
						{tools}
					</TagChip>
				</li>
			);
		})}
	</ol>
);
