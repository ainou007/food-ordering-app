"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const AddToCartButton = () => {
  return (
    <Button
      onClick={() => {
        alert("Added to cart");
      }}
    >
      <ShoppingCart /> Add to Card
    </Button>
  );
};

export default AddToCartButton;
