"use client";
import { MenuItemType } from "@/components/menu/types";
import { getExcerpt } from "@/utils/get-excerpt";
import Image from "next/image";
import AddToCartButton from "./add-add-cart-button";
import { CartItemType } from "@/store/cartSlice";
const MenuItem = ({ item, openAddToCartDialog }: { item: MenuItemType; openAddToCartDialog: () => void }) => {
  const { name, description, price, image } = item;
  const cartItem: CartItemType = {
    id: item.id,
    name: item.name,
    totalPrice: item.price,
    basePrice: item.price,
    image: item.image,
    description: item.description,
    sizes: item.sizes && {
      activeSize: item.sizes[0].id,
      sizesList: item.sizes,
    },
    extras: item.extras && {
      activeExtra: [],
      extrasList: item.extras,
    },
    quantity: 1,
  };
  return (
    <div className="overflow-hidden rounded-lg shadow-app transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-hover">
      <div className="relative h-64 overflow-hidden">
        <Image src={image} alt={image} width={1000} height={1000} className="h-full object-cover" />
        <div className="absolute bottom-2 left-2 rounded-md bg-primary/90 p-2 font-bold text-white">
          {price} <small className="text-sm">MAD</small>{" "}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex justify-between text-xl font-bold text-gray-700">
          <div>
            <h3 className="text-2xl">{name}</h3>
            <div className="flex space-x-2">
              {item.categories.map((category) => (
                <span key={category.id} className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">{getExcerpt(description, 200)}</p>
        <AddToCartButton item={cartItem} togleDialog={openAddToCartDialog} />
      </div>
    </div>
  );
};
export default MenuItem;
