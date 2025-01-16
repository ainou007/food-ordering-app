import { NavLink } from "@/types/nav-link";
import { aboutUs, contactUs, menu } from "./routes";

export const navLinks: NavLink[] = [
  {
    label: "menu",
    href: menu,
  },
  {
    label: "about",
    href: aboutUs,
  },
  {
    label: "contact",
    href: contactUs,
  },
];
