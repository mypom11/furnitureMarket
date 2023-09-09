import Banner from "@/components/Banner";
import GridContainer from "@/components/GridContainer";
import Visual from "@/components/Visual";
import ProductList from "@/components/product/ProductList";
import React from "react";
import bannerImg from "@/assets/images/recommend.jpg";
import ProductListSm from "@/components/product/ProductListSm";

export const SectionTitle = ({ className, text, children }: defaultProps) => {
  return (
    <section className={` px-32 py-16 ${className}`}>
      <h1 className="mb-12 font-roboto text-2xl font-medium ">{text}</h1>
      {children}
    </section>
  );
};

const HomePage = () => {
  const banner: bannerComponent = {
    img: bannerImg,
    desc: "가구 전시회에 오신 것을 환영합니다! 탁월한 제품의 세계를 발견하고 집을 스타일과 편안함의 안식처로 바꿔보세요. 시대를 초월한 클래식부터 현대적인 경이로움까지, 엄선된 컬렉션은 모든 취향과 예산에 맞는 제품을 제공합니다. 소파, 테이블, 침실 세트 등 생활 공간을 한 단계 더 높일 수 있는 이 기회를 놓치지 마세요. 지금 쇼핑하고 꿈에 그리던 집을 현실로 만들어보세요!",
    title: "가구의 향연: 믿을 수 없는 제품이 기다립니다!",
  };

  return (
    <>
      <Visual />

      <SectionTitle text="새로 출시된 제품">
        <ProductList />
      </SectionTitle>

      <GridContainer />
      <SectionTitle text="가장 인기있는 제품">
        <ProductList />
      </SectionTitle>

      <Banner img={banner.img} title={banner.title} desc={banner.desc} />
      <SectionTitle text="최근 본 제품">
        <ProductListSm />
      </SectionTitle>
    </>
  );
};

export default HomePage;
