import { useEffect, useRef } from 'react';
import { Candle } from '@/__generated__/graphql';
import getChartBoundaries from './chartShapers/getChartBoundaries';
import makeGrid from './gridMakers/makeGrid';
import makeCandles from './candlestickMakers/makeCandles';
import { horizontalGutter, verticalGutter } from './gridMakers/constants';
import getUsableHeight from './utils/getUsableHeight';
import getUsableWidth from './utils/getUsableWidth';
import setChartSize from './utils/setChartSize';

const useChart = (candleData: Candle[]) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current == null) return;
    setChartSize(chartRef.current);
  }, []);

  // Then we'll have an effect that shapes the chart and makes the candles that depends on candleData
  useEffect(() => {
    // First we'll just make sure our chart exists
    if (chartRef.current == null) return;
    const ctx = chartRef.current.getContext('2d');
    if (ctx == null) return;

    // Next we set up the shape of the chart. We start by getting its width and height so we can calculate how big things within it need to be
    const { width, height } = chartRef.current;
    const usableHeight = getUsableHeight(height, horizontalGutter);
    const usableWidth = getUsableWidth(width, verticalGutter);

    const chartBoundaries = getChartBoundaries(candleData);
    makeGrid(ctx, usableWidth, usableHeight, chartBoundaries);

    makeCandles(candleData, ctx, usableHeight, usableWidth, chartBoundaries);
  }, [candleData]);

  return chartRef;
};

export default useChart;
