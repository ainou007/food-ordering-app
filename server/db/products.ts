import { db } from "@/drizzle/db";
import { count, desc, eq } from "drizzle-orm";
import { cache } from "@/lib/cache";
import { products, products_to_orders } from "@/drizzle/schema";

// The query retrieves the top 3 most ordered products from the database. It selects the product ID, name, price, image, and description, along with the count of how many times each product has been ordered. The results are ordered by the count in descending order and grouped by the product attributes.

export const getTopSellingProducts = cache(
  async (limit: number) => {
    const productsList = await db
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
      .groupBy(products.id, products.name, products.price, products.image, products.description)
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

export const getProductsWithCategories = async () => {
  // const s = await db.query.categories.findMany({
  //   with: { products: true },
  // });
  console.log("");
};
