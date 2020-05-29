import React from "react";
import pt from "prop-types";
import Video from "../video/video.jsx";
import Rect from "zb/geometry/rect";


const App = (props) => {
  const {device, src, keyHandler} = props;

  return (
    <div>
      <div>
        Hello {device.info.type()}!
      </div>
      <Video
        input={device.input}
        video={device.createVideo(
          Rect.createByNumbers(0, 0, 1280, 720)
        )}
        src={src}
        keyHandler={keyHandler}
      />
    </div>
  );
};

App.propTypes = {
  device: pt.object.isRequired,
  keyHandler: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default App;
