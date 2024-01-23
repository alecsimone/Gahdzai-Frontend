import { useContext, type RefObject } from 'react';
import { type ChartInterface, type ChartMakerInterface } from './types';
import useMouseCoords from './useMouseCoords';
import useChartMaker from './useChartMaker';
import useCrosshairs from './useCrosshairs';
import { HighlightContext } from '../ChartHolder/Contexts/HighlightContext';
import getPercentageChangesFromCandles from './utils/getPercentageChangesFromCandles';
import { PeriodContext } from '../ChartHolder/Contexts/ChartPeriodContext';
import useChartRefs from './useChartRefs';

// * Our master hook for the Chart component. There are three sub-hooks that it calls, and it does a little data wrangling to give them what they need
// - We need to check context for any highlightedSymbols and the activePeriod. We also set up the Refs for our two canvases. Once we've done that we can create our chartMakerDataObj
// - We call useChartMaker to set up our chart and attach it to a resize listener so that we can remake our chart when the window resizes
// - Finally, we call useMouseCoords and useCrosshairs to set up crosshairs that will follow the mouse on the shadowChart

type Signature = (obj: ChartInterface) => {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
};

const useChart: Signature = ({ data, chartType, setLegendElements }) => {
  const { highlightedSymbols } = useContext(HighlightContext);
  const { activePeriod } = useContext(PeriodContext);

  const { chartRef, shadowChartRef } = useChartRefs();

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
