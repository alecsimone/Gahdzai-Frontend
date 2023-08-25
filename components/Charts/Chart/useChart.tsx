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

  useEffect(() => {
    if (chartRef.current == null) return;
    const ctx = chartRef.current.getContext('2d');
    if (ctx == null) return;

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
