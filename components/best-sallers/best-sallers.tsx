import Menu from "@/components/menu/menu";
import { MenuItemType } from "@/components/menu/types";
import SectionTitle from "@/components/section-title/section-title";

const BestSallers = () => {
  const bestSallersList: MenuItemType[] = [
    {
      id: "1",
      name: "Couscous",
      price: 150,
      image: "/couscous.jpg",
      description:
        "Morrocan Couscous With Vegetables - Koskos Maroc Png Clipart",
    },
    {
      id: "2",
      name: "Tajine",
      price: 120,
      image: "/tajine.jpg",
      description:
        "Morrocan Couscous With Vegetables - Koskos Maroc Png Clipart",
    },
    {
      id: "3",
      name: "Pastila",
      price: 120,
      image: "/pasttila.jpg",
      description:
        "Morrocan Couscous With Vegetables - Koskos Maroc Png Clipart",
    },
    // {
    //   id: "4",
    //   name: "Tanjia",
    //   price: 120,
    //   image: "/tanjia.png",
    //   description:
    //     "Morrocan Couscous With Vegetables - Koskos Maroc Png Clipart",
    // },
  ];
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
