import { RefObject } from 'react';
import { Candle } from '@/__generated__/graphql';
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

const chartMaker = (
  chartRef: RefObject<HTMLCanvasElement>,
  candleData: Candle[]
) => {
  if (chartRef.current == null) return;
  setChartSize(chartRef.current);

  if (chartRef.current == null) return;
  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return;

  const chartBoundaries = getChartBoundaries(candleData);

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
  makeCandles(candleData, chartData);

  const dataPoints = convertCandlesToPoints(candleData);
  drawMovingAverageLine(dataPoints, chartData, ctx);
};

export default chartMaker;
