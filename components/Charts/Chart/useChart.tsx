import { useContext, useRef, RefObject } from 'react';
import { ChartMakerInterface } from './chartMaker';
import { ChartInterface } from './types';
import useMouseCoords from './useMouseCoords';
import useChartMaker from './useChartMaker';
import useCrosshairs from './useCrosshairs';
import { HighlightContext } from '../ChartHolder/Contexts/HighlightContext';
import getPercentageChangesFromCandles from './utils/getPercentageChangesFromCandles';
import { PeriodContext } from '../ChartHolder/Contexts/ChartPeriodContext';

// * Our master hook for the Chart component. There are three sub-hooks that it calls, and it does a little data wrangling to give them what they need
// - useMouseCoords() gets the coordinates of the mouse relative to the chart. It will be used for showing crosshairs and any information that pops up on hover
// -

type Signature = (obj: ChartInterface) => {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
};

const useChart: Signature = ({ data, chartType, setLegendElements }) => {
  const { highlightedSymbols } = useContext(HighlightContext);
  const { activePeriod } = useContext(PeriodContext);

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

  const { mouseCoords } = useMouseCoords(shadowChartRef);
  useCrosshairs({ sizeRef, shadowChartRef, mouseCoords });

  return { chartRef, shadowChartRef };
};

export default useChart;
