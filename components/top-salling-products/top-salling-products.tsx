import Menu from "@/components/menu/menu";
import SectionTitle from "@/components/section-title/section-title";
import { getProductsWithDetails } from "@/server/db/products";

const TopSellingProducts = async () => {
  const TopSellingProducts = await getProductsWithDetails(3);
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
