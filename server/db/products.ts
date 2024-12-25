import { db } from "@/drizzle/db";
import { ProductsOrderTable, ProductTable, UserTable } from "@/drizzle/schema";
import { count, desc, eq, sql } from "drizzle-orm";
// import { cache } from "@/lib/cache";

// export const getBestSallers = cache(
//   () => {
//     const products = db.ordersOnProducts;

//   },
//   ["best-sallers"],
//   { revalidate: 3600 },
// );
export const getBestSallers = async () => {
  // const products = await db.query.ProductsOrderTable.findMany({});
  const products = await db
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

  console.log(products);
  //
  return products;
};
