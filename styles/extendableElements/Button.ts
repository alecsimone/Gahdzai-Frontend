import styled from "styled-components";
import { setAlpha } from "@/styles/functions/modifyColorFunctions";
import { smallText } from "../constants/fontSizes";
import { coolGrey, white } from "../constants/colors";

const Button = styled.button`
  border: 1px solid ${coolGrey};
  border-radius: 3px;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: ${white};
  font-family: "proxima-nova", sans-serif;
  font-size: ${smallText};
  &:hover {
    background: ${setAlpha(coolGrey, 0.2)};
  }
`;

export default Button;
