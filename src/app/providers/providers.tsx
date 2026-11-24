import { NextIntlClientProvider } from "next-intl";
import type { FC, ReactNode } from "react";

import { withTheme } from "./theme";

type TProvidersProps = {
	children: ReactNode;
};

/** locale, messages и timeZone next-intl берёт из shared/i18n/request.ts */
const BaseProviders: FC<TProvidersProps> = ({ children }) => (
	<NextIntlClientProvider>{children}</NextIntlClientProvider>
);

export const Providers = withTheme(BaseProviders);
