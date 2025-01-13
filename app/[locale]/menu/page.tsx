import Hero from "@/components/hero/hero";
import Menu from "@/components/menu/menu";
import { getProductsWithDetails } from "@/server/db/products";

const MenuPage = async () => {
  const allProducts = await getProductsWithDetails(100);

  return (
    <main>
      <Hero />
      <div className="container">
        <Menu items={allProducts} />{" "}
      </div>
    </main>
  );
};

export default MenuPage;
