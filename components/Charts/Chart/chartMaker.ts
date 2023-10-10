import { RefObject, Dispatch, SetStateAction } from 'react';
import { Candle } from '@/__generated__/graphql';
import makeGrid from './gridMakers/makeGrid';
import getUsableHeight from './utils/getUsableHeight';
import getUsableWidth from './utils/getUsableWidth';
import setChartSize from './chartShapers/setChartSize';
import { ChartData, ChartProps, PercentageChanges, DataPoint } from './types';
import setUpFont from './gridMakers/setUpFont';
import makeCandlestickChart from './makeCandlestickChart';
import makePercentageChart from './makePercentageChart';
import getChartBoundaries from './chartShapers/getChartBoundaries';
import setLegendGridProperties from './legendMakers/setLegendGridProperties';
import { HighlightedSymbols } from '../ChartHolder/Contexts/HighlightContext';

export interface ChartMakerInterfaceBase {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightedSymbols: HighlightedSymbols[];
}

export interface CandleChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'Candlestick';
  data: Candle[];
}

export interface PercentageChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'PercentChange';
  data: PercentageChanges[];
}

export type ChartMakerInterface =
  | CandleChartMakerInterface
  | PercentageChartMakerInterface;

export type ChartSize = { usableWidth: number; usableHeight: number } | false;

const chartMaker = (dataObj: ChartMakerInterface): ChartSize => {
  const {
    chartRef,
    shadowChartRef,
    chartType,
    data,
    setLegendElements,
    highlightedSymbols,
  } = dataObj;

  if (chartRef.current == null || shadowChartRef.current == null) return false;
  setChartSize(chartRef.current);
  setChartSize(shadowChartRef.current);

  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return false;
  setUpFont(ctx);

  const { width, height } = chartRef.current;

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

  let finalDatapoints: DataPoint[] = [];
  if (chartType === 'Candlestick') {
    finalDatapoints = makeCandlestickChart({
      data,
      chartData,
      setLegendElements,
    });
  } else if (chartType === 'PercentChange') {
    finalDatapoints = makePercentageChart({
      data,
      chartData,
      setLegendElements,
      highlightedSymbols,
    });
  }
  makeGrid(chartData, finalDatapoints);

  setLegendGridProperties(chartRef.current);

  return {
    usableHeight,
    usableWidth,
  };
};

export default chartMaker;
