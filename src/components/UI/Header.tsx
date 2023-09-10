import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DarkModeBtn from "./DarkModeBtn";
import { CartIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/store/cart-slice";
import { uiAction } from "@/store/ui-slice";

interface navLiProps {
  text: string;
  url: string;
}

const CartBtn = ({ className }: defaultProps) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity,
  );

  const toggleCartHandler = () => {
    dispatch(cartAction.toggleCart());
  };

  return (
    <button className={`relative ${className}`} onClick={toggleCartHandler}>
      <CartIcon />
      <span className="fl_center absolute -right-[4px] -top-[4px] inline-block h-[16px] w-[16px] rounded-full bg-red-500 p-1 text-sm font-bold">
        {cartQuantity}
      </span>
    </button>
  );
};

const NavLi = ({ text, url }: navLiProps) => {
  const router = useRouter();
  return (
    <li
      className={`group relative hover:font-medium ${
        router.asPath === url ? "font-medium" : "font-normal"
      }`}
    >
      <Link href={url} className="text-sm">
        {text}
      </Link>
      <span
        className={`absolute bottom-0 left-0 h-[1px] w-0 bg-dark transition-all duration-100 group-hover:w-full ${
          router.asPath === url ? "w-full" : "w-0"
        }`}
      ></span>
    </li>
  );
};

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.ui.isLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(uiAction.setIsLogin(false));
  };

  return (
    <header className="bg_light text_dark sticky top-0 z-30 px-32 py-4 shadow-md">
      <div className="fl_between m-auto max-w-[1920px]">
        <h1 className="font-rouge text-4xl">FurnitureMarket</h1>
        <nav className="po_center">
          <ul className="fl_between gap-12 text-sm">
            <NavLi text="홈" url="/" />
            <NavLi text="카테고리" url="/category" />
            <NavLi text="관리자" url="/admin" />
          </ul>
        </nav>
        <div className="flex items-center gap-x-4">
          <CartBtn className="rounded-full bg-dark p-1 text-light" />
          <DarkModeBtn />
          {isLogin && (
            <div
              className="group relative cursor-pointer hover:font-medium"
              onClick={logoutHandler}
            >
              <p className="text-sm">로그아웃</p>
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-0 bg-dark transition-all duration-100 group-hover:w-full`}
              ></span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
