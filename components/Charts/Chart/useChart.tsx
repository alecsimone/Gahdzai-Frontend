import { useContext, useRef } from 'react';
import { ChartMakerInterface } from './chartMaker';
import { ChartProps } from './types';

import useMouseCoords from './useMouseCoords';
import useChartMaker from './useChartMaker';
import useCrosshairs from './useCrosshairs';
import { HighlightContext } from '../ChartHolder/HighlightContext';

const useChart = ({ data, chartType, setLegendElements }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { highlightedSymbols } = useContext(HighlightContext);

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
    chartMakerDataObj = {
      chartRef,
      shadowChartRef,
      data,
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
