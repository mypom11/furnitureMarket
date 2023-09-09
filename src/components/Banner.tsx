import Image, { StaticImageData } from "next/image";
import React from "react";

const Banner = ({ img, title, desc }: bannerComponent) => {
  return (
    <section className="px-32">
      <div className="flex h-[50vh] items-center overflow-hidden bg-orange-600">
        <div className="text_light w-1/2 px-10">
          <h1 className="mb-4 text-3xl font-bold">{title}</h1>
          <p className="mb-12 break-words text-lg">{desc}</p>
          <button className="rounded-lg bg-dark px-6 py-2 font-bold text-light hover:text-primary">
            쇼룸 가기
          </button>
        </div>
        <div className="h-full w-1/2">
          <Image src={img} alt={title} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
