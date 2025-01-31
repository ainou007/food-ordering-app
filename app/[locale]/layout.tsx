import { Montserrat } from "next/font/google";
import { Cairo } from "next/font/google";
import "../globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/provides/redux-provider";
import { Toaster } from "@/components/ui/sonner";
import ConfirmGlobal from "@/components/confirm/confirm-global";
import { getCurrentLocale } from "@/locales/server";
import NextAuthSessionProvider from "@/provides/next-auth-session-provider";
import LocaProvider from "@/provides/local-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentLangue = await getCurrentLocale();
  return (
    <html lang={currentLangue} dir={currentLangue === "ar" ? "rtl" : "ltr"}>
      <body className={`${currentLangue === "ar" ? cairo.className : montserrat.className} font-medium`}>
        <NextAuthSessionProvider>
          <ReduxProvider>
            <LocaProvider locale={currentLangue}>
              <Header />
              {children}
              <Toaster position={currentLangue === "ar" ? "bottom-left" : "bottom-right"} expand richColors />
              <ConfirmGlobal />
              <Footer />
            </LocaProvider>
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
