import { css, DefaultTheme } from "styled-components";
import {
  bigScreenBreakpoint,
  desktopBreakpoint,
  massiveScreenBreakpoint,
  midScreenBreakpoint,
  mobileBreakpoint,
} from "./constants/breakpoints";
import {
  blue,
  coolGrey,
  deepBlack,
  gold,
  green,
  lightBlack,
  midBlack,
  red,
  warmGrey,
  white,
} from "./constants/colors";
import {
  bigHead,
  bigText,
  miniText,
  smallHead,
  smallText,
  tinyText,
} from "./constants/fontSizes";
import { setAlpha, setSaturation } from "./functions/modifyColorFunctions";

const scroll = css`
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: hsl(210, 10%, 30%) hsl(30, 1%, 4%);
`;

const thingColors = css`
  border: 2px solid ${setAlpha(coolGrey, 0.15)};
  box-shadow: 0 4px 4px ${setAlpha(deepBlack, 0.2)};
  background: ${setSaturation(lightBlack, 25)};
`;

const spin = css`
  animation-name: spin;
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const spinBackward = css`
  animation-name: spinBackward;
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const twist = css`
  animation-name: twist;
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

export { scroll, thingColors, spin, spinBackward, twist };

const theme: DefaultTheme = {
  tinyText,
  miniText,
  smallText,
  bigText,
  smallHead,
  bigHead,

  white,

  lightBlack,
  midBlack,
  deepBlack,

  coolGrey,
  warmGrey,

  blue,
  green,
  gold,
  red,

  mobileBreakpoint,
  desktopBreakpoint,
  midScreenBreakpoint,
  bigScreenBreakpoint,
  massiveScreenBreakpoint,
};

export default theme;
