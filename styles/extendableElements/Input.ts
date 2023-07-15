import styled from "styled-components";
import { blue, coolGrey, red, white } from "../constants/colors";
import { smallText } from "../constants/fontSizes";

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${coolGrey};
  background: none;
  padding: 0.25rem 1rem;
  color: ${white};
  font-family: "proxima-nova", sans-serif;
  font-size: ${smallText};
  &:disabled {
    background: ${coolGrey};
  }
  &:focus {
    outline: 2px solid ${blue};
    border-radius: 3px;
  }
  &:invalid:not(:focus):not(:placeholder-shown) {
    border: 1px solid ${red};
  }
`;

export default Input;
