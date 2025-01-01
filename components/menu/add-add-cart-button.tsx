"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { CartItemType, setActiveItem } from "@/store/cartSlice";

const AddToCartButton = ({
  togleDialog,
  open,
  item,
}: {
  togleDialog: () => void;
  open: boolean;
  item: CartItemType;
}) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    togleDialog();
    dispatch(
      setActiveItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        sizes: item.sizes,
        extras: item.extras,
        quantity: item.quantity,
      }),
    );
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart /> Add to Card
    </Button>
  );
};

export default AddToCartButton;
