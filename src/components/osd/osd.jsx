import React from "react";
import pt from "prop-types";


const OSD = (props) => {
  const {top, left, x, speed, volume, progress, duration} = props;
  const style = {
    position: `absolute`,
    backgroundColor: `black`,
    color: `white`,
    top,
    left,
    width: `${x - left}px`,
    height: `80px`,
    opacity: 0.5,
  };

  return (
    <div style={style}>
      <div className="osd__speed">Speed: {speed}x</div>
      <div className="volume__speed">Volume: {volume}</div>
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
};


export default OSD;
