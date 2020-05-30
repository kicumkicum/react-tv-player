import React, {PureComponent} from "react";
import pt from "prop-types";
import Key from "zb/device/input/key";


const withVideoControls = (Component) => {
  return class WithVideoControls extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFullScreen: props.video.getViewport().isFullScreen(),
      };
      this._keyHandler = this._keyHandler.bind(this);
    }

    componentDidMount() {
      const {keyHandler} = this.props;

      keyHandler.processKey = this._keyHandler;
    }

    render() {
      return (
        <Component
          {...this.props}
          // TODO: Find better method for rerender after use full screen.
          // TODO: Mb use `key`?
          isFullScreen={this.state.isFullScreen}
        />
      );
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
          this.setState({
            isFullScreen: video.getViewport().isFullScreen(),
          });
          break;
        case Key.DIGIT_7:
          video.setPlaybackRate(3 - video.getPlaybackRate());
          break;
        case Key.DIGIT_8:
          this._shakeVideo();
          break;
        case Key.DIGIT_0:
          window.location.reload();
          break;
      }
    }
  };
};


withVideoControls.propTypes = {
  keyHandler: pt.object.isRequired,
  video: pt.object.isRequired,
  src: pt.string.isRequired,
};


export default withVideoControls;
