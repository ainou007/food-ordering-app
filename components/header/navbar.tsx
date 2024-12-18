"use client";
import React, { useState } from "react";
import Link from "../global/link";
import { navLinks } from "@/constants/nav-links";
import { Button, buttonVariants } from "../ui/button";
import { LogIn, MenuIcon, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [imdobileNavOpen, setImdobileNavOpen] = useState(false);

  const toggleNav = () => {
    setImdobileNavOpen(!imdobileNavOpen);
  };

  return (
    <nav className="flex items-center gap-x-3">
      <div
        className={` ${imdobileNavOpen ? "left-0" : "-left-[100vw]"} fixed inset-0 h-screen w-screen border-e bg-white p-16 transition-all duration-500 ease-in-out md:static md:flex md:h-auto md:w-auto md:items-center md:border-none md:bg-transparent md:px-0 md:py-0`}
      >
        <div>
          <Button
            onClick={toggleNav}
            variant={"outline"}
            size={"icon"}
            className="absolute right-5 top-5 md:hidden"
          >
            <X />
          </Button>
        </div>
        <ul className="mb-5 me-8 flex flex-col gap-5 md:mb-0 md:flex-row">
          {navLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  className="font-medium transition-all duration-500 ease-in-out hover:text-primary"
                  href={link.href}
                >
                  {" "}
                  {link.label}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col gap-2 md:flex-row">
          <Link
            href=""
            className={`${cn(buttonVariants({ variant: "default" }), "w-fit")}`}
          >
            <LogIn /> Login
          </Link>
          <Link
            href=""
            className={`${cn(buttonVariants({ variant: "outline" }), "w-fit")}`}
          >
            Register
          </Link>
          <Button size={"icon"} variant={"outline"}>
            <ShoppingCart />
          </Button>
        </div>
      </div>
      <Button
        onClick={toggleNav}
        className="md:hidden"
        size={"icon"}
        variant={"outline"}
      >
        <MenuIcon />
      </Button>
    </nav>
  );
};

export default Navbar;
