"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { CartItemType, setActiveItem } from "@/store/cartSlice";
import { useI18n } from "@/locales/client";

const AddToCartButton = ({ togleDialog, item }: { togleDialog: () => void; item: CartItemType }) => {
  const dispatch = useAppDispatch();
  const t = useI18n();

  const handleAddToCart = () => {
    dispatch(setActiveItem(item));
    togleDialog();
  };

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart /> {t("Menu.addToCart")}
    </Button>
  );
};

export default AddToCartButton;
