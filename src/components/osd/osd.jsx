import React from "react";
import pt from "prop-types";


const OSD = (props) => {
  const {top, left, x, y, speed, volume, progress, isShow} = props;
  const style = {
    position: `absolute`,
    top,
    left,
    width: `${x - left}px`,
    height: `${y - top}px`,
    backgroundColor: `green`,
  };

  if (!isShow) {
    style.display = `none`;
  }

  return (
    <div style={style}>
      <div className="osd__speed" style={{
      }}>{speed}</div>
      <div className="volume__speed">{volume}</div>
      <div className="progress__speed">{progress}</div>
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
  isShow: pt.bool.isRequired,
};


export default OSD;
