import styled from "styled-components";
import { setAlpha } from "@/styles/functions/modifyColorFunctions";
import { blue, coolGrey, green, red } from "../constants/colors";

const StyledForm = styled.form`
  fieldset {
    margin: 0;
    border: none;
    padding: 0;
  }
  .requirements {
    position: relative;
    max-width: 100%;
    color: ${setAlpha(red, 0.75)};
    font-weight: bold;
  }
  .inputWrapper {
    position: relative;
    margin: 1.5rem 0;
    &:focus-within {
      .requirements {
        display: none;
      }
    }
  }
  input {
    border: 1px solid ${coolGrey};
    padding: 1.5rem;
    width: 100%;
    &:valid:not(:placeholder-shown) {
      border: 1px solid ${setAlpha(green, 0.5)};
    }
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    margin: 2rem 0 0;
    button[type="submit"] {
      display: block;
      transition: opacity 0.2s;
      background: ${setAlpha(blue, 0.8)};
      &[aria-disabled="true"] {
        opacity: 0.5;
        color: ${coolGrey};
      }
    }
    button.cancel {
      background: ${setAlpha(red, 0.25)};
      &:hover {
        background: ${setAlpha(red, 0.4)};
      }
    }
  }
`;

export default StyledForm;
