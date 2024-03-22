import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function LinkButton({ to, onClick, children, ...buttonParams }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={(event) => {
        onClick && onClick(event);
        navigate(to);
      }}
      {...buttonParams}
    >
      {children}
    </button>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default LinkButton;
