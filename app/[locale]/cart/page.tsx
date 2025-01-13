"use client";
import { Button } from "@/components/ui/button";
import { CartItemType, clearCart, decrementQuantity, incrementQuantity, removeFromCart, selectCartItems } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Frown, HeartCrack, ListRestart, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import CartSummury from "./cart-summury";
import { toast } from "sonner";
import { confirm } from "@/components/confirm/confirm-global";

const CartPage = () => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const clearCartHandler = async () => {
    if (await confirm({ title: "Vider le panier" })) {
      dispatch(clearCart());
    }
  };

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
  const removeFromCartHandler = async (item: CartItemType) => {
    if (await confirm({ title: `Supprimer ${item.name} du panier` })) {
      dispatch(removeFromCart(item));
      toast.success(item.name + "est bien supprimer du panier");
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
                <div key={JSON.stringify(item)} className="grid grid-cols-12 items-center rounded-lg p-3 shadow-app">
                  <div className="relative col-span-2 h-24 overflow-hidden">
                    <Image src={item.image} className="rounded-lg object-cover" fill alt={item.name} />
                  </div>

                  <div className="col-span-5 ms-2">
                    <h3 className="font-semibold uppercase">
                      {item.name}

                      <span className="text-xs"> ({item.sizes ? "" : item.basePrice} MAD)</span>
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      {item.sizes && (
                        <p>
                          ({item.sizes.sizesList.find((size) => size.id === item.sizes?.activeSize)?.name}{" "}
                          {item.sizes.sizesList.find((size) => size.id === item.sizes?.activeSize)?.price}
                          {"MAD "})
                        </p>
                      )}
                      {item.extras && (
                        <p>
                          {item.extras.extrasList.map((ex, index) => {
                            if (item.extras?.activeExtra.includes(ex.id)) {
                              return (
                                <span key={index}>
                                  {ex.name}({ex.price} MAD) {index < item.extras.activeExtra.length && " + "}
                                </span>
                              );
                            }
                          })}{" "}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-center">
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
                  </div>

                  <div className="col-span-2 flex items-center justify-center font-semibold"> {item.totalPrice.toFixed(2)} MAD</div>

                  <div className="col-span-1 flex justify-end">
                    <Button
                      onClick={() => {
                        removeFromCartHandler(item);
                      }}
                      variant={"outline"}
                      size={"sm"}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
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
