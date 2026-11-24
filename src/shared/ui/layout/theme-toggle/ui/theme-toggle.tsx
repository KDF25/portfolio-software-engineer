"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "../../../shadcn-ui";

/**
 * На сервере тема неизвестна: иконку выбирает CSS по классу .dark,
 * поэтому нет ни mounted-состояния, ни рассинхрона гидрации
 */
export const ThemeToggle = () => {
	const t = useTranslations("common");
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			aria-label={t("theme_toggle.label")}
			onClick={() =>
				setTheme(resolvedTheme === "dark" ? "light" : "dark")
			}
		>
			<Moon className="dark:hidden" />
			<Sun className="hidden dark:block" />
		</Button>
	);
};
