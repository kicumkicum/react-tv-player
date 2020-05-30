import React, {PureComponent} from "react";
import pt from "prop-types";
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


class Video extends PureComponent {
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

    this._platformEventToAction = this._platformEventToAction.bind(this);
  }

  componentDidMount() {
    const {video} = this.props;
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
}


Video.propTypes = {
  video: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default Video;
