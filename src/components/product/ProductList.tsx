import React from "react";
import { Product } from "@/models";
import Image from "next/image";
import { useRouter } from "next/router";
import { priceToWon } from "../utils/util";

interface ItemComponent {
  className?: string;
  item: Product;
}

const ProductItem = ({ className, item }: ItemComponent) => {
  const router = useRouter();

  const linkToDetailHandler = (id: string) => {
    console.log(id);
    router.push(`/product/${id}`);
  };

  return (
    <li
      className="boder-dark group w-full cursor-pointer border-2 border-solid p-2 hover:shadow-md"
      onClick={() => linkToDetailHandler(item.id)}
    >
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
        <p className="my-2 text-sm text-dark/50 dark:text-light/50 lg:my-1 lg:text-xs">
          [{item.company}]
        </p>
        <h2 className="lg:h-18 h-20 text-lg font-medium lg:text-sm">
          {item.name}
        </h2>
        <p className="text-right text-xl font-bold lg:text-sm">
          {priceToWon(+item.price)}
        </p>
      </div>
    </li>
  );
};

const ProductList: React.FC<{ items: Product[] }> = ({ items }) => {
  return (
    <ul className="grid grid-cols-5 items-center justify-start gap-5 md:grid-cols-3 md:gap-2">
      {items.map((item: Product) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ProductList;
