import { ChartBoundaries } from '../candlestickMakers/types';
import makeHorizontalLines from './makeHorizontalLines';
import makeVerticalLines from './makeVerticalLines';

const makeGrid = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  chartBoundaries: ChartBoundaries
) => {
  const { chartTop, chartBottom, chartStart, chartEnd } = chartBoundaries;
  makeHorizontalLines(ctx, usableWidth, usableHeight, chartTop, chartBottom);
  makeVerticalLines(ctx, usableWidth, usableHeight, chartStart, chartEnd);
};

export default makeGrid;
