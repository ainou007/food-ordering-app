"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToExtras,
  CartItemType,
  incrementQuantityActiveItem,
  decrementQuantityActiveItem,
  selectActiveItem,
  setActiveSize,
  addAcriveItemToCart,
} from "@/store/cartSlice";

const AddToCartDialog = ({
  open,
  closeAddToCartDialog,
}: {
  open: boolean;
  closeAddToCartDialog: () => void;
}) => {
  const item = useAppSelector(selectActiveItem) as CartItemType;
  const dispatch = useAppDispatch();
  return (
    <Dialog open={open}>
      {/* https://github.com/shadcn-ui/ui/issues/1871#issuecomment-2045094819 */}
      {/* https://github.com/shadcn-ui/ui/issues/1712#issuecomment-1758661015 */}

      <DialogContent
        className="max-h-[90vh] w-[90vw] max-w-4xl rounded-md p-0"
        hiddenCloseButton
        onInteractOutside={closeAddToCartDialog}
      >
        <div className="max-h-[80vh] overflow-y-auto rounded-md">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle> {item?.name} </DialogTitle>
              <DialogDescription>{item?.description}</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <div className="grid grid-cols-12 gap-3 overflow-y-scroll">
            <div className="relative col-span-full min-h-56 overflow-hidden rounded-md lg:col-span-4">
              <Image
                src={
                  item?.image ||
                  "https://palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                }
                fill
                alt=""
                className="rounded-md object-cover object-center"
              />
            </div>
            <div className="col-span-full space-y-4 p-3 lg:col-span-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{item?.name}</h3>
                <p className="text-xl font-bold"> {item?.totalPrice.toFixed(2)} MAD</p>
              </div>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
              {/* Sizes */}
              {item?.sizes && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <h4 className="mb-2 text-sm font-bold">Sizes</h4>
                    <div className="flex flex-wrap gap-3">
                      {item?.sizes.sizesList.map((size) => (
                        <div
                          onClick={() => {
                            dispatch(setActiveSize(size.id));
                          }}
                          key={size.id}
                          className={`cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium transition-all duration-700 ease-in-out hover:bg-primary hover:text-white ${size.id === item.sizes?.activeSize && "bg-primary text-white"}`}
                        >
                          {size.name} <span className="text-xs">{size.price} MAD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {/* Extras */}
              {item?.extras && (
                <>
                  <Separator className="my-5" />
                  <div>
                    <h4 className="mb-2 text-sm font-bold">Extras</h4>
                    <div className="flex flex-wrap gap-3">
                      {item?.extras.extrasList.map((extra) => (
                        <div
                          onClick={() => {
                            dispatch(addToExtras(extra.id));
                          }}
                          key={extra.id}
                          className={`cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium transition-all duration-700 ease-in-out hover:bg-primary hover:text-white ${item.extras?.activeExtra.includes(extra.id) && "bg-primary text-white"}`}
                        >
                          {extra.name}
                          <span className="text-xs">{` +${extra.price} MAD`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <Separator className="my-5" />
              <h4 className="mb-2 text-sm font-bold">Quantity: </h4>
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
                    dispatch(addAcriveItemToCart());
                  }}
                  size={"sm"}
                >
                  <ShoppingCart /> Add to cart
                </Button>
                <Button size={"sm"} variant={"outline"} onClick={closeAddToCartDialog}>
                  Close
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
