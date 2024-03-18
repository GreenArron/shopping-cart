import PropTypes from "prop-types";

function SwitchBool({ bool, setBool, className, children }) {
  return (
    <button
      className={`${className} ${bool ? "up" : "down"}`}
      onClick={() => setBool((currBool) => !currBool)}
    >
      {children}
    </button>
  );
}

SwitchBool.propTypes = {
  bool: PropTypes.bool.isRequired,
  setBool: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.element,
};

export default SwitchBool;
