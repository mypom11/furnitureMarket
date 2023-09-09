import React from "react";
import { useSelector } from "react-redux";
import { Product } from "@/models";
import Image from "next/image";

interface ItemComponent {
  className?: string;
  item: Product;
}

const ProductItem = ({ className, item }: ItemComponent) => {
  //숫자를 가격으로 변환 표기함수
  const priceToWon: (price: number) => string = (price) => {
    const newPrice = price.toLocaleString("ko-KR");
    return `${newPrice}원`;
  };

  return (
    <li className="boder-dark group w-1/4 cursor-pointer flex-wrap border-2 border-solid p-2 hover:shadow-md">
      <div className="overflow-hidden">
        {item.img && (
          <Image
            src={item.img[0]}
            alt={item.name}
            width={500}
            height={500}
            className="duration-100 group-hover:scale-[1.1]"
          />
        )}
      </div>
      <div className="pl-2">
        <p className="my-1 text-sm text-dark/50">[{item.company}]</p>
        <h2 className="text-lg font-medium">{item.name}</h2>
        <p className="text-right text-xl font-bold">{priceToWon(item.price)}</p>
      </div>
    </li>
  );
};

const ProductList = () => {
  const product: Product[] = useSelector(
    (store: RootState) => store.product.items,
  );

  return (
    <ul className="flex items-center justify-start gap-5">
      {product.map((item: Product) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ProductList;
