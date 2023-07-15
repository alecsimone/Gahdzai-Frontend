import {
  bigScreenBPWidth,
  desktopBPWidth,
  massiveScreenBPWidth,
  midScreenBPWidth,
} from "../styles/constants/breakpoints";

const viewports = {
  mobile: {
    name: "Mobile",
    type: "Mobile",
    styles: {
      width: "600px",
      height: "1000px",
    },
  },
  desktop: {
    name: "Desktop",
    type: "Desktop",
    styles: {
      width: desktopBPWidth,
      height: "1280px",
    },
  },
  midScreen: {
    name: "Mid Screen",
    type: "Mid Screen",
    styles: {
      width: midScreenBPWidth,
      height: "2000px",
    },
  },
  bigScreen: {
    name: "Big Screen",
    type: "Big Screen",
    styles: {
      width: bigScreenBPWidth,
      height: "2400px",
    },
  },
  massiveScreen: {
    name: "Massive Screen",
    type: "Massive Screen",
    styles: {
      width: massiveScreenBPWidth,
      height: "3000px",
    },
  },
};

export default viewports;
