"use client";
import React, { useState } from "react";
import Link from "../global/link";
import { navLinks } from "@/constants/nav-links";
import { Button, buttonVariants } from "../ui/button";
import { LogIn, MenuIcon, X } from "lucide-react";
import ChangeLang from "../global/change-lang";
import CartButton from "./cart-button";
import { usePathname } from "next/navigation";
import { useCurrentLocale, useI18n } from "@/locales/client";
import AuthButtons from "./auth-buttons";
import { Session } from "next-auth";
import CloseButton from "./close-button";
import BurgerButton from "./burger-button";

const Navbar = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const t = useI18n();

  const [imdobileNavOpen, setImdobileNavOpen] = useState(false);

  const toggleNav = () => {
    setImdobileNavOpen(!imdobileNavOpen);
  };

  return (
    <nav className="flex items-center gap-x-3">
      <div
        className={` ${imdobileNavOpen ? (locale === "ar" ? "left-0" : "right-0") : locale === "ar" ? "right-[100vw]" : "left-[100vw]"} fixed inset-0 h-screen w-screen border-e bg-white p-16 transition-all duration-500 ease-in-out md:static md:flex md:h-auto md:w-auto md:items-center md:border-none md:bg-transparent md:px-0 md:py-0`}
      >
        <div>
          <CloseButton toggleNav={toggleNav} />
        </div>
        <ul className="mb-5 me-8 flex flex-col gap-5 md:mb-0 md:flex-row">
          {navLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  className={`transition-all duration-200 ease-in-out hover:text-primary ${pathname.startsWith(`/${locale}${link.href}`) ? "font-black text-primary" : "font-medium text-foreground"} `}
                  href={link.href}
                >
                  {/* @ts-ignore */}
                  {t(`Navbar.${link.label}`)}
                </Link>
              </li>
            );
          })}
        </ul>
        <AuthButtons session={session} />
        <CartButton />
      </div>
      <BurgerButton toggleNav={toggleNav} />
      <ChangeLang />
    </nav>
  );
};

export default Navbar;
