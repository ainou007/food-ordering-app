import { setActiveSize } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import React from "react";
import { ProductSize } from "./types";

const ProductSizes = ({ sizes, activeSize }: { sizes: ProductSize[]; activeSize: string }) => {
  const dispatch = useAppDispatch();
  return sizes.map((size) => (
    <div
      onClick={() => {
        dispatch(setActiveSize(size.id));
      }}
      key={size.id}
      className={`cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-primary hover:text-white ${size.id === activeSize && "bg-primary text-white"}`}
    >
      {size.name} <span className="text-xs">{size.price} MAD</span>
    </div>
  ));
};

export default ProductSizes;
