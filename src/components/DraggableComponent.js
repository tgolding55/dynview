import React, { useRef, useState, useEffect } from "react";

const quickAndDirtyStyle = {
  position: "relative",
  zIndex: "100",
  borderStyle: "dotted"
};

const DraggableComponent = ({ x = 0, y = 0, render }) => {
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x, y });

  const ref = useRef();

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  // Update the current position if mouse is down
  const onMouseMove = event => {
    if (pressed) {
      setPosition({
        x: position.x + event.movementX,
        y: position.y + event.movementY
      });
    }
  };

  return (
    <div
      ref={ref}
      style={quickAndDirtyStyle}
      onMouseMove={onMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {render}
    </div>
  );
};
export default DraggableComponent;
