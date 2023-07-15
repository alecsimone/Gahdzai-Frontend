import { ColorNames } from "../styled";
import { colorLibrary } from "../constants/colors";

const getComputedColor = (color: ColorNames) => {
  let computedColor: string = color;
  if (colorLibrary.hasOwnProperty(color)) {
    computedColor = colorLibrary[color];
  }

  return computedColor;
};

export default getComputedColor;
