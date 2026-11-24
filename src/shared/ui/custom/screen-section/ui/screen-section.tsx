import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

interface IScreenSectionProps {
	id?: string;
	labelledBy?: string;
	className?: string;
	containerClassName?: string;
	children: ReactNode;
}

/** Глава страницы: занимает экран, контент по центру и в общей сетке ширины */
export const ScreenSection = ({
	id,
	labelledBy,
	className,
	containerClassName,
	children
}: IScreenSectionProps) => (
	<section
		id={id}
		aria-labelledby={labelledBy}
		className={cn(
			"min-h-screen-section flex flex-col justify-center border-t py-12 md:py-16",
			className
		)}
	>
		<div
			className={cn(
				"mx-auto w-full max-w-7xl px-5 md:px-10",
				containerClassName
			)}
		>
			{children}
		</div>
	</section>
);
