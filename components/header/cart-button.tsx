"use client";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "../global/link";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/cartSlice";
import { useI18n } from "@/locales/client";

const CartButton = () => {
  const items = useAppSelector(selectCartItems);
  const t = useI18n();
  
  return (
    <Link href={"/cart"} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "relative ms-2")} aria-label={t("Cart.title")}>
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
