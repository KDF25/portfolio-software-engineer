import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";
import { TagChip } from "@/shared/ui";

import { ENUM_CAPABILITY_SIZE, type ENUM_CAPABILITY_SIZE_TYPE } from "../model";

const SIZE_CLASS: Record<ENUM_CAPABILITY_SIZE_TYPE, string> = {
	[ENUM_CAPABILITY_SIZE.FEATURE]: "sm:col-span-2 lg:row-span-2",
	[ENUM_CAPABILITY_SIZE.WIDE]: "sm:col-span-2",
	[ENUM_CAPABILITY_SIZE.DEFAULT]: ""
};

interface ICapabilityCardProps {
	icon: LucideIcon;
	title: string;
	text: string;
	tags: string[];
	size: ENUM_CAPABILITY_SIZE_TYPE;
	children?: ReactNode;
}

/** Одна карточка на все направления: размер и содержимое приходят из конфига */
export const CapabilityCard = ({
	icon: Icon,
	title,
	text,
	tags,
	size,
	children
}: ICapabilityCardProps) => (
	<article
		className={cn(
			"flex flex-col gap-3 rounded-2xl border bg-card p-6 transition-colors hover:border-success/60",
			SIZE_CLASS[size]
		)}
	>
		<Icon
			className="size-9 text-success"
			strokeWidth={1.6}
			aria-hidden="true"
		/>
		<h3 className="font-display text-xl font-semibold">{title}</h3>
		<p className="text-muted-foreground">{text}</p>
		{children}
		<ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
			{tags.map((tag) => (
				<li key={tag}>
					<TagChip>{tag}</TagChip>
				</li>
			))}
		</ul>
	</article>
);
