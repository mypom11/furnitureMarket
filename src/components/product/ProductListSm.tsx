import React from "react";
import { Product } from "@/models";
import Image from "next/image";
import { priceToWon } from "../utils/util";

interface ItemComponent {
  className?: string;
  item: Product;
}

const ProductItem = ({ className, item }: ItemComponent) => {
  //숫자를 가격으로 변환 표기함수

  return (
    <li className="boder-dark group relative cursor-pointer overflow-hidden border-2 border-solid p-2">
      <div className="overflow-hidden">
        {item.img && (
          <Image src={item.img[0]} alt={item.name} width={500} height={500} />
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full translate-y-full bg-dark/80 px-4 py-4 text-light duration-200 group-hover:translate-y-0">
        <p className="my-1 text-sm text-light/75 lg:text-xs">
          [{item.company}]
        </p>
        <h2 className="text-lg font-medium lg:text-xs">{item.name}</h2>
        <p className="text-right text-xl font-bold lg:text-xs">
          {priceToWon(+item.price)}
        </p>
      </div>
    </li>
  );
};

const ProductListSm: React.FC<{ items: Product[] }> = ({ items }) => {
  return (
    <div className="w-full ">
      <ul className="grid grid-cols-6 gap-2 md:grid-cols-3">
        {items.length !== 0 ? (
          items.map((item: Product) => (
            <ProductItem key={item.id} item={item} />
          ))
        ) : (
          <li className="col-start-1 col-end-3">
            <p>최근 본 아이템이 없습니다.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductListSm;
