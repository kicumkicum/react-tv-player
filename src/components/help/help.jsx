import React from "react";


const Help = () => {
  return (
    <div>
      <ul  style={{
        position: `absolute`,
        bottom: `10px`,
        columnCount: 3,
        backgroundColor: `gray`,
        width: `100%`,
      }}>
        <li>ENTER: play/pause</li>
        <li>DIGIT_1: start playing</li>
        <li>DIGIT_2: volume up</li>
        <li>DIGIT_3: volume down</li>
        <li>DIGIT_4: seek +10 sec</li>
        <li>DIGIT_5: seek -10 sec</li>
        <li>DIGIT_6: toggle fullscreen</li>
        <li>DIGIT_7: toggle speed</li>
      </ul>
    </div>
  );
};


export default Help;
