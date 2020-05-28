import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createDevice} from "../vendor-lib";

const VIDEO_SRC = `//upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm`;

const device = createDevice();
device.init();


ReactDOM.render(
    <App
      device={device}
      src={VIDEO_SRC}
    />,
    document.querySelector(`#root`)
);
