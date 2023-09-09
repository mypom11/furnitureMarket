import { MinusIcon, PlusIcon } from "@/components/Icons";
import ReviewList from "@/components/ReviewList";
import { Product } from "@/models";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SectionTitle } from "..";
import ProductListSm from "@/components/product/ProductListSm";

const ProductDescription: React.FC<{ item: Product }> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const priceToWon: (price: number) => string = (price) => {
    const newPrice = price.toLocaleString("ko-KR");
    return `${newPrice}원`;
  };

  const quantityChangeHanlder = (type: string) => {
    if (type === "increment") {
      setQuantity((prevState) => prevState + 1);
    } else if (type === "decrement" && quantity !== 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  return (
    <div className="w-2/5">
      <div className="my-6">
        <span className="text-dark/50">[{item.company}]</span>
        <h1 className="pb-4 text-2xl font-medium">{item.name}</h1>
        <p className="text-right text-2xl">{priceToWon(item.price)}</p>

        <hr className="my-12" />

        <div>
          <p>{item.desc}</p>
        </div>

        <hr className="my-12" />

        <div className="flex items-center justify-between">
          <span className="text-dark/50">수량</span>
          <div className="mb-8 flex items-center justify-end">
            <button
              className="bg-slate-600 px-4 py-1 text-2xl text-light hover:bg-red-500"
              onClick={() => quantityChangeHanlder("decrement")}
            >
              <MinusIcon />
            </button>
            <span className="block h-full w-16 border-[1px] border-solid border-dark px-4 text-center text-xl">
              {quantity}
            </span>
            <button
              className="bg-slate-600 px-4 py-1 text-2xl text-light hover:bg-primary"
              onClick={() => quantityChangeHanlder("increment")}
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <span className="text-dark/50">총 가격</span>
          <h2 className="text-2xl font-bold">
            {priceToWon(item.price * quantity)}
          </h2>
        </div>
        <div className="flex justify-between gap-4">
          <button className="flex-grow rounded-lg border-2 border-solid border-slate-600 bg-slate-600 py-2 text-light hover:shadow-lg">
            장바구니 담기
          </button>
          <button className="flex-grow rounded-lg border-2 border-solid border-slate-600 py-2 hover:shadow-lg">
            구입하기
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductImg: React.FC<{ img: StaticImageData[] }> = ({ img }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const imgChangeHandler = (index: number) => {
    setImgIndex(index);
  };

  return (
    <div className="flex w-3/5 flex-col gap-2">
      <div className="relative max-h-[70vh] w-full overflow-hidden rounded-lg">
        <Image
          src={img[imgIndex]}
          alt=""
          width={500}
          height={500}
          className="h-full w-full"
        />
      </div>
      <ul className="flex w-full gap-2">
        {img.map((img, index) => (
          <li
            key={index}
            onClick={() => imgChangeHandler(index)}
            className="relative w-1/4 cursor-pointer overflow-hidden rounded-lg"
          >
            <Image
              src={img}
              alt=""
              width={500}
              height={500}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductDetail = () => {
  const product = useSelector((state: RootState) => state.product.items);

  const selectedProduct = product[0];
  return (
    <main className="px-32 py-12">
      <article className="flex-between mb-12 flex gap-14 px-32">
        <ProductImg img={selectedProduct.img} />
        <ProductDescription item={selectedProduct} />
      </article>

      <article className="px-32">
        <ReviewList />
      </article>

      <SectionTitle text="최근 본 제품" className="px-0">
        <ProductListSm />
      </SectionTitle>
    </main>
  );
};

export default ProductDetail;
