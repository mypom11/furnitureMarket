import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DarkModeBtn from "./DarkModeBtn";

interface navLiProps {
  text: string;
  url: string;
}

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
    <header className="fl_between sticky top-0 bg-light px-32 py-4 text-dark">
      <h1 className="font-rouge text-4xl">FurnitureMarket</h1>
      <nav className="po_center">
        <ul className="fl_between gap-12 text-sm">
          <NavLi text="홈" url="/" />
          <NavLi text="카테고리" url="/category" />
          <NavLi text="마이 페이지" url="/my-page" />
        </ul>
      </nav>
      <div>
        {/* <button>LogOut</button> */}

        <DarkModeBtn />
      </div>
    </header>
  );
};

export default Header;
