import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { IconCircle } from "../../icon-circle";

interface ILinkRowProps {
	icon: LucideIcon;
	label: string;
	value: string;
	href: string;
	action?: ReactNode;
}

const isExternal = (href: string) => href.startsWith("http");

/** Строка-ссылка контакта: иконка, подпись, значение и стрелка */
export const LinkRow = ({
	icon: Icon,
	label,
	value,
	href,
	action
}: ILinkRowProps) => (
	<li className="flex items-center gap-2 border-b">
		<a
			href={href}
			target={isExternal(href) ? "_blank" : undefined}
			rel={isExternal(href) ? "noreferrer" : undefined}
			className="group -mx-2.5 grid flex-1 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl px-2.5 py-3.5 transition-colors hover:bg-success-soft"
		>
			<IconCircle className="size-11 text-success transition-colors group-hover:border-success">
				<Icon />
			</IconCircle>
			<span className="flex flex-col gap-0.5">
				<span className="text-xs text-muted-foreground">{label}</span>
				<span className="truncate font-mono text-base font-medium">
					{value}
				</span>
			</span>
			<span
				aria-hidden="true"
				className="text-lg text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-success"
			>
				↗
			</span>
		</a>
		{action}
	</li>
);
