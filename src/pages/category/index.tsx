import ProductList from "@/components/product/ProductList";
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

const Categroy = () => {
  const [selectedId, setSelectedId] = useState(0);

  const currentSelected = categroies.find((item) => item.id === selectedId);
  const selectedChangeHandler = (index: number) => {
    setSelectedId(index);
  };

  return (
    <section className="px-32 py-12">
      <h1 className="mb-8 text-center text-2xl font-bold">Category</h1>
      <ul className="fl_center mb-4 gap-8">
        {categroies.map((item) => (
          <li
            onClick={() => selectedChangeHandler(item.id)}
            key={item.id}
            className={`group relative cursor-pointer hover:font-medium ${
              selectedId === item.id ? "font-medium" : "font-normal"
            }`}
          >
            {item.name}
            <span
              className={`absolute bottom-0 left-0 h-[1px] w-0 bg-dark transition-all duration-100 group-hover:w-full ${
                selectedId === item.id ? "w-full" : "w-0"
              }`}
            />
          </li>
        ))}
      </ul>
      <hr className="mb-8" />
      <h2 className="mb-4 text-2xl font-bold">
        {currentSelected && currentSelected.name}
      </h2>
      <ProductList />
    </section>
  );
};

export default Categroy;
