"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";

const AddToCartDialog = () => {
  return (
    <Dialog open={false}>
      {/* https://github.com/shadcn-ui/ui/issues/1871#issuecomment-2045094819 */}
      {/* https://github.com/shadcn-ui/ui/issues/1712#issuecomment-1758661015 */}
      <DialogContent
        className="max-w-4xl p-0"
        hiddenCloseButton
        onInteractOutside={() => {
          alert("outside");
        }}
      >
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className="grid grid-cols-12 gap-3">
          <div className="relative col-span-4 overflow-hidden">
            <Image src="https://www.hayaku.ma/cdn/shop/files/WhatsAppImage2024-07-16at17.49.19_1024x1024@2x.jpg" fill alt="" className="rounded-s-md object-cover object-center" />
          </div>
          <div className="col-span-8 space-y-4 p-3">
            <h3 className="text-xl font-bold text-gray-600">Burger</h3>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae beatae incidunt, maiores temporibus sit quam</p>
            <Separator className="my-5" />
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-700">Sizes</h4>
              <div className="flex gap-3">
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Small{" "}
                  <span className="text-xs">
                    11.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Medium{" "}
                  <span className="text-xs">
                    19.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>{" "}
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Large{" "}
                  <span className="text-xs">
                    20.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-5" />
            <div>
              <h4 className="mb-2 text-sm font-bold text-gray-700">Extras</h4>
              <div className="flex flex-wrap gap-3">
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Fromage{" "}
                  <span className="text-xs">
                    +2.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Poulet{" "}
                  <span className="text-xs">
                    +2.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Frites{" "}
                  <span className="text-xs">
                    +2.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
                <div className="cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium text-gray-600 transition-all duration-700 ease-in-out hover:bg-primary hover:text-white">
                  Dinde fumée{" "}
                  <span className="text-xs">
                    +2.99<span className="text-[9px]">MAD</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size={"sm"}>
                {" "}
                <ShoppingCart /> Add to cart
              </Button>
              <Button size={"sm"} variant={"outline"}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
