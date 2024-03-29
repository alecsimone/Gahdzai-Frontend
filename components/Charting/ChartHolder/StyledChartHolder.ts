import styled from 'styled-components';
import { smallText } from '@/styles/constants/fontSizes';
import {
  coolGrey,
  lightBlack,
  midBlack,
  white,
} from '@/styles/constants/colors';
import {
  setAlpha,
  setSaturation,
} from '@/styles/functions/modifyColorFunctions';
import { downColor, upColor } from '../Charts/constants';

export const minimumLegendElementRemSize = 20;

const StyledChartHolder = styled.section`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  header {
    height: auto;
    margin: 1rem 0 0 0;
    flex-grow: 0;
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(${minimumLegendElementRemSize}rem, 1fr)
    );
    grid-gap: 1rem;
    > * {
      margin: 0;
      height: 100%;
    }
    h6.chartLabel {
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background: ${midBlack};
      &.highlighted {
        background: ${lightBlack};
      }
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
        /* background: ${setAlpha(coolGrey, 0.5)}; */
      }
      border: 1px solid ${setAlpha(coolGrey, 0.4)};
      padding: 0.5rem 1rem;
      font-weight: 300;
      border-radius: 3px;
      color: ${white};
      font-size: ${smallText};
      flex-grow: 1;
      text-align: center;
      max-width: 72rem;
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
    height: 0;
    flex-grow: 1;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    button.heatmapToggler {
      color: ${setAlpha(white, 0.6)};
    }
  }
`;

export default StyledChartHolder;
