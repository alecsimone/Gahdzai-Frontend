import styled from 'styled-components';
import { coolGrey, lightBlack } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const StyledChart = styled.canvas`
  border: 1px solid ${setAlpha(coolGrey, 0.3)};
  background: ${lightBlack};
  border-radius: 3px;
  /* margin: calc(2rem - 2px); */
  margin: 0 var(--chart-side-margin);
  /* height: calc(100% - 7rem); */
  width: calc(100% - 4rem);
  z-index: 0;
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
