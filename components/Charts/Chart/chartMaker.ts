import { RefObject } from 'react';
import { Candle, CandleCollection } from '@/__generated__/graphql';
import getChartBoundaries from './chartShapers/getChartBoundaries';
import makeGrid from './gridMakers/makeGrid';
import makeCandles from './candlestickMakers/makeCandles';
import getUsableHeight from './utils/getUsableHeight';
import getUsableWidth from './utils/getUsableWidth';
import setChartSize from './chartShapers/setChartSize';
import { ChartData } from './types';
import convertCandlesToPoints from './drawMovingAverageLine/convertCandlesToPoints';
import drawMovingAverageLine from './drawMovingAverageLine/drawMovingAverageLine';
import setUpFont from './gridMakers/setUpFont';

type ChartTypes = 'Candlestick' | 'PercentChange';

interface ChartMakerInterface {
  chartRef: RefObject<HTMLCanvasElement>;
  candleData?: Candle[];
  candleCollection?: CandleCollection[];
  chartType: ChartTypes;
}

const chartMaker = (dataObj: ChartMakerInterface) => {
  const { chartRef, candleData, candleCollection, chartType } = dataObj;

  if (chartRef.current == null) return;
  setChartSize(chartRef.current);

  if (chartRef.current == null) return;
  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return;

  let fullCandleData: Candle[];
  if (chartType === 'Candlestick' && candleData != null) {
    fullCandleData = candleData;
  } else if (chartType === 'PercentChange' && candleCollection != null) {
    const collectedCandles: Candle[] = [];
    candleCollection.forEach((collection) => {
      collectedCandles.concat(collection.candles);
    });

    fullCandleData = collectedCandles;
  } else {
    return;
  }
  const chartBoundaries = getChartBoundaries(fullCandleData);

  const { width, height } = chartRef.current;
  setUpFont(ctx);

  const usableHeight = getUsableHeight(height, ctx);
  const usableWidth = getUsableWidth({ width, ctx, chartBoundaries });

  const chartData: ChartData = {
    ctx,
    usableWidth,
    usableHeight,
    chartBoundaries,
  };

  makeGrid(chartData);

  if (chartType === 'Candlestick' && candleData != null) {
    makeCandles(candleData, chartData);

    const dataPoints = convertCandlesToPoints(candleData);
    drawMovingAverageLine(dataPoints, chartData, ctx);
  } else if (chartType === 'PercentChange') {
    console.log(candleData);
  }
};

export default chartMaker;
