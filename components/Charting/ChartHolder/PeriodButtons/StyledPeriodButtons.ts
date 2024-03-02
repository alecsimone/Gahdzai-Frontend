import styled from 'styled-components';
import { blue, white } from '@/styles/constants/colors';
import {
  setAlpha,
  setLightness,
} from '@/styles/functions/modifyColorFunctions';
import { desktopBreakpoint } from '@/styles/constants/breakpoints';

const StyledPeriodButtons = styled.div`
  &.collapsed {
    button.period.active {
      color: ${setAlpha(white, 0.6)};
      background: ${setAlpha(setLightness(blue, 60), 0.1)};
      &:hover {
        background: ${setAlpha(blue, 0.75)};
      }
    }
  }
  text-align: center;
  flex-grow: 1;
  .periodButtonsWrapper {
    display: flex;
    justify-content: flex-end;
    margin: auto;
  }
  button.period {
    flex-grow: 1;
    border-radius: 1rem;
    max-width: 7rem;
    padding: 0.25rem 0;
    line-height: 1;
    margin: 0 0.25rem;
    ${desktopBreakpoint} {
      margin: 0 1rem;
    }
    background: ${setAlpha(setLightness(blue, 60), 0.1)};
    transition: background 0.2s;
    &:hover {
      background: ${setAlpha(blue, 0.75)};
    }
    &.active {
      background: ${setAlpha(blue, 0.75)};
      &:hover {
        background: ${setAlpha(setLightness(blue, 60), 0.1)};
      }
    }
  }
`;

export default StyledPeriodButtons;
