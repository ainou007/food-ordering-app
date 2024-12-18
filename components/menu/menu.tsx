import MenuItem from "@/components/menu/menu-item";
import { MenuItemType } from "@/components/menu/types";

const Menu = ({ items }: { items: MenuItemType[] }) => {
  return items.map((item) => <MenuItem key={item.id} item={item} />);
};
export default Menu;
