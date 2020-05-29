import React, {PureComponent} from "react";
import pt from "prop-types";
import Key from "zb/device/input/key";
import Rect from "zb/geometry/rect";
import Help from "../help/help.jsx";
import Log from "../log/log.jsx";
import OSD from "../osd/osd.jsx";


const DEFAULT_VIDEO_SIZE = {
  TOP: 100,
  LEFT: 0,
  WIDTH: 800,
  HEIGHT: 600,
};


const Video = class extends PureComponent {
  constructor(props) {
    super(props);

    const {video} = props;

    this.state = {
      action: video.getState(),
      position: Math.floor(video.getPosition()),
    };

    video.getViewport().setArea(Rect.createByNumbers(
      DEFAULT_VIDEO_SIZE.LEFT,
      DEFAULT_VIDEO_SIZE.TOP,
      DEFAULT_VIDEO_SIZE.WIDTH,
      DEFAULT_VIDEO_SIZE.HEIGHT
    ));

    this._keyHandler = this._keyHandler.bind(this);
    this._platformEventToAction = this._platformEventToAction.bind(this);
  }

  componentDidMount() {
    const {video, keyHandler} = this.props;
    const events = [
      video.EVENT_PAUSE,
      video.EVENT_PLAY,
      video.EVENT_VOLUME_CHANGE,
      video.EVENT_PLAY,
      video.EVENT_RATE_CHANGE,
    ];

    events.forEach((it) => video.on(it, this._platformEventToAction));

    video.on(video.EVENT_TIME_UPDATE, (eventName, time) => this.setState({
      position: Math.floor(time / 1000),
    }));

    keyHandler.processKey = this._keyHandler;
  }

  render() {
    const {video} = this.props;
    const {action, position} = this.state;
    const area = video.getViewport().getCurrentArea().getValue();

    return (
      <>
        <Log
          action={action}
        />
        <OSD
          top={area.y0}
          left={area.x0}
          x={area.x1}
          y={area.y1}
          speed={video.getPlaybackRate()}
          volume={video.getVolume()}
          progress={position}
          duration={Math.floor(video.getDuration() / 1000)}
          isShow={true}
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

  _keyHandler(zbKey) {
    const {video, src} = this.props;

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

        // Workaround. Not for production. For prototype only.
        // TODO: Need better method for spy on video size changing.
        this.forceUpdate();
        break;
      case Key.DIGIT_7:
        video.setPlaybackRate(3 - video.getPlaybackRate());
        break;
    }
  }
};


Video.propTypes = {
  keyHandler: pt.object.isRequired,
  video: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default Video;
