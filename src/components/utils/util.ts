export const priceToWon: (price: number) => string = (price) => {
  const newPrice = price.toLocaleString("ko-KR");
  return `${newPrice}원`;
};
