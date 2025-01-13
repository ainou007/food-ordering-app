// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

export type LocaleType = "en" | "fr" | "ar";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr", "ar"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
