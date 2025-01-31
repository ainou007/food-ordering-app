import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

const BurgerButton = ({ toggleNav }: { toggleNav: () => void }) => {
  return (
    <Button onClick={toggleNav} variant={"outline"} size={"icon"} className="absolute right-5 top-5 md:hidden">
      <MenuIcon />
    </Button>
  );
};

export default BurgerButton;
