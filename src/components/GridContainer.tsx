import React from "react";
import Image, { StaticImageData } from "next/image";
import bedImg from "@/assets/images/bed.jpg";
import elecImg from "@/assets/images/elec.jpg";
import sofaImg from "@/assets/images/sofa.jpg";
import talbeImg from "@/assets/images/table.jpg";

interface gridContainer {
  title: string;
  className?: string;
  img: StaticImageData;
}

const items: gridContainer[] = [
  {
    title: "책상",
    img: talbeImg,
  },
  {
    title: "침대",
    img: bedImg,
  },
  {
    title: "조명",
    img: elecImg,
  },
  {
    title: "소파",
    img: sofaImg,
  },
];

const GridItem = ({ title, img, className }: gridContainer) => {
  return (
    <article
      className={`group relative cursor-pointer overflow-hidden first:col-start-1 first:col-end-3 first:row-start-1 first:row-end-3 ${className}`}
    >
      <Image
        src={img}
        alt={title}
        className="absolute left-0 top-0 h-full w-full duration-500 group-hover:scale-[1.2]"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-dark/75 duration-500 group-hover:opacity-20">
        <span className="absolute bottom-6 left-6 text-4xl font-bold text-light group-hover:opacity-0">
          {title}
        </span>
      </div>
    </article>
  );
};

const GridContainer = () => {
  return (
    <section className="grid h-[50vh] grid-cols-4 grid-rows-2 gap-2 px-32">
      {items.map((item, index) => (
        <GridItem
          key={index}
          title={item.title}
          img={item.img}
          className={index === 2 ? "row-start-1 row-end-3" : ""}
        />
      ))}
    </section>
  );
};

export default GridContainer;
