import Menu from "@/components/menu/menu";
import { MenuItemType } from "@/components/menu/types";
import SectionTitle from "@/components/section-title/section-title";
import { db } from "@/lib/prisma";

const BestSallers = async () => {
  const bestSallersList = await db.product.findMany();
  return (
    <section className="section-padding bg-gray-50">
      <SectionTitle title="Best Sallers" subTitle="check out" />
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Menu items={bestSallersList} />
        </div>
      </div>{" "}
    </section>
  );
};
export default BestSallers;
