import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

interface ISectionHeadingProps {
	id: string;
	title: ReactNode;
	note?: ReactNode;
	className?: string;
}

export const SectionHeading = ({
	id,
	title,
	note,
	className
}: ISectionHeadingProps) => (
	<div
		className={cn(
			"mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 md:mb-12",
			className
		)}
	>
		<h2 id={id} className="font-display text-section font-semibold">
			{title}
		</h2>
		{note && (
			<p className="max-w-xl text-sm text-muted-foreground">{note}</p>
		)}
	</div>
);
