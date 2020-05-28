import DeviceTizen from "zombiebox-platform-tizen/lib/device.js";
import DeviceWebos from "zombiebox-platform-webos/lib/device.js";

import createDevicePc from "zombiebox-platform-pc/lib/factory.js";
import createDeviceTizen from "zombiebox-platform-tizen/lib/factory.js";
import createDeviceWebos from "zombiebox-platform-webos/lib/factory.js";


const Platform = {
  PC: `pc`,
  TIZEN: `tizen`,
  WEBOS: `webos`,
};

const DeviceFactory = {
  [Platform.PC]: createDevicePc,
  [Platform.WEBOS]: createDeviceWebos,
  [Platform.TIZEN]: createDeviceTizen,
};

const detectDevice = () => {
  if (DeviceTizen.detect()) {
    return Platform.TIZEN;
  } else if (DeviceWebos.detect()) {
    return Platform.WEBOS;
  }

  return Platform.PC;
};


/**
 * @override
 */
const createDevice = () => {
  const platformName = detectDevice();

  return DeviceFactory[platformName]();
};


export {createDevice};
