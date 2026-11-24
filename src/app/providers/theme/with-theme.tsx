import type { ComponentType, FC } from "react";

import { ThemeProvider } from "./theme.provider";

export const withTheme = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithTheme: FC<P> = (props) => (
		<ThemeProvider>
			<Component {...props} />
		</ThemeProvider>
	);

	WithTheme.displayName = `withTheme(${Component.displayName || Component.name || "Component"})`;

	return WithTheme;
};
