import { RefObject, Dispatch, SetStateAction, ReactNode } from 'react';
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
  shadowChartRef: RefObject<HTMLCanvasElement>;
  setLegendElements: Dispatch<SetStateAction<ReactNode[]>>;
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

const chartMaker = (
  dataObj: ChartMakerInterface
): { usableWidth: number; usableHeight: number } | false => {
  const { chartRef, shadowChartRef, chartType, data, setLegendElements } =
    dataObj;

  if (chartRef.current == null || shadowChartRef.current == null) return false;
  setChartSize(chartRef.current);
  setChartSize(shadowChartRef.current);

  if (chartRef.current == null) return false;
  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return false;

  const { width, height } = chartRef.current;
  setUpFont(ctx);

  let chartProps: ChartProps;
  if (chartType === 'Candlestick') {
    chartProps = {
      data,
      chartType,
      setLegendElements,
    };
  } else {
    chartProps = {
      data,
      chartType,
      setLegendElements,
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

  makeGrid(chartData);

  if (chartType === 'Candlestick') {
    makeCandlestickChart({ data, chartData, setLegendElements });
  } else if (chartType === 'PercentChange') {
    makePercentageChart({ data, chartData, setLegendElements });
  }

  return {
    usableHeight,
    usableWidth,
  };
};

export default chartMaker;
