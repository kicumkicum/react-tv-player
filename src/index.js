import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createDevice} from "../vendor-lib";
import InputDispatcher from "zombiebox/zb/input-dispatcher";

const VIDEO_SRC = `https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm`;

const keyHandler = {
  processKey(zbKey, e) {console.log(zbKey, e)}
};

const createInputDispatcher = (deviceInput) => {
  const inputDispatcher = new InputDispatcher(keyHandler);
  inputDispatcher.setInput(deviceInput);
  inputDispatcher.init();

  return inputDispatcher;
};


const device = createDevice();
device.init();

createInputDispatcher(device.input);

ReactDOM.render(
    <App
      device={device}
      src={VIDEO_SRC}
      keyHandler={keyHandler}
    />,
    document.querySelector(`#root`)
);
