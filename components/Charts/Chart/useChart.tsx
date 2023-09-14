import { useEffect, useRef } from 'react';
import { Candle } from '@/__generated__/graphql';
import chartMaker from './chartMaker';

const useChart = (candleData: Candle[]) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chartMaker(chartRef, candleData);

    const chartMakerHandler = () => {
      chartMaker(chartRef, candleData);
    };

    window.addEventListener('resize', chartMakerHandler);

    return () => {
      window.removeEventListener('resize', chartMakerHandler);
    };
  }, [candleData]);

  // useEffect(() => {
  //   chartMaker(chartRef, candleData);
  // }, [chartRef, candleData]);

  return chartRef;
};

export default useChart;
