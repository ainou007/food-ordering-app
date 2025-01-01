import { db } from "@/drizzle/db";
import { count, desc, eq, sql } from "drizzle-orm";
import { cache } from "@/lib/cache";
import {
  categories,
  extras,
  product_to_extras,
  product_to_sizes,
  products,
  products_to_categories,
  products_to_orders,
  sizes,
} from "@/drizzle/schema";
import { MenuItemType } from "@/components/menu/types";

// The query retrieves the top 3 most ordered products from the database. It selects the product ID, name, price, image, and description, along with the count of how many times each product has been ordered. The results are ordered by the count in descending order and grouped by the product attributes.

export const getTopSellingProducts = cache(
  (limit: number) => {
    const productsList = db
      .select({
        id: products.id,
        howManyOrdred: count(),
        name: products.name,
        price: products.price,
        image: products.image,
        description: products.description,
      })
      .from(products_to_orders)
      .innerJoin(products, eq(products_to_orders.productId, products.id))
      .orderBy(desc(count()))
      .groupBy(
        products.id,
        products.name,
        products.price,
        products.image,
        products.description,
      )
      .limit(limit)
      .execute();
    return productsList;
  },
  ["best-sallers"],
  { revalidate: 3600 },
);

export const getAllProducts = cache(
  () => {
    const productsList = db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        description: products.description,
      })
      .from(products)
      .orderBy(desc(products.createdAt))
      .execute();
    return productsList;
  },
  ["best-sallers"],
  { revalidate: 3600 },
);

export const a = async () => {
  const s = await db.query.categories.findMany({
    with: {
      products: {
        with: {
          product: {
            columns: {
              id: true,
              name: true,
              price: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });
};

export const getProductsWithDetails = cache(
  async (limit: number) => {
    const row = await db
      .select({
        id: products.id,
        howManyOrdred: count(),
        name: products.name,
        price: products.price,
        image: products.image,
        description: products.description,
        sizes: sql`(
          SELECT json_agg(json_build_object('id', ${sizes.id}, 'name', ${sizes.name}, 'price', ${sizes.price}))
          FROM ${product_to_sizes}
          INNER JOIN ${sizes} ON ${product_to_sizes.sizeId} = ${sizes.id}
          WHERE ${product_to_sizes.productId} = ${products.id}
        )`.as("sizes"),
        extras: sql`(
          SELECT json_agg(json_build_object('id', ${extras.id}, 'name', ${extras.name}, 'price', ${extras.price}))
          FROM ${product_to_extras}
          INNER JOIN ${extras} ON ${product_to_extras.extraId} = ${extras.id}
          WHERE ${product_to_extras.productId} = ${products.id}
        )`.as("extras"),
        categories: sql`(
          SELECT json_agg(json_build_object('id', ${categories.id}, 'name', ${categories.name}))
          FROM ${products_to_categories}
          INNER JOIN ${categories} ON ${products_to_categories.categoryId} = ${categories.id}
          WHERE ${products_to_categories.productId} = ${products.id}
        )`.as("categories"),
      })
      .from(products_to_orders)
      .innerJoin(products, eq(products_to_orders.productId, products.id))
      .orderBy(desc(count()))
      .groupBy(
        products.id,
        products.name,
        products.price,
        products.image,
        products.description,
      )
      .limit(limit)
      .execute();
    console.log("first row", row[0]);
    return row as MenuItemType[];
  },
  ["products-with-details"],
  { revalidate: 3600 },
);
