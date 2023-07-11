import { DefaultTheme } from "styled-components";
import { ColorNames } from "../styled";

const getComputedColor = (
  theme: DefaultTheme,
  color: ColorNames | string
): string => {
  if (theme[color] != null) {
    return theme[color];
  } else {
    return color;
  }
};

export default getComputedColor;
