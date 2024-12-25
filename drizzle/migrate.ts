import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { db } from "@/drizzle/db";
import { CategoryTable, OrderTable, productCategoryTable, ProductsOrderTable, ProductTable, UserTable } from "./schema";
const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle/migrations",
  });

  await db.delete(CategoryTable);
  await db.delete(OrderTable);
  await db.delete(UserTable);
  await db.delete(ProductTable);
  await db.delete(productCategoryTable);
  await db.delete(ProductsOrderTable);

  // Create categories
  const mainDishesCategory = await db.insert(CategoryTable).values({ name: "main Dishes" }).returning({ id: CategoryTable.id });
  const pastryCategory = await db.insert(CategoryTable).values({ name: "pastry" }).returning({ id: CategoryTable.id });
  const beveragesAndDessertsCategory = await db.insert(CategoryTable).values({ name: "Beverages and desserts" }).returning({ id: CategoryTable.id });
  console.log(" ✅ Categories are created successfully");

  // Create Products
  const Couscous = await db
    .insert(ProductTable)
    .values({
      name: "Couscous",
      description:
        'Steming from the Amazigh tradition, couscous is a staple dish of Morocco ! Served in all homes and restaurants, this super versatile and convivial dish is traditionnally eaton on Fridays. Depending on the region, it’s either served with meat, vegetables, fish or chicken, and sometimes sweets. It’s often served with a vegetable broth "marqa" to enhance its flavors.',
      price: 56.99,
      image: "https://www.visitmorocco.com/sites/all/themes/custom/onmt_theme/assets/images/Le-couscous.jpg",
    })
    .returning({ id: ProductTable.id });

  const Tajine = await db
    .insert(ProductTable)
    .values({
      name: "Tajine",
      description:
        "Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.",
      price: 56.99,
      image: "https://www.visitmorocco.com/sites/all/themes/custom/onmt_theme/assets/images/Le-tajine.jpg",
    })
    .returning({ id: ProductTable.id });

  const Harira = await db
    .insert(ProductTable)
    .values({
      name: "Harira",
      description:
        "A typical Moroccan soup known for its nutritious formula which is composed of a subtle mixture between pulses, tomatoes, pasta and flour. It's traditionnally eaten during the month of Ramadan, and it's served in most restaurants.",
      price: 3.99,
      image: "https://www.visitmorocco.com/sites/all/themes/custom/onmt_theme/assets/images/La-Harira.jpg",
    })
    .returning({ id: ProductTable.id });

  const Ghriba = await db
    .insert(ProductTable)
    .values({
      name: "Ghriba",
      description:
        "These delights top of the list of all pastries that are steming from Maghreb and oriental cuisine. In own, you’ll find ones in pastries, but also in small shops in the medinas. Made from almonds and semolina, they are often sprinkled with sesame seeds for added flavour.",
      price: 45.99,
      image: "https://www.visitmorocco.com/sites/default/files/ghriba.jpg",
    })
    .returning({ id: ProductTable.id });

  const Chebakia = await db
    .insert(ProductTable)
    .values({
      name: "Chebakia",
      description:
        "Being the second staple of Morocco, Chebakia is the most popular and most favourite cake in the country. It is served with Moroccan soup or as a side-dish to tea, and is traditionnally prepared in the sacred month of Ramadan.",
      price: 45.99,
      image: "https://www.visitmorocco.com/sites/default/files/chbakya.jpg",
    })
    .returning({ id: ProductTable.id });

  const MintTea = await db
    .insert(ProductTable)
    .values({
      name: "Mint tea",
      description:
        "More than just a tea, green mint tea is a ceremonial beverage deep-rooted in the Moroccan traditions. This thirst-quenching tea is served in a small, colourful glass. Whether it’s served in the city or in the countryside, gren mint tea is traditionally poured one metre high. Mint tea is often used to welcome guests in a friendly atmosphere.",
      price: 45.99,
      image: "https://www.visitmorocco.com/sites/all/themes/custom/onmt_theme/assets/images/The-a-la-menthe.jpg",
    })
    .returning({ id: ProductTable.id });
  console.log("✅ products are created successfully");

  // asigne products to the categories
  await db.insert(productCategoryTable).values({ productId: Couscous[0].id, categoryId: mainDishesCategory[0].id });
  await db.insert(productCategoryTable).values({ productId: Tajine[0].id, categoryId: mainDishesCategory[0].id });
  await db.insert(productCategoryTable).values({ productId: Harira[0].id, categoryId: mainDishesCategory[0].id });
  await db.insert(productCategoryTable).values({ productId: Ghriba[0].id, categoryId: pastryCategory[0].id });
  await db.insert(productCategoryTable).values({ productId: Chebakia[0].id, categoryId: pastryCategory[0].id });
  await db.insert(productCategoryTable).values({ productId: MintTea[0].id, categoryId: beveragesAndDessertsCategory[0].id });
  console.log(" ✅ Products Asigned to the catigories successfully");

  // Create Users
  const Abdelmounim = await db
    .insert(UserTable)
    .values({
      email: "aainou@gmail.com",
      password: "123",
      name: "Abdelmounim AINOU",
      image: "",
      phone: "0624651147",
      streetAddress: "ain mezouar ",
      city: "Marrakesh",
      country: "Morroco",
      codePostal: "40000",
    })
    .returning({ id: UserTable.id });

  const Zhiro = await db
    .insert(UserTable)
    .values({
      email: "fbellouahi@gmail.com",
      password: "123",
      name: "Fatimazehra Bellouahi",
      image: "",
      phone: "0624651147",
      streetAddress: "ain mezouar ",
      codePostal: "40000",
      city: "Marrakesh",
      country: "Morroco",
    })
    .returning({ id: UserTable.id });

  const Khadija = await db
    .insert(UserTable)
    .values({
      email: "kkharbouch@gmail.com",
      password: "123",
      name: "Khadija Kharbouch",
      image: "",
      phone: "0624651147",
      streetAddress: "Oulad ahmed ",
      codePostal: "40000",
      city: "Marrakesh",
      country: "Morroco",
    })
    .returning({ id: UserTable.id });
  console.log("✅ users are created successfully");

  //Create the Orders
  // create Orders
  const order_1 = await db.insert(OrderTable).values({ userId: Abdelmounim[0].id }).returning({ id: OrderTable.id });
  const order_1_1 = await db.insert(OrderTable).values({ userId: Abdelmounim[0].id }).returning({ id: OrderTable.id });
  const order_2 = await db.insert(OrderTable).values({ userId: Zhiro[0].id }).returning({ id: OrderTable.id });
  const order_3 = await db.insert(OrderTable).values({ userId: Khadija[0].id }).returning({ id: OrderTable.id });

  console.log(" ✅ Orders are created successfully");

  // Asigne the products to the orders
  // Order Abdelmounim
  await db.insert(ProductsOrderTable).values({ productId: Couscous[0].id, orderId: order_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Tajine[0].id, orderId: order_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Harira[0].id, orderId: order_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Chebakia[0].id, orderId: order_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: MintTea[0].id, orderId: order_1[0].id });

  // The second order of Abdelmounim
  await db.insert(ProductsOrderTable).values({ productId: Chebakia[0].id, orderId: order_1_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Tajine[0].id, orderId: order_1_1[0].id });
  await db.insert(ProductsOrderTable).values({ productId: MintTea[0].id, orderId: order_1_1[0].id });

  // Order Zhiro
  await db.insert(ProductsOrderTable).values({ productId: MintTea[0].id, orderId: order_2[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Ghriba[0].id, orderId: order_2[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Tajine[0].id, orderId: order_2[0].id });

  // Order Khqdija
  await db.insert(ProductsOrderTable).values({ productId: Tajine[0].id, orderId: order_3[0].id });
  await db.insert(ProductsOrderTable).values({ productId: Couscous[0].id, orderId: order_3[0].id });
  await db.insert(ProductsOrderTable).values({ productId: MintTea[0].id, orderId: order_3[0].id });

  console.log(" ✅ Orders are asigned successfully");

  console.log("🎉");
  migrationClient.end();
}

main();
