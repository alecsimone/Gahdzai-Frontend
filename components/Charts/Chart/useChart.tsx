import { useEffect, useRef } from 'react';
import { Candle } from '@/__generated__/graphql';
import chartMaker from './chartMaker';

export type ChartTypes = 'Candlestick' | 'PercentChange';

const useChart = (candleData: Candle[], chartType: ChartTypes) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    chartMaker({ chartRef, candleData, chartType });

    const chartMakerHandler = () => {
      chartMaker({ chartRef, candleData, chartType });
    };

    window.addEventListener('resize', chartMakerHandler);

    return () => {
      window.removeEventListener('resize', chartMakerHandler);
    };
  }, [candleData]);

  return chartRef;
};

export default useChart;
