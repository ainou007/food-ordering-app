import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const CloseButton = ({ toggleNav }: { toggleNav: () => void }) => {
  return (
    <Button onClick={toggleNav} variant={"outline"} size={"icon"} className="absolute right-5 top-5 md:hidden">
      <X />
    </Button>
  );
};

export default CloseButton;
