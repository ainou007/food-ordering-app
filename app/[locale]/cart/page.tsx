"use client";
import { Button } from "@/components/ui/button";
import { clearCart, selectCartItems } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HeartCrack, ListRestart } from "lucide-react";
import React from "react";
import CartSummury from "./cart-summury";
import { confirm } from "@/components/confirm/confirm-global";
import CartItem from "./cart-item";

const CartPage = () => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const clearCartHandler = async () => {
    if (await confirm({ title: "Vider le panier" })) {
      dispatch(clearCart());
    }
  };

  return (
    <main>
      {cart && cart.length ? (
        <div className="container mt-20">
          <div className="flex justify-end">
            <Button
              onClick={clearCartHandler}
              className="mb-2"
              variant={"outline"}
            >
              <ListRestart />
              Vider le panier
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 flex flex-col gap-2">
              {cart.map((item) => (
                <CartItem key={JSON.stringify(item)} item={item} />
              ))}
            </div>
            <CartSummury />
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-72px-105px)] select-none flex-col items-center justify-center text-center text-3xl text-gray-300">
          <HeartCrack size={180} />
          <p className="mt-5">Votre panier est vide</p>
        </div>
      )}
    </main>
  );
};
export default CartPage;
