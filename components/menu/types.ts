export type ProductSize = {
  id: string;
  name: string;
  price: number;
};

export type ProductExtra = {
  id: string;
  name: string;
  price: number;
};

export type ProductCategory = {
  id: string;
  name: string;
};

export type MenuItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: ProductSize[];
  extras?: ProductExtra[];
  categories: ProductCategory[];
};
