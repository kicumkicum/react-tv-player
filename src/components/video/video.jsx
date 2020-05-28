import React, {PureComponent} from "react";
import pt from "prop-types";
import Key from "zb/device/input/key";
import Rect from "zb/geometry/rect";


const Video = class extends PureComponent {
  constructor(props) {
    super(props);

    const {video, src, keyHandler} = props;

    this._video = video;
    this._video.getViewport().setArea(Rect.createByNumbers(100, 100, 800, 600));

    keyHandler.processKey = (zbKey) => {
      switch (zbKey) {
        case Key.ENTER:
          this._video.togglePause();
          break;
        case Key.DIGIT_2:
          this._video.play(src);
          break;
      }
    };
  }

  render() {
    return (
      <div></div>
    );
  }
};


Video.propTypes = {
  keyHandler: pt.object.isRequired,
  video: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default Video;
