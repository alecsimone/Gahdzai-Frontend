import { useContext, useRef, Dispatch, SetStateAction } from 'react';
import { Candle, CandleSet } from '@/__generated__/graphql';
import { ChartMakerInterface } from './chartMaker';
import { ChartTypes } from './types';
import useMouseCoords from './useMouseCoords';
import useChartMaker from './useChartMaker';
import useCrosshairs from './useCrosshairs';
import { HighlightContext } from '../ChartHolder/HighlightContext';
import getPercentageChangesFromCandles from '../ChartHolder/getPercentageChangesFromCandles';
import { PeriodContext } from '../ChartHolder/ChartPeriodContext';

interface ChartInterfaceBase {
  data: Candle[] | CandleSet[];
  chartType: ChartTypes;
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

interface CandlestickChartInterface extends ChartInterfaceBase {
  data: Candle[];
  chartType: 'Candlestick';
}

interface PercentageChangeChartInterface extends ChartInterfaceBase {
  data: CandleSet[];
  chartType: 'PercentChange';
}

export type ChartInterface =
  | CandlestickChartInterface
  | PercentageChangeChartInterface;

const useChart = ({ data, chartType, setLegendElements }: ChartInterface) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { highlightedSymbols } = useContext(HighlightContext);
  const { activePeriod } = useContext(PeriodContext);

  const { shadowChartRef, mouseCoords } = useMouseCoords();

  let chartMakerDataObj: ChartMakerInterface;
  if (chartType === 'Candlestick') {
    chartMakerDataObj = {
      chartRef,
      shadowChartRef,
      data,
      chartType,
      setLegendElements,
      highlightedSymbols,
    };
  } else {
    const percentageChanges = getPercentageChangesFromCandles(
      data,
      activePeriod
    );

    chartMakerDataObj = {
      chartRef,
      shadowChartRef,
      data: percentageChanges,
      chartType,
      setLegendElements,
      highlightedSymbols,
    };
  }

  const sizeRef = useChartMaker(chartMakerDataObj);
  useCrosshairs({ sizeRef, shadowChartRef, mouseCoords });

  return { chartRef, shadowChartRef };
};

export default useChart;
