import "./SelectCount.css";
import PropTypes from "prop-types";

const BIN_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </svg>
);

function SelectCount({ count, setCount }) {
  return (
    <div className="select-count">
      <button aria-label="decrease" onClick={() => setCount((val) => val - 1)}>
        {count !== 1 ? "-" : BIN_SVG}
      </button>
      <span>{count}</span>
      <button aria-label="increase" onClick={() => setCount((val) => val + 1)}>
        +
      </button>
    </div>
  );
}

SelectCount.propTypes = {
  count: PropTypes.number,
  setCount: PropTypes.func,
};

export default SelectCount;
