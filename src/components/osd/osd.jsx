import React from "react";
import pt from "prop-types";


const OSD = (props) => {
  const {top, left, x, y, speed, volume, progress, duration, isShow} = props;
  const style = {
    position: `absolute`,
    backgroundColor: `black`,
    color: `white`,
    top,
    left,
    width: `${x - left}px`,
    height: `${y - top}px`,
    opacity: 0.5,
  };

  if (!isShow) {
    style.display = `none`;
  }

  return (
    <div style={style}>
      <div className="osd__speed">{speed}x</div>
      <div className="volume__speed">{volume}</div>
      <div className="progress__speed">
        <div style={{
          height: `10px`,
          backgroundColor: `gray`,
          width: `100%`,
        }}>
          <div style={{
            width: `${progress / duration * 100}%`,
            height: `10px`,
            backgroundColor: `blue`,
          }} />
        </div>
      </div>
    </div>
  );
};


OSD.propTypes = {
  top: pt.number.isRequired,
  left: pt.number.isRequired,
  x: pt.number.isRequired,
  y: pt.number.isRequired,
  speed: pt.number.isRequired,
  volume: pt.number.isRequired,
  progress: pt.number.isRequired,
  duration: pt.number.isRequired,
  isShow: pt.bool.isRequired,
};


export default OSD;
