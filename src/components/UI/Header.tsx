import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DarkModeBtn from "./DarkModeBtn";
import { CartIcon } from "../Icons";

interface navLiProps {
  text: string;
  url: string;
}

const CartBtn = ({ className }: defaultProps) => {
  return (
    <button className={`relative ${className}`}>
      <CartIcon />
      <span className="fl_center absolute -right-[4px] -top-[4px] inline-block h-[16px] w-[16px] rounded-full bg-red-500 p-1 text-sm font-bold">
        0
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
  return (
    <header className="bg_light text_dark sticky top-0 z-30 px-32 py-4 shadow-md">
      <div className="fl_between m-auto max-w-[1920px]">
        <h1 className="font-rouge text-4xl">FurnitureMarket</h1>
        <nav className="po_center">
          <ul className="fl_between gap-12 text-sm">
            <NavLi text="홈" url="/" />
            <NavLi text="카테고리" url="/category" />
            <NavLi text="마이 페이지" url="/my-page" />
          </ul>
        </nav>
        <div className="flex gap-x-4">
          <CartBtn className="rounded-full bg-dark p-1 text-light" />
          <DarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
