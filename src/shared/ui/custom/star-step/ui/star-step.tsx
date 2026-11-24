import type { ReactNode } from "react";

import { IconCircle } from "../../icon-circle";

interface IStarStepProps {
	marker: ReactNode;
	title: ReactNode;
	tone?: "default" | "success";
	children: ReactNode;
}

/** Шаг с маркером в кружке: буква STAR, иконка навыка и т. п. */
export const StarStep = ({
	marker,
	title,
	tone = "default",
	children
}: IStarStepProps) => (
	<div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3.5">
		<IconCircle tone={tone}>{marker}</IconCircle>
		<div className="flex flex-col gap-2">
			<h4 className="mt-1 text-base font-semibold">{title}</h4>
			{children}
		</div>
	</div>
);
