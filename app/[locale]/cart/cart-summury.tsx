import Link from "@/components/global/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTotalPrice, selectCartItems } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { LaptopMinimalCheck, ListRestart, ShoppingCart } from "lucide-react";
import React from "react";

const CartSummury = () => {
  const totalCartPrice = useAppSelector(getTotalPrice);
  const cart = useAppSelector(selectCartItems);

  return (
    <div className="col-span-4 rounded-xl shadow-app">
      <div className="p-5">
        <h3 className="text-2xl font-semibold">Rèsumè du panier</h3>
        <Separator className="my-3" />
        {cart.map((item, index) => (
          <div key={index}>
            <div className="mt-5 flex items-center justify-between text-xs">
              <div>
                <p className="mb-0 font-bold">
                  {item.quantity} - {item.name}
                  {item.sizes && " ("}
                  {item.sizes &&
                    item.sizes.sizesList.find((i) => {
                      if (i.id === item.sizes?.activeSize) {
                        return i;
                      }
                    })?.name}
                  {item.sizes && ")"}
                </p>
                {item.extras && (
                  <p>
                    {item.extras.extrasList.map((ex, index) => {
                      if (item.extras?.activeExtra.includes(ex.id)) {
                        return (
                          <span key={ex.id}>
                            {ex.name}({ex.price} MAD) {index < item.extras.activeExtra.length && " + "}
                          </span>
                        );
                      }
                    })}{" "}
                  </p>
                )}
              </div>
              <p className="font-bold">
                {item.totalPrice.toFixed(2)} <span>MAD</span>
              </p>
            </div>
            <Separator className="my-3" />
          </div>
        ))}
        <div className="mt-5 flex justify-between font-bold">
          <span>Le prix totale du panier</span>
          <span> {totalCartPrice.toFixed(2)} MAD</span>
        </div>
        <div className="mt-5 flex gap-2">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            <LaptopMinimalCheck />
            Paiement
          </Link>
          <Link href="/menu" className={buttonVariants({ variant: "outline" })}>
            <ShoppingCart />
            continuer les achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummury;
