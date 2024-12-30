import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";

const roboto = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
