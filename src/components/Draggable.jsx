import PropTypes from "prop-types";
import { useState, useRef, RefObject } from "react";

function Draggable({ innerRef, rootClass = "", children }) {
  const ourRef = useRef(null);
  const slider = innerRef === undefined ? ourRef.current : innerRef.current;
  const [startX, setStartX] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  // note: using slider.scrollLeft directly doesn't work smoothly and is buggy, not sure why
  const [scrolled, setScrolled] = useState(0);

  function handleMouseMove(e) {
    if (isScrolling) {
      slider.scrollLeft = scrolled + (startX - e.pageX);
    }
  }

  function handleScrollStop(e) {
    const deltaX = startX - e.pageX;
    const now = Date.now();
    const timeDelta = now - startTime;
    setIsScrolling(false);
    animateScroll((deltaX / timeDelta) * 25);
  }

  function animateScroll(velocity) {
    if (velocity && Math.abs(velocity) > 0.7) {
      slider.scrollLeft += velocity;
      setScrolled(slider.scrollLeft);
      requestAnimationFrame(() => animateScroll(velocity * 0.92));
    }
  }

  return (
    <div
      ref={ourRef}
      onMouseDown={(e) => {
        setIsScrolling(true);
        setStartTime(Date.now());
        setStartX(e.pageX);
      }}
      onMouseUp={handleScrollStop}
      onMouseMove={handleMouseMove}
      className={rootClass}
    >
      {children}
    </div>
  );
}

Draggable.propTypes = {
  innerRef: PropTypes.instanceOf(RefObject),
  rootClass: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Draggable;
