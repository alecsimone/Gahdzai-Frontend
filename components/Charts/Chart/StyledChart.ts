import styled from 'styled-components';
import { coolGrey, lightBlack } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const StyledChart = styled.canvas`
  border: 1px solid ${setAlpha(coolGrey, 0.3)};
  background: ${lightBlack};
  border-radius: 3px;
  margin: calc(2rem - 2px);
  height: calc(100% - 4rem);
  width: calc(100% - 4rem);
`;

export default StyledChart;
