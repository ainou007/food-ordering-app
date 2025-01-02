"use client";
import React from "react";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/cartSlice";

const CartButton = () => {
  const items = useAppSelector(selectCartItems);
  return (
    <Link
      href={"/cart"}
      className={cn(buttonVariants({ variant: "outline", size: "icon" }), "relative")}
    >
      <ShoppingCart />
      {items.length > 0 && (
        <span className="absolute -right-2.5 -top-2.5 flex size-6 animate-bounce items-center justify-center rounded-full bg-primary p-1 text-center text-xs font-bold text-white">
          {items.length}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
