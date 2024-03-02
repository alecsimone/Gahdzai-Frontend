import styled from 'styled-components';
import { deepBlack, lightBlack, white } from '@/styles/constants/colors';
import { bigText, miniText, smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { desktopBreakpoint } from '@/styles/constants/breakpoints';
import {
  MIN_HEATMAP_GRID_COLUMN_SIZE,
  MIN_HEATMAP_GRID_ROW_SIZE,
  downColor,
  upColor,
} from '../Charting/Charts/constants';

const StyledHeatmap = styled.section`
  display: block;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${MIN_HEATMAP_GRID_COLUMN_SIZE}px, 1fr)
  );
  grid-template-rows: repeat(
    auto-fit,
    minmax(${MIN_HEATMAP_GRID_ROW_SIZE}px, 1fr)
  );
  article.heatmapItem {
    border: 1px solid ${deepBlack};
    position: relative;
    &.large {
      font-size: ${bigText};
    }
    &.medium {
      font-size: ${smallText};
    }
    &.small {
      font-size: ${miniText};
    }
    .outerWrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .innerWrapper {
      background: ${setAlpha(lightBlack, 0.9)};
      color: ${white};
      text-align: center;
      padding: 0.25rem;
      ${desktopBreakpoint} {
        padding: 1rem;
      }
      border-radius: 0.5rem;
      border: 1px solid ${deepBlack};
      > * {
        margin: 0.5rem 0;
      }
      h3.symbol {
        font-size: 1.4em;
        ${desktopBreakpoint} {
          font-size: 1.6em;
        }
      }
      .rawChange {
        margin-left: 0.5rem;
      }
      .changeScore {
        font-weight: bold;
        &.isPositive {
          color: ${upColor};
        }
        &.isNegative {
          color: ${downColor};
        }
      }
    }
  }
`;

export default StyledHeatmap;
