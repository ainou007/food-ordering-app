// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { authRoutes, privateRoutes } from "./auth/routes";
import { getToken } from "next-auth/jwt";
import { RoleEnum } from "./drizzle/schema";

export type LocaleType = "en" | "fr" | "ar";
const locales: LocaleType[] = ["en", "fr", "ar"];
const defaultLocale: LocaleType = locales[0];
const I18nMiddleware = createI18nMiddleware({ locales, defaultLocale });

const middleware = withAuth(
  async function (request: NextRequestWithAuth) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;
    const aPathname = pathname.split("/");

    const isAdminRoute = pathname.endsWith("/admin");

    console.log("Role is: ", token?.role === RoleEnum.ADMIN);
    console.log("Role is: ", token?.role);

    if (!token && isAdminRoute) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
    if (token && isAdminRoute && token.role !== RoleEnum.ADMIN) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    const isPrivateRoute = privateRoutes.includes(pathname) || (locales.some((locale) => locale === aPathname[1]) && privateRoutes.includes(aPathname[2]));
    if (!token && isPrivateRoute) return NextResponse.redirect(new URL("/login", request.url));

    const isAuthRoute = authRoutes.includes(pathname) || (locales.some((locale) => locale === aPathname[1]) && authRoutes.includes(aPathname[2]));
    if (token && isAuthRoute) return NextResponse.redirect(new URL("/profile", request.url));

    return I18nMiddleware(request);
  },
  {
    callbacks: {
      async authorized(token) {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};

export default middleware;
