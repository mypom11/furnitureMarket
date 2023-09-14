import { MinusIcon, PlusIcon } from "@/components/Icons";
import ReviewList from "@/components/ReviewList";
import { CartItem, Product } from "@/models";
import Image from "next/image";
import React, { useState } from "react";
import { GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/store/cart-slice";
import { uiAction } from "@/store/ui-slice";
import { priceToWon } from "@/components/utils/util";

const ProductDescription: React.FC<{ item: Product }> = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  dispatch(uiAction.setRecentView(item.id!));

  const quantityChangeHanlder = (type: string) => {
    if (type === "increment") {
      setQuantity((prevState) => prevState + 1);
    } else if (type === "decrement" && quantity !== 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };
  const addCartHandler = () => {
    const cartItem = new CartItem(
      item.id!,
      item.name,
      quantity,
      item.company,
      item.price,
      item.img[0],
    );

    dispatch(cartAction.addItemToCart(cartItem));
  };

  return (
    <div className="w-2/5 md:w-full">
      <div className="my-6">
        <span className="text-dark/50 dark:text-light/50">
          [{item.company}]
        </span>
        <h1 className="pb-4 text-2xl font-medium lg:text-lg">{item.name}</h1>
        <p className="text-right text-2xl lg:text-lg">
          {priceToWon(+item.price)}
        </p>

        <hr className="my-12 lg:my-6" />

        <div>
          <p className="lg:text-sm">{item.desc}</p>
        </div>

        <hr className="my-12 lg:my-6" />

        <div className="mb-8 flex items-center justify-between">
          <span className="text-dark/50 dark:text-light/50 lg:text-sm">
            수량
          </span>
          <div className="flex items-center justify-end">
            <button
              className="border-[1px] border-solid border-dark bg-slate-600 px-4 py-1 text-2xl text-light hover:bg-red-500 lg:px-2 lg:py-0 lg:text-lg"
              onClick={() => quantityChangeHanlder("decrement")}
            >
              <MinusIcon />
            </button>
            <span className="block h-full w-16 border-[1px] border-solid border-dark px-4 text-center text-xl lg:px-2 lg:py-0 lg:text-base">
              {quantity}
            </span>
            <button
              className="border-[1px] border-solid border-dark bg-slate-600 px-4 py-1 text-2xl text-light hover:bg-primary lg:px-2 lg:py-0 lg:text-lg"
              onClick={() => quantityChangeHanlder("increment")}
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <span className="text-dark/50 dark:text-light/50 lg:text-sm">
            총 가격
          </span>
          <h2 className="text-2xl font-bold lg:text-lg">
            {priceToWon(item.price * quantity)}
          </h2>
        </div>
        <div className="flex justify-between gap-4">
          <button
            className="flex-grow rounded-lg border-2 border-solid border-slate-600 bg-slate-600 py-2 text-light hover:shadow-lg lg:text-sm"
            onClick={addCartHandler}
          >
            장바구니 담기
          </button>
          <button className="flex-grow rounded-lg border-2 border-solid border-slate-600 py-2 hover:shadow-lg lg:text-sm">
            구입하기
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductImg: React.FC<{ img: string[] }> = ({ img }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const imgChangeHandler = (index: number) => {
    setImgIndex(index);
  };

  return (
    <div className="flex w-3/5 flex-col gap-2 md:w-full">
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

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <main className="px-32 py-12 lg:px-8 md:px-4 md:py-8">
      <article className="flex-between mb-12 flex gap-14 px-32 lg:px-0 md:flex-col md:items-center md:gap-4">
        <h2 className="hidden text-xl font-bold md:block">{product.name}</h2>
        <ProductImg img={product.img} />
        <ProductDescription item={product} />
      </article>

      {/* <article className="px-32">
        <ReviewList />
      </article> */}
    </main>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const response = await fetch(
    "https://react-http-238a4-default-rtdb.firebaseio.com/FurnitureProduct.json",
  );

  const data = await response.json();

  const productData = [];
  for (const key in data) {
    productData.push({
      id: key,
    });
  }
  const paths = productData.map((product) => ({
    params: { productId: product.id.toString() },
  }));
  console.log(paths);

  return {
    fallback: "blocking",
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const productId = context.params!.productId;
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

  const selectedProduct = productData.find((item) => item.id === productId);
  return {
    props: {
      product: selectedProduct,
    },
  };
};
