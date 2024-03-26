import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useClickedAway } from "../utils/custom-hooks";
import styles from "./Filter.module.css";

function capitalizeCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Filter({
  name,
  currentFilter,
  setFilter,
  options,
  defaultOption,
  ...other
}) {
  const [active, setActive] = useState(false);
  const filterRef = useRef(null);
  const usedOptions =
    defaultOption === undefined ? options : [defaultOption, ...options];
  const shownName = options.includes(currentFilter)
    ? `${name}: ${currentFilter}`
    : name;

  useClickedAway(filterRef, () => {
    if (active) {
      setActive(false);
    }
  });

  function selectFilter(key) {
    setFilter(key);
    setActive(false);
  }

  return (
    <div className={styles["filter-container"]} ref={filterRef}>
      <button onClick={() => setActive((value) => !value)}>{shownName}</button>
      <div
        className={`${styles["filter-content"]} ${active && styles["float"]}`}
        {...other}
      >
        {active &&
          usedOptions.map((option) => {
            return (
              <button
                className={`${styles["filter-option"]} ${option === currentFilter && styles["selected"]}`}
                key={option}
                onClick={() => selectFilter(option)}
              >
                {capitalizeCase(option)}
              </button>
            );
          })}
      </div>
    </div>
  );
}

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  currentFilter: PropTypes.string,
  setFilter: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  defaultOption: PropTypes.string,
};

export default Filter;
