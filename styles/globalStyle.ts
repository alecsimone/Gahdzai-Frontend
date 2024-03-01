import { createGlobalStyle } from 'styled-components';
import {
  desktopBreakpoint,
  massiveScreenBreakpoint,
  midScreenBreakpoint,
} from './constants/breakpoints';
import { coolGrey, deepBlack, white } from './constants/colors';
import { smallText } from './constants/fontSizes';
import { setAlpha } from './functions/modifyColorFunctions';

const GlobalStyle = createGlobalStyle`
  html {
    background: ${deepBlack};
    color: ${white};
    height: 100vh;
    box-sizing: border-box;
    font-size: 6px;
    ${desktopBreakpoint} {
      font-size: 8px;
    }
    ${midScreenBreakpoint} {
      font-size: 10px;
    }
    ${massiveScreenBreakpoint} {
      font-size: 12px;
    }
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  #__next {
    height: 100%;
    min-height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  button {
    background: none;
    border: 1px solid ${white};
    color: ${white};
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    &:hover {
      background: ${setAlpha(coolGrey, 0.25)};
    }
  }

  input {
    background: ${setAlpha(coolGrey, 0.1)};
    border: 1px solid ${white};
    border-radius: 3px;
    color: ${white};
    padding: 0.5rem 1rem;
    font-size: ${smallText};
    &:focus {
      border: none;
      padding: calc(0.5rem + 1px) calc(1rem + 1px);
    }
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
