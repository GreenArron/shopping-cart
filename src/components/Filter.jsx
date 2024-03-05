import PropTypes from "prop-types";

function FilterItem() {
  return <></>;
}

function Filter({ name }) {
  return <button>{name}</button>;
}

Filter.propTypes = {
  name: PropTypes.string,
};

export { FilterItem, Filter };
