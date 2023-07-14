import styled from "styled-components";
import { bigText } from "../constants/fontSizes";

const SVG = styled.svg`
  transition: transform 0.3s;
  cursor: pointer;
  width: ${bigText};
  /* I'm not going to declare a height value here, because it isn't really necessary, and if I do then I have to set both height and width any time I want to change it
  height: ${bigText}; */
  &.pointingLeft {
    transform: rotate(90deg);
  }
  &.pointingRight {
    transform: rotate(-90deg);
  }
  &.pointingUp {
    transform: rotate(180deg);
  }
`;

export default SVG;
