import "./StarRating.css";
import PropTypes from "prop-types";

const OUTLINE_STAR = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
  </svg>
);
const HALF_STAR = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
  </svg>
);
const FULL_STAR = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
);

function StarRating({ rating, total }) {
  return (
    <div className="star-rating">
      {[...Array(total)].map((value, index) => {
        const remaining = rating - index;
        if (remaining >= 1) {
          return (
            <span key={index} className="full-star">
              {FULL_STAR}
            </span>
          );
        } else if (remaining >= 0.4) {
          return (
            <span key={index} className="half-star">
              {HALF_STAR}
            </span>
          );
        } else {
          return (
            <span key={index} className="outline-star">
              {OUTLINE_STAR}
            </span>
          );
        }
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  total: PropTypes.number,
};

export default StarRating;
