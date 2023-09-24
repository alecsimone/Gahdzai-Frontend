import { useEffect, useRef } from 'react';
import chartMaker, { ChartMakerInterface } from './chartMaker';
import { ChartProps } from './types';

const useChart = ({ data, chartType, setLegendElements }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartMakerDataObj: ChartMakerInterface;
    if (chartType === 'Candlestick') {
      chartMakerDataObj = {
        chartRef,
        data,
        chartType,
        setLegendElements,
      };
    } else {
      chartMakerDataObj = {
        chartRef,
        data,
        chartType,
        setLegendElements,
      };
    }
    chartMaker(chartMakerDataObj);

    const chartMakerHandler = () => {
      chartMaker(chartMakerDataObj);
    };

    window.addEventListener('resize', chartMakerHandler);

    return () => {
      window.removeEventListener('resize', chartMakerHandler);
    };
  }, [data, chartType]);

  return chartRef;
};

export default useChart;
