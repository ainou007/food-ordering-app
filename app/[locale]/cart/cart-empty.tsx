import { HeartCrack } from "lucide-react";
import React from "react";

const CartEmpty = () => {
  return (
    <div className="flex h-[calc(100vh-72px-105px)] select-none flex-col items-center justify-center text-center text-3xl text-gray-300">
      <HeartCrack size={180} />
      <p className="mt-5">Votre panier est vide</p>
    </div>
  );
};

export default CartEmpty;
