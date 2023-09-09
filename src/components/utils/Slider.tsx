import { Product } from "@/models";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";

interface slideComponent {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

const Slider = ({ items, renderItem }: slideComponent) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveHandler = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlideHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlideHandler = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="relative h-[50vh] w-full overflow-hidden bg-light text-light">
      <ul
        className="flex h-full duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="h-full w-full "
            style={{ flex: "0 0 100%", minWidth: "100%" }}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
      <button
        className="absolute left-[2%] top-1/2 flex -translate-y-1/2 hover:text-primary"
        onClick={prevSlideHandler}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className="absolute right-[2%] top-1/2 flex -translate-y-1/2 hover:text-primary"
        onClick={nextSlideHandler}
      >
        <ArrowRightIcon />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 ">
        {items.map((item, index) => (
          <span
            key={index}
            onClick={() => moveHandler(index)}
            className={`inline-block h-3 w-3 cursor-pointer rounded-full hover:bg-primary ${
              currentIndex === index ? "bg-light" : "bg-light/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};
export default Slider;
