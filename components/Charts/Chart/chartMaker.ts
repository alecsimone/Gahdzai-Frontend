import { RefObject, Dispatch, SetStateAction } from 'react';
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
import setLegendGridProperties from './legendMakers/setLegendGridProperties';
import { HighlightedSymbols } from '../ChartHolder/HighlightContext';

export interface ChartMakerInterfaceBase {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightedSymbols: HighlightedSymbols[];
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
    makePercentageChart({
      data,
      chartData,
      setLegendElements,
      highlightedSymbols,
    });
  }

  setLegendGridProperties(chartRef.current);

  return {
    usableHeight,
    usableWidth,
  };
};

export default chartMaker;
