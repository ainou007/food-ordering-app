"use client";
import { Button } from "@/components/ui/button";
import { clearCart, selectCartItems } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HeartCrack, ListRestart } from "lucide-react";
import React from "react";
import CartSummury from "./cart-summury";
import { confirm } from "@/components/confirm/confirm-global";
import CartItem from "./cart-item";
import CartEmpty from "./cart-empty";

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
            <Button onClick={clearCartHandler} className="mb-2" variant={"outline"}>
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
        <CartEmpty />
      )}
    </main>
  );
};
export default CartPage;
