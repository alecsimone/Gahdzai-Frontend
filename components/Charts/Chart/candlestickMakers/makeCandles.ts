import { Candle } from '@/__generated__/graphql';
import { minimumCandleWidth } from '../constants';
import drawCandle from './drawCandle';
import getCandleWidth from './getCandleWidth';
import getCandleShape from './getCandleShape';
import { ChartData } from '../types';
import getSafelySizedCandles from './getSafelySizedCandles';

const makeCandles = (candleData: Candle[], chartData: ChartData) => {
  const { ctx, usableWidth: chartUsableWidth } = chartData;

  let candleWidth = getCandleWidth(chartUsableWidth, candleData.length);

  let safelySizedCandleData = candleData;
  if (candleWidth < minimumCandleWidth) {
    console.log('we need to resize these candles');
    safelySizedCandleData = getSafelySizedCandles({
      candleData,
      chartUsableWidth,
    });
    candleWidth = getCandleWidth(
      chartUsableWidth,
      safelySizedCandleData.length
    );
  }

  safelySizedCandleData.forEach((candle) => {
    const candleShape = getCandleShape(candle, candleWidth, chartData);

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
