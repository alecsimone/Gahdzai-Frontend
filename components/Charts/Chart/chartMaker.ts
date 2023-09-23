import { RefObject } from 'react';
import { Candle, PercentageChanges } from '@/__generated__/graphql';
import makeGrid from './gridMakers/makeGrid';
import getUsableHeight from './utils/getUsableHeight';
import getUsableWidth from './utils/getUsableWidth';
import setChartSize from './chartShapers/setChartSize';
import { ChartData, ChartProps } from './types';
import setUpFont from './gridMakers/setUpFont';
import makeCandlestickChart from './makeCandlestickChart';
import makePercentageChart from './makePercentageChart';
import getChartBoundaries from './chartShapers/getChartBoundaries';

export interface ChartMakerInterfaceBase {
  chartRef: RefObject<HTMLCanvasElement>;
}

interface CandleChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'Candlestick';
  data: Candle[];
}

interface PercentageChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'PercentChange';
  data: PercentageChanges[];
}

export type ChartMakerInterface =
  | CandleChartMakerInterface
  | PercentageChartMakerInterface;

const chartMaker = (dataObj: ChartMakerInterface) => {
  const { chartRef, chartType, data } = dataObj;

  if (chartRef.current == null) return;
  setChartSize(chartRef.current);

  if (chartRef.current == null) return;
  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return;

  const { width, height } = chartRef.current;
  setUpFont(ctx);

  let chartProps: ChartProps;
  if (chartType === 'Candlestick') {
    chartProps = {
      data,
      chartType,
    };
  } else {
    chartProps = {
      data,
      chartType,
    };
  }

  const chartBoundaries = getChartBoundaries(chartProps);

  const usableHeight = getUsableHeight(height, ctx);
  const usableWidth = getUsableWidth({
    width,
    ctx,
    chartBoundaries,
    chartType,
  });

  const chartData: ChartData = {
    ctx,
    usableWidth,
    usableHeight,
    chartBoundaries,
    chartType,
  };

  makeGrid(chartData); // TODO Add chart type, put percentages after labels for percentage change type

  if (chartType === 'Candlestick') {
    makeCandlestickChart({ data, chartData });
  } else if (chartType === 'PercentChange') {
    makePercentageChart({ data, chartData });
  }
};

export default chartMaker;
