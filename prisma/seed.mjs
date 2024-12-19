import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Products
  const products = [
    {
      name: "Couscous",
      description: "This is the first product description.",
      price: 29.99,
      image:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/08/12/couscous-carrot-boccoli-potato-mint-blue-white-moroccan-tagine.jpg.rend.hgtvcom.1280.960.85.suffix/1628774288686.webp",
    },
  ];

  // Upsert products into the database
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
      },
    });
  }
  console.log("Products seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
