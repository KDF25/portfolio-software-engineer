"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps
} from "next-themes";

/** React 19 предупреждает об inline-скрипте при клиентском рендере — исполняемым он нужен только в SSR */
const getScriptProps = (): ThemeProviderProps["scriptProps"] =>
	typeof window === "undefined" ? undefined : { type: "application/json" };

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
	<NextThemesProvider
		attribute="class"
		defaultTheme="dark"
		enableSystem
		disableTransitionOnChange
		scriptProps={getScriptProps()}
		{...props}
	>
		{children}
	</NextThemesProvider>
);
