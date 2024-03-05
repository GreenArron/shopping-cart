import PropTypes from "prop-types";
import "./SelectCount.css";

function SelectCount({ count, setCount }) {
  return (
    <div className="select-count">
      <button onClick={() => setCount((val) => val - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((val) => val + 1)}>+</button>
    </div>
  );
}

SelectCount.propTypes = {
  count: PropTypes.number,
  setCount: PropTypes.func,
};

export default SelectCount;
