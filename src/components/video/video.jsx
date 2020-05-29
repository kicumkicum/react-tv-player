import React, {PureComponent} from "react";
import pt from "prop-types";
import Key from "zb/device/input/key";
import Rect from "zb/geometry/rect";
import Help from "../help/help.jsx";
import Log from "../log/log.jsx";


const Video = class extends PureComponent {
  constructor(props) {
    super(props);

    const {video} = props;

    this.state = {
      action: video.getState(),
    };

    this._platformEventToAction = this._platformEventToAction.bind(this);
  }

  componentDidMount() {
    const {video, src, keyHandler} = this.props;

    video.getViewport().setArea(Rect.createByNumbers(0, 100, 800, 600));

    keyHandler.processKey = (zbKey) => {
      switch (zbKey) {
        case Key.ENTER:
          video.togglePause();
          break;
        case Key.DIGIT_1:
          video.play(src);
          break;
        case Key.DIGIT_2:
          video.setVolume(video.getVolume() + 10);
          break;
        case Key.DIGIT_3:
          video.setVolume(video.getVolume() - 10);
          break;
        case Key.DIGIT_4:
          video.setPosition(video.getPosition() + 1000 * 10);
          break;
        case Key.DIGIT_5:
          video.setPosition(video.getPosition() - 1000 * 10);
          break;
        case Key.DIGIT_6:
          video.getViewport()
            .setFullScreen(!video.getViewport().isFullScreen());
          break;
        case Key.DIGIT_7:
          video.setPlaybackRate(3 - video.getPlaybackRate());
          break;
      }
    };

    const events = [
      video.EVENT_PAUSE,
      video.EVENT_PLAY,
      video.EVENT_VOLUME_CHANGE,
      video.EVENT_PLAY,
      video.EVENT_RATE_CHANGE,
    ];

    events.forEach((it) => video.on(it, this._platformEventToAction));
  }

  render() {
    const {action} = this.state;

    return (
      <>
        <Log
          action={action}
        />
        <Help />
      </>
    );
  }

  _platformEventToAction(event) {
    this.setState({
      action: event,
    });
  }
};


Video.propTypes = {
  keyHandler: pt.object.isRequired,
  video: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default Video;
