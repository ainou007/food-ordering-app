import { Button } from "@/components/ui/button";
import {
  CartItemType,
  decrementQuantity,
  incrementQuantity,
} from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { toast } from "sonner";

const CartItemQuantity = ({ item }: { item: CartItemType }) => {
  const dispatch = useAppDispatch();

  const incrementHandler = (item: CartItemType) => {
    dispatch(incrementQuantity(item));
    toast.success(`La quantités de ${item.name} est bien incrémenteur`);
  };

  const decrementHandler = (item: CartItemType) => {
    dispatch(decrementQuantity(item));
    if (item.quantity > 1) {
      toast.success(`La quantités de ${item.name} est bien décrémenter`);
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          incrementHandler(item);
        }}
        size={"sm"}
      >
        +
      </Button>{" "}
      <span className="mx-3 font-bold">{item.quantity}</span>
      <Button
        onClick={() => {
          decrementHandler(item);
        }}
        variant={"outline"}
        size={"sm"}
      >
        -
      </Button>
    </div>
  );
};

export default CartItemQuantity;
