import MenuItem from "@/components/menu/menu-item";
import { MenuItemType } from "@/components/menu/types";
import AddToCartDialog from "./add-to-cart-dialog";

const Menu = ({ items }: { items: MenuItemType[] }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
      <AddToCartDialog />
    </div>
  );
};
export default Menu;
