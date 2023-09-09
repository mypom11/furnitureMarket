import React from "react";

import classes from "./StarRating.module.css";

interface starRatingComponent {
  className?: string;
  point: number;
  color?: string;
}

const StarRating = ({ className, point, color }: starRatingComponent) => {
  const score = +point * 20;
  let newColor;
  if (color ? (newColor = color) : (newColor = "#fff58c"))
    return (
      <div className={`w-12 ${className}`}>
        <div className={`${classes["star-ratings"]}`}>
          <div
            className={classes["star-ratings-fill"]}
            style={{ color: newColor, width: `${score}%` }}
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className={classes["star-ratings-base"]}>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      </div>
    );
};

export default StarRating;
