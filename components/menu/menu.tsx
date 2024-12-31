"use client";
import MenuItem from "@/components/menu/menu-item";
import { MenuItemType } from "@/components/menu/types";
import AddToCartDialog from "./add-to-cart-dialog";
import { useState } from "react";

const Menu = ({ items }: { items: MenuItemType[] }) => {
  const [open, setOpen] = useState(false);
  const togleDialog = () => setOpen(!open);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuItem key={item.id} togleDialog={togleDialog} item={item} />
      ))}
      <AddToCartDialog open={open} togleDialog={togleDialog} />
    </div>
  );
};
export default Menu;
