import Hero from "@/components/hero/hero";
import Menu from "@/components/menu/menu";
import { getAllProducts } from "@/server/db/products";

const MenuPage = async () => {
  const allProducts = await getAllProducts();
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
