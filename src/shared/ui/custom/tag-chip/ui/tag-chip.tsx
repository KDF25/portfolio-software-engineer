import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib";

export const tagChipVariants = cva(
	"inline-flex items-center rounded-md font-mono whitespace-nowrap",
	{
		variants: {
			variant: {
				muted: "bg-muted text-soft",
				outline: "border text-soft",
				success:
					"border border-success/45 bg-success-soft text-success",
				danger: "border border-danger/45 bg-danger-soft text-danger"
			},
			size: {
				sm: "px-2 py-0.5 text-xs",
				md: "px-2.5 py-1 text-sm",
				lg: "px-2.5 py-1 text-base"
			}
		},
		defaultVariants: { variant: "muted", size: "sm" }
	}
);

export type TTagChipVariant = NonNullable<
	VariantProps<typeof tagChipVariants>["variant"]
>;

interface ITagChipProps extends VariantProps<typeof tagChipVariants> {
	children: ReactNode;
	className?: string;
}

export const TagChip = ({
	variant,
	size,
	className,
	children
}: ITagChipProps) => (
	<span className={cn(tagChipVariants({ variant, size }), className)}>
		{children}
	</span>
);
