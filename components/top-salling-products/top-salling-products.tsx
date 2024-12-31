import Menu from "@/components/menu/menu";
import SectionTitle from "@/components/section-title/section-title";
import { getProductsWithCategories, getTopSellingProducts } from "@/server/db/products";

const TopSellingProducts = async () => {
  const TopSellingProducts = await getTopSellingProducts(3);
  const products = await getProductsWithCategories();
  return (
    <section className="section-padding bg-gray-50">
      <SectionTitle title="Best Sallers" subTitle="check out" />
      <div className="container">
        <Menu items={TopSellingProducts} />
      </div>
    </section>
  );
};
export default TopSellingProducts;
