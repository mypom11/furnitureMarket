import Image, { StaticImageData } from "next/image";
import React from "react";

const Banner = ({ img, title, desc }: bannerComponent) => {
  return (
    <section className="relative px-32 md:px-0 lg:px-8">
      <div className=" flex h-[30vh] items-center overflow-hidden bg-orange-600">
        <div className="text_light relative w-2/5 px-10 md:z-10 md:flex md:h-full md:w-full md:flex-col md:justify-center md:bg-dark/60 md:text-center">
          <h1 className="mb-4 text-xl font-bold lg:text-base">{title}</h1>
          <p className="mb-4 break-words text-sm lg:text-xs">{desc}</p>
          <button className="rounded-lg bg-dark px-6 py-2 font-bold text-light hover:text-primary lg:text-xs">
            쇼룸 가기
          </button>
        </div>
        <div className="relative h-full w-3/5 overflow-hidden md:absolute md:w-full">
          <Image src={img} alt={title} className="absolute h-full" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
