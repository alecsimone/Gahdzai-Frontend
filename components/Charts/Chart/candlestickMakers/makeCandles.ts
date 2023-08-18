import { Candle } from '@/__generated__/graphql';
import { verticalGutter } from '../gridMakers/constants';
import drawCandle from './drawCandle';
import getCandleWidth from './getCandleWidth';
import getCandleShape from './getCandleShape';
import { ChartBoundaries } from './types';

const makeCandles = (
  candleData: Candle[],
  ctx: CanvasRenderingContext2D,
  chartUsableHeight: number,
  chartUsableWidth: number,
  chartBoundaries: ChartBoundaries
) => {
  const { chartTop, chartBottom, chartStart, chartEnd } = chartBoundaries;
  const candleWidth = getCandleWidth(
    chartUsableWidth - verticalGutter,
    candleData.length
  );

  candleData.forEach((candle) => {
    const candleShape = getCandleShape(
      candle,
      candleWidth,
      chartTop,
      chartBottom,
      chartStart,
      chartEnd,
      chartUsableHeight,
      chartUsableWidth
    );

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
