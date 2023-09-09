import { Review } from "@/models";
import React from "react";
import StarRating from "./utils/StarRating";

const DUMMY_REVIEW: Review[] = [
  new Review("0", "민정기", "물건 좋아요", 2),
  new Review("0", "민정기", "물건 좋아요", 5),
  new Review("0", "민정기", "물건 좋아요", 3.5),
];

const ReviewItem: React.FC<{ item: Review }> = ({ item }) => {
  const reviewDate = new Date(item.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="boder-solid w-full rounded-lg border-[1px] border-dark  p-4 text-dark shadow-md">
      <div className="flex justify-between">
        <StarRating point={item.point} color="#1b1b1b" />
        <span className="text-xs">{reviewDate}</span>
      </div>
      <p>{item.name}</p>

      <p>{item.content}</p>
    </li>
  );
};

const ReviewList = () => {
  return (
    <ul className="flex flex-col gap-2">
      {DUMMY_REVIEW.map((item, index) => (
        <ReviewItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default ReviewList;
