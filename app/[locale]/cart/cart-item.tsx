import Image from "next/image";
import React from "react";
import { CartItemType } from "@/store/cartSlice";
import DeleteItem from "./delete-item";
import CartItemQuantity from "./cart-item-quantity";
import CartItemSizes from "./cart-item-sizes";
import CartItemExtras from "./cart-item-extras";

const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <div className="grid grid-cols-12 items-center rounded-lg p-3 shadow-app">
      <div className="relative col-span-2 h-24 overflow-hidden">
        <Image
          src={item.image}
          className="rounded-lg object-cover"
          fill
          alt={item.name}
        />
      </div>

      <div className="col-span-5 ms-2">
        <h3 className="font-semibold uppercase">
          {item.name}
          <span className="text-xs">
            (
            {item.sizes
              ? (item.sizes?.sizesList.find(
                  (i) => i.id === item.sizes?.activeSize,
                )?.price ?? item.basePrice)
              : item.basePrice}{" "}
            MAD)
          </span>
        </h3>
        <div className="text-xs text-muted-foreground">
          <CartItemSizes item={item} />
          <CartItemExtras item={item} />
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <CartItemQuantity item={item} />
      </div>

      <div className="col-span-2 flex items-center justify-center font-semibold">
        {item.totalPrice.toFixed(2)} MAD
      </div>
      <div className="col-span-1 flex justify-end">
        <DeleteItem item={item} />
      </div>
    </div>
  );
};

export default CartItem;
