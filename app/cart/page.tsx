"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { selectCartItems } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { ShoppingCart, Trash2, Wallet } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartPage = () => {
  const cart = useAppSelector(selectCartItems);
  const list = ["a", "b", "c"];
  return (
    <main>
      <div className="container mt-20">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 flex flex-col gap-5">
            {list.map((item) => (
              <div key={item} className="grid grid-cols-12 items-center gap-5 rounded-lg p-3 shadow-app">
                <div className="relative col-span-2 h-24 overflow-hidden">
                  <Image src="https://www.visitmorocco.com/sites/default/files/ghriba.jpg" className="rounded-lg object-cover" fill alt="" />
                </div>
                <div className="col-span-4">
                  <h3 className="text-lg font-semibold">Ghriba </h3>
                  <div className="text-xs text-muted-foreground">
                    <p>Size: Small(9.33MAD) </p>
                    <p>Extras: Fromage(1.99MAD) + Frites(1.99) </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <Button size={"sm"}>+</Button> <span className="mx-3 font-bold">4</span>
                  <Button variant={"outline"} size={"sm"}>
                    -
                  </Button>
                </div>
                <div className="col-span-2 font-semibold">21MAD</div>
                <div className="col-span-2">
                  {" "}
                  <Button variant={"outline"} size={"sm"}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-4 rounded-lg shadow-app">
            <div className="p-5">
              <h3 className="text-lg font-semibold">Cart Summary</h3>
              <Separator className="my-3" />
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="mb-0">Ghriba(Small)</p>

                  <span className="text-xs">Extras: (Fromage: 1.99)</span>
                </div>
                <p> 21MAD</p>
              </div>
              {/* <div className="mt-5 flex justify-between">
                <span>Delivery</span>
                <span> 5MAD</span>
              </div> */}
              <Separator className="my-3" />
              <div className="mt-5 flex justify-between">
                <span>Total</span>
                <span> 26MAD</span>
              </div>
              <div className="mt-5">
                <Button variant={"default"}>
                  <ShoppingCart />
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
