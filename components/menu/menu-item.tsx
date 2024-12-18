import Link from "@/components/global/link";
import { MenuItemType } from "@/components/menu/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className="shadow-app hover:shadow-hover overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:scale-105">
      <div className="relative h-48">
        <Image
          src={item.image}
          alt={item.image}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex justify-between text-xl font-bold text-gray-700">
          <h3 className="">{item.name}</h3>
          <p>
            {" "}
            {item.price} <small className="text-sm">MAD</small>{" "}
          </p>
        </div>
        <p className="text-muted-foreground">{item.description}</p>
        <Link href="" className={cn(buttonVariants({ variant: "default" }))}>
          <ShoppingCart /> Add to Card
        </Link>
      </div>
    </div>
  );
};
export default MenuItem;
