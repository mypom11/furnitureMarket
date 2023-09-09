import { Product } from "@/models";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "./utils/Slider";
import bedRoomImg from "@/assets/images/bedroom.jpg";
import kitchenRoomImg from "@/assets/images/kitchen.jpg";
import livingRoomImg from "@/assets/images/livingroom.jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface visualComponent {
  title: string;
  desc: string;
  img: StaticImageData;
}

const visualItems: visualComponent[] = [
  {
    title: "침실 가전 특가",
    desc: "인생 최고의 잠을 경험할 준비가 되셨나요? 더 이상 보지 마세요! 침실 가전제품에 대한 특별 가격이 그 꿈을 현실로 만들어 드립니다. 우리는 편안한 밤잠의 중요성을 이해하고 있으며, 이것이 바로 우리가 침실용품을 판매하는 이유입니다. 이제 웰빙에 투자할 때입니다.",
    img: bedRoomImg,
  },
  {
    title: "주방 가전 특가",
    desc: "주방 가전 특별 가격으로 주방을 새롭게 바꾸고 요리 기술을 향상시키세요! 미식가 셰프이시든, 가족 식사 준비를 좋아하시든, 우리는 여러분이 좋아할 만한 가격에 필요한 도구를 갖추고 있습니다. 마음껏 요리하는 모습을 상상해 보세요. 오늘 우리의 놀라운 거래!",
    img: kitchenRoomImg,
  },
  {
    title: "거실 가전 특가",
    desc: "거실은 추억을 만들고, 긴장을 풀고, 친구와 가족을 즐겁게 하는 곳입니다. 이상적인 분위기를 조성하는 데 도움을 드리기 위해 거실 가전제품에 대한 특별 가격을 제공하게 되어 기쁘게 생각합니다. 세련된 커피 테이블, 몰입형 사운드 시스템 등 클래식한 우아함을 좋아하든 현대적인 미니멀리즘을 좋아하든 할인된 컬렉션은 모든 취향에 맞는 제품을 제공합니다 특별한 제안으로 휴식과 오락을 즐겨보세요.",
    img: livingRoomImg,
  },
];

const MoreButton = () => {
  return (
    <button className="group relative shadow-md">
      <span className="absolute -left-[20%] top-1/2 -z-[1] h-6 w-6 -translate-y-1/2 rounded-full bg-primary/60 duration-200 group-hover:w-[140%]"></span>
      <Link href="/">더 보기</Link>
    </button>
  );
};

const VisualItem: React.FC<{ item: visualComponent }> = ({ item }) => {
  return (
    <article className="relative h-full w-full py-10 text-light">
      <Image
        className="absolute left-0 top-0 -z-10 h-full w-full"
        src={item.img}
        alt={item.title}
      />
      <div className="absolute left-0 top-0 -z-[1] h-full w-full bg-black/60"></div>

      <div className="absolute top-1/2 -translate-y-1/2 px-32">
        <h1 className="mb-6 text-6xl font-bold">{item.title}</h1>
        <p className="mb-4 w-1/2 break-words font-medium text-light/90">
          {item.desc}
        </p>
        <MoreButton />
      </div>
    </article>
  );
};

const Visual = () => {
  const product: Product[] = useSelector(
    (store: RootState) => store.product.items,
  );

  return (
    <section className="w-full px-32">
      <div>
        <Slider
          items={visualItems}
          renderItem={(item) => <VisualItem item={item} />}
        />
        {/* {product.map((item: Product) => (
            <VisualItem key={item.id} item={item} />
          ))} */}
      </div>
    </section>
  );
};

export default Visual;
