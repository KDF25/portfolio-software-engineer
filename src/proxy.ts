import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { routing } from "./shared/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/** Картинки соцсетей отдаются как есть: редирект /en → / сломал бы их URL */
const SOCIAL_IMAGE_PATH = /\/(opengraph|twitter)-image(\/|$)/;

export function proxy(request: NextRequest) {
	if (SOCIAL_IMAGE_PATH.test(request.nextUrl.pathname)) {
		return NextResponse.next();
	}

	return handleI18nRouting(request);
}

export const config = {
	matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"]
};
