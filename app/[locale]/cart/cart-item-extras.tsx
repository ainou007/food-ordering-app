import { CartItemType } from "@/store/cartSlice";
import React from "react";

const CartItemExtras = ({ item }: { item: CartItemType }) => {
  return (
    item.extras && (
      <p>
        {item.extras.extrasList.map((ex, index) => {
          if (item.extras?.activeExtra.includes(ex.id)) {
            return (
              <span key={index}>
                {ex.name}({ex.price} MAD){" "}
                {item.extras.activeExtra.length > 1 &&
                  index < item.extras.activeExtra.length &&
                  " + "}
              </span>
            );
          }
        })}{" "}
      </p>
    )
  );
};

export default CartItemExtras;
