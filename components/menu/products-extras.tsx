"use client";
import React from "react";
import { ProductExtra } from "./types";
import { useAppDispatch } from "@/store/hooks";
import { addToExtras } from "@/store/cartSlice";
import { useI18n } from "@/locales/client";

type ProductsExtrasProps = {
  extras: ProductExtra[];
  selectdExtras: string[];
};

const ProductsExtras = ({ extras, selectdExtras }: ProductsExtrasProps) => {
  const dispatch = useAppDispatch();
  const t = useI18n();

  return extras.map((extra) => (
    <div
      onClick={() => {
        dispatch(addToExtras(extra.id));
      }}
      key={extra.id}
      className={`cursor-pointer text-nowrap rounded-sm border px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-primary hover:text-white ${selectdExtras.includes(extra.id) && "bg-primary text-white"}`}
    >
      {extra.name} <span className="text-xs">{`+ ${extra.price} ${t("Menu.currency")}`}</span>
    </div>
  ));
};

export default ProductsExtras;
