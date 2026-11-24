import Image from "next/image";

import { cn } from "@/shared/lib";

export const LOGO_SRC = "/images/logo.png";

interface ILogoProps {
	className?: string;
}

export const Logo = ({ className }: ILogoProps) => (
	<Image
		src={LOGO_SRC}
		alt=""
		width={32}
		height={32}
		className={cn("size-8 rounded-md", className)}
	/>
);
