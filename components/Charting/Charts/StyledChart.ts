import styled from 'styled-components';
import { coolGrey, lightBlack } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const StyledChart = styled.canvas`
  border: 1px solid ${setAlpha(coolGrey, 0.3)};
  /* background: ${setAlpha(lightBlack, 0.5)}; */
  border-radius: 2px;
  margin: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  cursor: crosshair;
  &.shadow {
    background: none;
    border: none;
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export default StyledChart;
