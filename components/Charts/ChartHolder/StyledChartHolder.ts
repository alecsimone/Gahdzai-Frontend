import styled from 'styled-components';
import { smallText } from '@/styles/constants/fontSizes';
import { coolGrey, white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const StyledChartHolder = styled.section`
  height: 100%;
  width: 100%;
  --chart-side-margin: calc(2rem - 2px);
  header {
    height: auto;
    margin: 0 var(--chart-side-margin);
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    > * {
      margin: 0 0.5rem;
      height: 100%;
      &:first-child {
        margin-left: 0;
      }
    }
    h6.chartLabel {
      background: ${setAlpha(coolGrey, 0.4)};
      border: 1px solid ${setAlpha(coolGrey, 0.8)};
      padding: 0.5rem 1rem;
      font-weight: 500;
      border-radius: 3px;
      color: ${white};
      font-size: ${smallText};
      span {
        margin: 0 0.5rem;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export default StyledChartHolder;
