import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useRef,
} from 'react';
import type { ChartSize } from '../types';
import setChartSize from './setChartSize';

// * Creates a ref for the current size of the chart's container and adds a resize listener to recalculate that size any time it changes
type Signature = (
  chartRef: RefObject<HTMLCanvasElement>,
  shadowChartRef: RefObject<HTMLCanvasElement>
) => MutableRefObject<ChartSize>;

const useChartSize: Signature = (chartRef, shadowChartRef) => {
  const chartSizeRef = useRef<ChartSize>({ chartHeight: 0, chartWidth: 0 });
  if (chartRef.current) {
    chartSizeRef.current = setChartSize(chartRef.current);
  }
  if (shadowChartRef.current) {
    setChartSize(shadowChartRef.current);
  }

  useEffect(() => {
    const chartSizeHandler = () => {
      if (chartRef.current) {
        chartSizeRef.current = setChartSize(chartRef.current);
      }
      if (shadowChartRef.current) {
        setChartSize(shadowChartRef.current);
      }
    };

    window.addEventListener('resize', chartSizeHandler);

    return () => {
      window.removeEventListener('resize', chartSizeHandler);
    };
  });

  return chartSizeRef;
};

export default useChartSize;
