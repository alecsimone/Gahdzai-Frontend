import { Candle } from '@/__generated__/graphql';
import { verticalGutter } from '../constants';
import drawCandle from './drawCandle';
import getCandleWidth from './getCandleWidth';
import getCandleShape from './getCandleShape';
import { ChartData } from '../types';

const makeCandles = (candleData: Candle[], chartData: ChartData) => {
  const { ctx, usableWidth: chartUsableWidth } = chartData;

  const candleWidth = getCandleWidth(
    chartUsableWidth - verticalGutter,
    candleData.length
  );

  candleData.forEach((candle) => {
    const candleShape = getCandleShape(candle, candleWidth, chartData);

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
