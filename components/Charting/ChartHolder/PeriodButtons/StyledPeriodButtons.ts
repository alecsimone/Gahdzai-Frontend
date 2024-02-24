import styled from 'styled-components';
import { blue } from '@/styles/constants/colors';
import {
  setAlpha,
  setLightness,
} from '@/styles/functions/modifyColorFunctions';

const StyledPeriodButtons = styled.div`
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
    max-width: 10rem;
    padding: 0.25rem 0;
    line-height: 1;
    margin: 0 1.5rem;
    background: ${setAlpha(setLightness(blue, 60), 0.1)};
    transition: background 0.2s;
    &:hover {
      background: ${setAlpha(blue, 0.75)};
    }
    &.active {
      background: ${setAlpha(blue, 0.75)};
      cursor: default;
    }
  }
`;

export default StyledPeriodButtons;
