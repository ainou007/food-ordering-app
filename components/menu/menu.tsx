"use client";
import MenuItem from "@/components/menu/menu-item";
import { MenuItemType } from "@/components/menu/types";
import AddToCartDialog from "./add-to-cart-dialog";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearActiveItem } from "@/store/cartSlice";

const Menu = ({ items }: { items: MenuItemType[] }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => {
    setOpen(false);
    dispatch(clearActiveItem());
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuItem key={item.id} openAddToCartDialog={openDialog} item={item} />
      ))}

      <AddToCartDialog open={open} closeAddToCartDialog={closeDialog} />
    </div>
  );
};
export default Menu;
