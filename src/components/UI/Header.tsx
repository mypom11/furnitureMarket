import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DarkModeBtn from "./DarkModeBtn";
import { CartIcon } from "../Icons";
import { useDispatch, useSelector, useStore } from "react-redux";
import { cartAction } from "@/store/cart-slice";
import { uiAction } from "@/store/ui-slice";

interface navLiProps {
  text: string;
  url: string;
  onClick?: () => void;
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
      <span
        className={`fl_center absolute -right-[4px] -top-[4px] inline-block h-[16px] w-[16px]  rounded-full bg-red-500 p-1 text-sm font-bold ${
          cartQuantity > 0 ? "animate-bounce" : ""
        }`}
      >
        {cartQuantity}
      </span>
    </button>
  );
};

const NavLi = ({ text, url, onClick }: navLiProps) => {
  const router = useRouter();
  return (
    <li
      className={`group relative hover:font-medium md:w-full md:py-4 md:text-center ${
        router.asPath === url
          ? "font-medium md:bg-dark md:text-light md:dark:bg-light md:dark:text-dark"
          : "font-normal"
      }`}
      onClick={onClick}
    >
      <Link href={url} className="text-sm md:text-2xl">
        {text}
      </Link>
      <span
        className={`absolute bottom-0 left-0 h-[1px] w-0 bg-dark transition-all duration-100 group-hover:w-full dark:bg-light md:hidden ${
          router.asPath === url ? "w-full" : "w-0"
        }`}
      ></span>
    </li>
  );
};

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.ui.isLogin);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(uiAction.setIsLogin(false));
  };
  const navOpenHandler = () => {
    setIsNavOpen((prevState: Boolean) => !prevState);
  };

  return (
    <header className="bg_light text_dark sticky top-0 z-30 px-32 py-4 shadow-md lg:px-8">
      <div className="fl_between m-auto max-w-[1920px]">
        <h1 className="relative z-50 font-rouge text-4xl">FurnitureMarket</h1>
        <div className="z-40 hidden gap-5 md:flex">
          <CartBtn className="rounded-full bg-dark p-1 text-light" />
          <button
            className=" flex flex-col items-center justify-center"
            onClick={navOpenHandler}
          >
            <span
              className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light  ${
                isNavOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
              } `}
            ></span>
            <span
              className={`my-0.5 block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light ${
                isNavOpen ? "opacity-0" : "opacity-100"
              } `}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light  ${
                isNavOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
              } `}
            ></span>
          </button>
        </div>
        {/* 웹 네비 */}
        <div className="md:hidden">
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

        {/* 모바일 네비 */}
        <div
          className={`fixed left-0 top-14 hidden h-screen w-full bg-light duration-300 ease-in-out dark:bg-dark md:block ${
            isNavOpen ? "translate-y-0" : "-translate-y-[100%]"
          }`}
        >
          <div
            className={`flex  items-center px-8 py-12 ${
              isLogin ? "justify-between" : "justify-end"
            }`}
          >
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
            <div className="flex items-center gap-x-4">
              <DarkModeBtn />
            </div>
          </div>
          <nav>
            <ul className="flex flex-col items-center justify-center gap-20">
              <NavLi text="홈" url="/" onClick={navOpenHandler} />
              <NavLi text="카테고리" url="/category" onClick={navOpenHandler} />
              <NavLi text="관리자" url="/admin" onClick={navOpenHandler} />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
