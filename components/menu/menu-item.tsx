import Link from "@/components/global/link";
import { MenuItemType } from "@/components/menu/types";
import { getExcerpt } from "@/utils/get-excerpt";
import Image from "next/image";
import AddToCartButton from "./add-add-cart-button";

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-app transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-hover">
      <div className="relative h-48">
        <Image src={item.image} alt={item.image} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex justify-between text-xl font-bold text-gray-700">
          <div>
            <h3 className="">{item.name}</h3>
          </div>
          <p>
            {item.price} <small className="text-sm">MAD</small>{" "}
          </p>
        </div>
        <p className="text-xs font-bold text-muted-foreground">Ordred: {item.howManyOrdred} time </p>
        <p className="text-muted-foreground">{getExcerpt(item.description, 200)}</p>
        <AddToCartButton />
      </div>
    </div>
  );
};
export default MenuItem;
