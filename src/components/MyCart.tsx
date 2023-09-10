import React from "react";
import Portal from "./utils/Portal";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/store/cart-slice";
import Image from "next/image";
import { MinusIcon, PlusIcon } from "./Icons";
import { CartItem as CartModel } from "@/models";
import { priceToWon } from "./utils/util";

export const Backdrop = () => {
  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-dark/75" />
  );
};

const CartItem: React.FC<{ item: CartModel }> = ({ item }) => {
  const dispatch = useDispatch();

  const itemPlusHandler = () => {
    const model = { ...item, quantity: 1 };
    dispatch(cartAction.addItemToCart(model));
  };
  const itemMinusHandler = () => {
    dispatch(cartAction.removeItemFromCart(item.productId));
  };

  return (
    <li className="flex items-center justify-between rounded-lg border-[1px] border-solid border-dark px-4 py-2 shadow-md">
      <div className="w-1/3 p-2 md:w-2/5">
        <Image
          src={item.img}
          alt={item.productName}
          width={200}
          height={200}
          className="h-[90%] w-[90%]"
        />
      </div>
      <div className="w-2/3 md:w-3/5">
        <span className="text-sm text-dark/75 dark:text-light/75 md:text-xs">
          {item.productCompany}
        </span>
        <h2 className="mb-4 text-xl font-bold md:text-sm">
          {item.productName}
        </h2>
        <div className="mb-4 flex items-stretch justify-end">
          <button
            className="bg-slate-600 px-2 text-sm"
            onClick={itemMinusHandler}
          >
            <MinusIcon />
          </button>
          <p className="w-14 border-[1px] border-solid border-dark text-center font-bold">
            {item.quantity}
          </p>
          <button
            className="bg-slate-600 px-2 text-sm"
            onClick={itemPlusHandler}
          >
            <PlusIcon />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-dark/50 dark:text-light/50">
            총 가격
          </span>
          <p className="text-xl font-bold md:text-base">
            {priceToWon(item.productPrice * item.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
};

const MyCart = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const cartData = useSelector((state: RootState) => state.cart.items);
  const isShow = useSelector((state: RootState) => state.cart.isCartShow);
  const toggleCartHandler = () => {
    dispatch(cartAction.toggleCart());
  };

  return (
    <aside
      className={`fixed right-0 top-0 z-40 h-screen w-2/3  bg-light p-12 duration-500 ease-in-out dark:bg-dark md:w-full md:px-4 
      ${isShow === true ? "translate-x-[0]" : "translate-x-[100%]"}`}
    >
      {isShow && (
        <Portal selector="backDrop">
          <Backdrop />
        </Portal>
      )}
      <div className="relative h-full">
        <div className="mb-20 flex items-center justify-between">
          <h1 className="font-roboto text-2xl font-bold md:text-lg">
            나의 장바구니 (<span>{totalQuantity}</span>)
          </h1>
          <div className="cursor-pointer" onClick={toggleCartHandler}>
            <span className="block h-0.5 w-6 translate-y-1 rotate-45 rounded-sm bg-dark transition-all duration-300  ease-out dark:bg-light "></span>
            <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-dark opacity-0 transition-all duration-300 ease-out dark:bg-light "></span>
            <span className="block h-0.5 w-6 -translate-y-1 -rotate-45 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light "></span>
          </div>
        </div>
        {cartData.length === 0 ? (
          <div className="po_center text-center md:w-full">
            <p className="mb-12 text-2xl md:text-lg">장바구니가 비었습니다.</p>
            <button
              className="inline-block rounded-md bg-dark px-12 py-3 text-light dark:bg-light dark:text-dark md:w-full"
              onClick={toggleCartHandler}
            >
              장바구니 담으러 가기
            </button>
          </div>
        ) : (
          <div className="h-[80%]">
            <ul className="flex h-[80%] flex-col gap-4 overflow-x-scroll pr-4">
              {cartData.map((item: CartModel) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </ul>
            <div>
              <div className="mb-12 flex items-center justify-between">
                <span className="text-lg text-dark/50 dark:text-light/50 md:text-base">
                  총 가격
                </span>
                <p className="text-3xl font-bold md:text-lg">
                  {priceToWon(totalPrice)}
                </p>
              </div>
              <button className="w-full rounded-lg bg-dark py-4 text-lg font-bold text-light dark:bg-light dark:text-dark md:text-base">
                모두 주문하기
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MyCart;
