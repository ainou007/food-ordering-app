import { Montserrat } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";
import { getCurrentLocale } from "@/locales/server";

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
      <body className={`${currentLangue === "ar" ? cairo.className : montserrat.className} font-medium`}>{children}</body>
    </html>
  );
}
