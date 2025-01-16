import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";
import ReduxProvider from "@/provides/redux-provider";
import { Toaster } from "@/components/ui/sonner";
import ConfirmGlobal from "@/components/confirm/confirm-global";
import LocaProvider from "@/provides/local-provider";
import { getCurrentLocale } from "@/locales/server";

const roboto = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const currentLangue = await getCurrentLocale();
  const locale = (await params).locale;
  return (
    <html lang={currentLangue} dir={currentLangue === "ar" ? "rtl" : "ltr"}>
      <body className={`${roboto.className} `}>
        <ReduxProvider>
          <LocaProvider locale={locale}>
            <Header />
            {children}
            <Toaster position={currentLangue === "ar" ? "bottom-left" : "bottom-right"} expand richColors />
            <ConfirmGlobal />
            <Footer />
          </LocaProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
