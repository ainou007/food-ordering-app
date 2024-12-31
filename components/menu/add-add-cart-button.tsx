"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const AddToCartButton = ({ togleDialog }: { togleDialog: () => void }) => {
  return (
    <Button onClick={togleDialog}>
      <ShoppingCart /> Add to Card
    </Button>
  );
};

export default AddToCartButton;
