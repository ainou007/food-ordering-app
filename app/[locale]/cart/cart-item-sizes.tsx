import { CartItemType } from "@/store/cartSlice";
import React from "react";

const CartItemSizes = ({ item }: { item: CartItemType }) => {
  return (
    item.sizes && (
      <p>
        (
        {
          item.sizes.sizesList.find(
            (size) => size.id === item.sizes?.activeSize,
          )?.name
        }{" "}
        {
          item.sizes.sizesList.find(
            (size) => size.id === item.sizes?.activeSize,
          )?.price
        }
        {"MAD "})
      </p>
    )
  );
};

export default CartItemSizes;
