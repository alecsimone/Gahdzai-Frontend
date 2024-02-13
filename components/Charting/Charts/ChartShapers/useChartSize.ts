import { type RefObject, useEffect, useState } from 'react';
import type { ChartSize } from '../types';
import setChartSize from './setChartSize';

// * Creates a ref for the current size of the chart's container and adds a resize listener to recalculate that size any time it changes
type Signature = (chartRef: RefObject<HTMLCanvasElement>) => ChartSize;

const useChartSize: Signature = (chartRef) => {
  const [chartSize, setChartSizeState] = useState({
    chartWidth: 0,
    chartHeight: 0,
  });
  // const chartSizeRef = useRef<ChartSize>({ chartHeight: 0, chartWidth: 0 });
  // if (chartRef.current) {
  //   chartSizeRef.current = setChartSize(chartRef.current);
  // }

  useEffect(() => {
    const chartSizeHandler = () => {
      if (chartRef.current) {
        const { chartWidth, chartHeight } = setChartSize(chartRef.current);
        setChartSizeState((prev) => {
          if (
            prev.chartHeight !== chartHeight ||
            prev.chartWidth !== chartWidth
          ) {
            return {
              chartWidth,
              chartHeight,
            };
          }
          return prev;
        });
      }
      // if (chartRef.current) {
      //   chartSizeRef.current = setChartSize(chartRef.current);
      // }
    };
    chartSizeHandler();

    window.addEventListener('resize', chartSizeHandler);

    return () => {
      window.removeEventListener('resize', chartSizeHandler);
    };
  }, [chartRef]);

  return chartSize;
};

export default useChartSize;
