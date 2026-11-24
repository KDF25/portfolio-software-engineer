import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

interface IIconCircleProps {
	children: ReactNode;
	tone?: "default" | "success";
	className?: string;
}

/** Кружок с иконкой или буквой — маркер шага, пункта или ссылки */
export const IconCircle = ({
	children,
	tone = "default",
	className
}: IIconCircleProps) => (
	<span
		aria-hidden="true"
		className={cn(
			"grid size-8 shrink-0 place-items-center rounded-full border font-mono text-xs font-medium [&_svg]:size-4",
			tone === "success" && "border-success text-success",
			className
		)}
	>
		{children}
	</span>
);
