"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { CartItemType, setActiveItem } from "@/store/cartSlice";

const AddToCartButton = ({
  togleDialog,
  item,
}: {
  togleDialog: () => void;
  item: CartItemType;
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(setActiveItem(item));
    togleDialog();
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart /> Add to Card
    </Button>
  );
};

export default AddToCartButton;
