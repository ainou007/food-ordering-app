import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { confirm } from "@/components/confirm/confirm-global";
import { CartItemType, removeFromCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";

const DeleteItem = ({ item }: { item: CartItemType }) => {
  console.log("re-rendred");
  const dispatch = useAppDispatch();

  const removeFromCartHandler = async (item: CartItemType) => {
    if (await confirm({ title: `Supprimer ${item.name} du panier` })) {
      dispatch(removeFromCart(item));
      toast.success(item.name + "est bien supprimer du panier");
    }
  };
  return (
    <Button
      onClick={() => {
        removeFromCartHandler(item);
      }}
      variant={"outline"}
      size={"sm"}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteItem;
