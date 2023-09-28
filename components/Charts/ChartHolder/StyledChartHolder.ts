import styled from 'styled-components';
import { smallText } from '@/styles/constants/fontSizes';
import { coolGrey, white } from '@/styles/constants/colors';
import {
  setAlpha,
  setSaturation,
} from '@/styles/functions/modifyColorFunctions';
import { downColor, upColor } from '../Chart/constants';

const StyledChartHolder = styled.section`
  height: 100%;
  max-height: 100%;
  width: 100%;
  --chart-side-margin: calc(2rem - 2px);
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  header {
    height: auto;
    margin: 0 var(--chart-side-margin);
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0;
    flex-wrap: wrap;
    > * {
      margin: 0.25rem 0;
      height: 100%;
    }
    h6.chartLabel {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: min(40rem, 48%);
      max-height: 6rem;
      background: ${setAlpha(coolGrey, 0.25)};
      &.up {
        background-color: ${setSaturation(setAlpha(upColor, 0.4), 50)};
      }
      &.down {
        background-color: ${setSaturation(setAlpha(downColor, 0.4), 50)};
      }
      transition: background 0.2s;
      &:hover {
        &.loading {
          background: ${setAlpha(coolGrey, 0.25)};
        }
        background: ${setAlpha(coolGrey, 0.5)};
      }
      border: 1px solid ${setAlpha(coolGrey, 0.8)};
      padding: 0.5rem 1rem;
      font-weight: 300;
      border-radius: 3px;
      color: ${white};
      font-size: ${smallText};
      flex-grow: 1;
      text-align: center;
      &.loading {
        text-align: left;
      }
      cursor: pointer;
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
  .chartContainer {
    position: relative;
  }
  canvas {
    flex-grow: 1;
  }
`;

export default StyledChartHolder;
