import Banner from "@/components/Banner";
import GridContainer from "@/components/GridContainer";
import Visual from "@/components/Visual";
import ProductList from "@/components/product/ProductList";
import React from "react";
import bannerImg from "@/assets/images/recommend.jpg";
import ProductListSm from "@/components/product/ProductListSm";
import { Product } from "@/models";
import { useSelector } from "react-redux";
import Head from "next/head";

export const SectionTitle = ({ className, text, children }: defaultProps) => {
  return (
    <section className={` px-32 py-16 md:px-4 md:py-8 lg:px-8 ${className}`}>
      <h1 className="mb-12 font-roboto text-2xl font-medium  md:mb-4 md:text-base">
        {text}
      </h1>
      {children}
    </section>
  );
};

const HomePage: React.FC<{ product: Product[] }> = ({ product }) => {
  const recentView = useSelector((state: RootState) => state.ui.recentItems);
  const recentlyAdded = () => {
    //날짜비교
    const newArr = [...product].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date),
    );
    return newArr.slice(0, 10);
  };

  // const popular = () => {
  //   //랜덤으로 선택시 hydrate오류 발생.....
  //   function shuffleArray(array) {
  //     for (let i = array.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  //   const newArr = [...product];
  //   shuffleArray(newArr);

  //   return newArr.slice(0, 10);
  // };
  //중간 값 10개 가져오기,,, 댓글기능 적용시 댓글 갯수로 확인하는 로직변경 필요
  const popular = product.slice(5, 15);
  //최근 본 목록에서 필터
  const recentlyView = product.filter((item) => recentView.includes(item.id));

  const banner: bannerComponent = {
    img: bannerImg,
    desc: "가구 전시회에 오신 것을 환영합니다! 탁월한 제품의 세계를 발견하고 집을 스타일과 편안함의 안식처로 바꿔보세요. 시대를 초월한 클래식부터 현대적인 경이로움까지, 엄선된 컬렉션은 모든 취향과 예산에 맞는 제품을 제공합니다.",
    title: "가구의 향연: 믿을 수 없는 제품이 기다립니다!",
  };

  return (
    <>
      <Head>
        <title>Furniture Market Home</title>
      </Head>
      <Visual />

      <SectionTitle text="새로 출시된 제품">
        <ProductList items={recentlyAdded()} />
      </SectionTitle>

      <GridContainer />
      <SectionTitle text="가장 인기있는 제품">
        <ProductList items={popular} />
      </SectionTitle>

      <Banner img={banner.img} title={banner.title} desc={banner.desc} />
      <SectionTitle text="최근 본 제품">
        <ProductListSm items={recentlyView} />
      </SectionTitle>
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://react-http-238a4-default-rtdb.firebaseio.com/FurnitureProduct.json",
  );

  const data = await response.json();

  const productData = [];
  for (const key in data) {
    productData.push({
      id: key,
      category: data[key].category,
      company: data[key].company,
      date: data[key].date,
      desc: data[key].desc,
      name: data[key].name,
      price: data[key].price,
      img: data[key].img,
    });
  }

  return {
    props: {
      product: productData,
    },
  };
};
