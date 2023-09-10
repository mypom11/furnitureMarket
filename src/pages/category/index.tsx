import ProductList from "@/components/product/ProductList";
import { Product } from "@/models";
import React, { useState } from "react";

const categroies = [
  {
    id: 0,
    name: "전체보기",
  },
  {
    id: 1,
    name: "의자",
  },
  {
    id: 2,
    name: "책상",
  },
  {
    id: 3,
    name: "소파",
  },
  {
    id: 4,
    name: "조명",
  },
  {
    id: 5,
    name: "수납",
  },
  {
    id: 6,
    name: "홈리빙",
  },
];

const Categroy: React.FC<{ product: Product[] }> = ({ product }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [filterdProduct, setFilterdProduct] = useState(product);

  const currentSelected = categroies.find((item) => item.id === selectedId);
  const selectedChangeHandler = (index: number) => {
    setSelectedId(index);

    if (index === 0) {
      setFilterdProduct(product);
    } else {
      const filter = product.filter((item: Product) => item.category === index);
      setFilterdProduct(filter);
    }
  };

  return (
    <section className="px-32 py-12 md:px-4 md:py-8 lg:px-8">
      <h1 className="mb-8 text-center text-2xl font-bold lg:text-base">
        Category
      </h1>
      <ul className="fl_center mb-4 gap-8 md:gap-4">
        {categroies.map((item) => (
          <li
            onClick={() => selectedChangeHandler(item.id)}
            key={item.id}
            className={`group relative cursor-pointer hover:font-medium lg:text-sm ${
              selectedId === item.id ? "font-medium" : "font-normal"
            }`}
          >
            {item.name}
            <span
              className={`absolute bottom-0 left-0 h-[1px] w-0 bg-dark transition-all duration-100 group-hover:w-full dark:bg-light ${
                selectedId === item.id ? "w-full" : "w-0"
              }`}
            />
          </li>
        ))}
      </ul>
      <hr className="mb-8 md:mb-4" />
      <h2 className="mb-4 text-2xl font-bold lg:text-base">
        {currentSelected && currentSelected.name}
      </h2>
      <ProductList items={filterdProduct} />
    </section>
  );
};

export default Categroy;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://react-http-238a4-default-rtdb.firebaseio.com/FurnitureProduct.json",
  );

  const data = await response.json();

  const productData = [];
  for (const key in data) {
    productData.push({
      id: key,
      category: data[key].category,
      company: data[key].company,
      date: data[key].date,
      desc: data[key].desc,
      name: data[key].name,
      price: data[key].price,
      img: data[key].img,
    });
  }
  return {
    props: {
      product: productData,
    },
  };
};
