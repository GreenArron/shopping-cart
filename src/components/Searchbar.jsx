import PropTypes from "prop-types";
import "./Searchbar.css";

function Searchbar(onChange) {
  return (
    <form className="searchbar">
      <span>🔍</span>
      <input aria-label="Search Bar" type="text" onChange={onChange} />
    </form>
  );
}

Searchbar.propTypes = {
  onChange: PropTypes.func,
};

export default Searchbar;
