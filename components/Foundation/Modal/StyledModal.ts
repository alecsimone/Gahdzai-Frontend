import { coolGrey, deepBlack } from "@/styles/constants/colors";
import { bigText } from "@/styles/constants/fontSizes";
import { setAlpha } from "@/styles/functions/modifyColorFunctions";
import { scroll } from "@/styles/theme";
import styled from "styled-components";

const StyledModal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  background: ${setAlpha(deepBlack, 0.75)};
  width: 100%;
  height: 100%;
  .modalMolder {
    display: grid;
    position: relative;
    align-items: center;
    justify-content: center;
    border: 1px solid ${setAlpha(coolGrey, 0.25)};
    border-radius: 0.5rem;
    background: ${deepBlack};
    min-width: min(90vh, 90vw);
    max-width: 66%;
    height: 90%;
    min-height: calc(min(90vh, 90vw) * 0.75);
    max-height: 90%;
    overflow: hidden;
    font-size: ${bigText};
    .modalContent {
      padding: 3rem;
      max-height: 100%;
      ${scroll}
      > * {
        display: block;
        margin: auto;
      }
    }
  }
  svg.closeModal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 0.25;
    width: ${(props) => props.theme.smallText};
    &:hover {
      opacity: 0.5;
    }
  }
`;

export default StyledModal;
