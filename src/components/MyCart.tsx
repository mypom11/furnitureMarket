import React from "react";
import Portal from "./utils/Portal";

const Backdrop = () => {
  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-dark/75" />
  );
};

const MyCart = () => {
  return (
    <aside className="fixed right-0 top-0 z-40 h-full w-1/3 bg-light p-12">
      <Portal selector="backDrop">
        <Backdrop />
      </Portal>
      <div className="flex items-center justify-between">
        <h1 className="font-roboto text-2xl font-bold">
          나의 장바구니 (<span>0</span>)
        </h1>
        <div className="cursor-pointer">
          <span className="block h-0.5 w-6 translate-y-1 rotate-45 rounded-sm bg-dark transition-all duration-300  ease-out dark:bg-light "></span>
          <span className="my-0.5 block h-0.5 w-6 rounded-sm bg-dark opacity-0 transition-all duration-300 ease-out dark:bg-light "></span>
          <span className="block h-0.5 w-6 -translate-y-1 -rotate-45 rounded-sm bg-dark transition-all duration-300 ease-out dark:bg-light "></span>
        </div>
      </div>
      <div>
        <p>장바구니가 비었습니다.</p>
        <button>장바구니 담으러 가기</button>
      </div>
      <div>
        <ul>
          <li>목록</li>
          <li>목록</li>
          <li>목록</li>
          <li>목록</li>
        </ul>
        <div>
          <div>
            <span>총 가격</span>
            <p>Price</p>
          </div>
          <button>전부 주문하기 </button>
        </div>
      </div>
    </aside>
  );
};

export default MyCart;
