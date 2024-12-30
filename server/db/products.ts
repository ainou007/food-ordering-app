import { db } from "@/drizzle/db";
import { ProductsOrderTable, ProductTable, UserTable } from "@/drizzle/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { cache } from "@/lib/cache";

// The query retrieves the top 3 most ordered products from the database. It selects the product ID, name, price, image, and description, along with the count of how many times each product has been ordered. The results are ordered by the count in descending order and grouped by the product attributes.

export const getTopSellingProducts = cache(
  (limit: number) => {
    const products = db
      .select({
        id: ProductTable.id,
        howManyOrdred: count(),
        name: ProductTable.name,
        price: ProductTable.price,
        image: ProductTable.image,
        description: ProductTable.description,
      })
      .from(ProductsOrderTable)
      .innerJoin(ProductTable, eq(ProductsOrderTable.productId, ProductTable.id))
      .orderBy(desc(count()))
      .groupBy(ProductTable.id, ProductTable.name, ProductTable.price, ProductTable.image, ProductTable.description)
      .limit(limit)
      .execute();
    return products;
  },
  ["best-sallers"],
  { revalidate: 3600 },
);

export const getAllProducts = cache(
  () => {
    const products = db
      .select({
        id: ProductTable.id,
        howManyOrdred: count(),
        name: ProductTable.name,
        price: ProductTable.price,
        image: ProductTable.image,
        description: ProductTable.description,
      })
      .from(ProductsOrderTable)
      .innerJoin(ProductTable, eq(ProductsOrderTable.productId, ProductTable.id))
      .orderBy(desc(count()))
      .groupBy(ProductTable.id, ProductTable.name, ProductTable.price, ProductTable.image, ProductTable.description)
      .limit(3)
      .execute();
    return products;
  },
  ["best-sallers"],
  { revalidate: 3600 },
);
