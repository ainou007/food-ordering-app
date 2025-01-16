"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CartItemType, incrementQuantityActiveItem, decrementQuantityActiveItem, selectActiveItem, addActiveItemToCart } from "@/store/cartSlice";
import ProductSizes from "./product-sizes";
import ProductsExtras from "./products-extras";
import { toast } from "sonner";
import { useI18n } from "@/locales/client";

const AddToCartDialog = ({ open, closeAddToCartDialog }: { open: boolean; closeAddToCartDialog: () => void }) => {
  const item = useAppSelector(selectActiveItem) as CartItemType;
  const dispatch = useAppDispatch();
  const t = useI18n();

  return (
    <Dialog open={open} onOpenChange={closeAddToCartDialog}>
      {/* https://github.com/shadcn-ui/ui/issues/1871#issuecomment-2045094819 */}
      {/* https://github.com/shadcn-ui/ui/issues/1712#issuecomment-1758661015 */}

      <DialogContent className="max-h-[90vh] w-[90vw] max-w-4xl rounded-md p-0" hiddenCloseButton>
        <div className="max-h-[80vh] overflow-y-auto rounded-md">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle> {t("Cart.dialogTitle")} </DialogTitle>
              <DialogDescription>{t("Cart.dialogDescription")}</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <div className="grid grid-cols-12 gap-3 overflow-y-auto">
            <div className="relative col-span-full min-h-56 overflow-hidden rounded-md lg:col-span-4">
              <Image src={item?.image || "https://palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"} fill alt="" className="rounded-md object-cover object-center" />
            </div>
            <div className="col-span-full space-y-4 p-3 lg:col-span-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{item?.name}</h3>
                <p className="text-xl font-bold">
                  {" "}
                  {item?.totalPrice.toFixed(2)} {t("Menu.currency")}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
              {/* Sizes */}
              {item?.sizes && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <h4 className="mb-2 text-sm font-bold">{t("Cart.size")}</h4>
                    <div className="flex flex-wrap gap-3">
                      <ProductSizes activeSize={item.sizes.activeSize} sizes={item?.sizes.sizesList} />
                    </div>
                  </div>
                </>
              )}
              {/* Extras */}
              {item?.extras && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <h4 className="mb-2 text-sm font-bold">{t("Cart.extras")}</h4>
                    <div className="flex flex-wrap gap-3">
                      <ProductsExtras extras={item.extras.extrasList} selectdExtras={item.extras.activeExtra} />
                    </div>
                  </div>
                </>
              )}
              <Separator className="my-5" />
              <h4 className="mb-2 text-sm font-bold">{t("Cart.quantity")}:</h4>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    dispatch(incrementQuantityActiveItem());
                  }}
                  className="font-bold"
                >
                  +
                </Button>
                <p className="font-bold"> {item?.quantity} </p>
                <Button
                  onClick={() => {
                    dispatch(decrementQuantityActiveItem());
                    toast.success(`${item.name} ${t("Cart.successfullyAdded")}`);
                  }}
                  className="font-bold"
                  variant={"outline"}
                >
                  -
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    dispatch(addActiveItemToCart(item));
                    toast.success(`${item.name} ${t("Cart.successfullyAdded")}`);
                    closeAddToCartDialog();
                  }}
                  size={"sm"}
                >
                  <ShoppingCart /> {t("Cart.addToCart")}
                </Button>
                <Button size={"sm"} variant={"outline"} onClick={closeAddToCartDialog}>
                  {t("Common.close")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartDialog;
