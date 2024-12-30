import React from "react";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  return (
    <Link href={"/cart"} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "relative")}>
      <ShoppingCart />
      <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">18</span>
    </Link>
  );
};

export default CartButton;
