import { Candle } from '@/__generated__/graphql';
import drawCandle from './drawCandle';
import getCandleShape from './getCandleShape';
import { ChartData } from '../types';
import getSafelySizedCandles from './getSafelySizedCandles';

const makeCandles = (candleData: Candle[], chartData: ChartData) => {
  const { ctx, usableWidth: chartUsableWidth } = chartData;

  const { safelySizedCandleData, candleWidth } = getSafelySizedCandles({
    candleData,
    chartUsableWidth,
  });

  safelySizedCandleData.forEach((candle) => {
    const candleShape = getCandleShape(candle, candleWidth, chartData);

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
