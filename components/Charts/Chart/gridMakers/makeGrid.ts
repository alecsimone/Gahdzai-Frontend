import { ChartBoundaries } from '../candlestickMakers/types';
import makeGridLines from './makeGridLines';

const makeGrid = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  chartBoundaries: ChartBoundaries
) => {
  const { chartTop, chartBottom, chartStart, chartEnd } = chartBoundaries;
  makeGridLines('horizontal', {
    ctx,
    usablePixelSize: usableHeight,
    lineTerminus: usableWidth,
    originValue: chartTop,
    terminusValue: chartBottom,
  });
  makeGridLines('vertical', {
    ctx,
    usablePixelSize: usableWidth,
    lineTerminus: usableHeight,
    originValue: chartStart,
    terminusValue: chartEnd,
  });
};

export default makeGrid;
