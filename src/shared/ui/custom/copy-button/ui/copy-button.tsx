"use client";

import { useEffect, useState } from "react";

import { Button } from "../../../shadcn-ui";

interface ICopyButtonProps {
	value: string;
	label: string;
	copiedLabel: string;
}

const RESET_DELAY_MS = 1800;

export const CopyButton = ({ value, label, copiedLabel }: ICopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const timer = setTimeout(() => setIsCopied(false), RESET_DELAY_MS);

		return () => clearTimeout(timer);
	}, [isCopied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setIsCopied(true);
		} catch {
			setIsCopied(false);
		}
	};

	return (
		<Button
			type="button"
			variant="outline"
			className="h-11 font-mono text-xs"
			onClick={handleCopy}
			aria-live="polite"
		>
			{isCopied ? copiedLabel : label}
		</Button>
	);
};
