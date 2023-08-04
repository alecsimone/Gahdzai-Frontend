import { useEffect, useRef } from 'react';
import { Get_Candles_QueryQuery, Candle } from '@/__generated__/graphql';
import getOneRem from '@/styles/functions/getOneRem';
import getChartShape from './chartShapers/getChartShape';
import makeVerticalLines from './gridMakers/makeVerticalLines';
import makeHorizontalLines from './gridMakers/makeHorizontalLines';

const useChart = (data: Get_Candles_QueryQuery) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current == null) return;

    const parent = chartRef.current.parentElement;
    if (parent != null) {
      const oneRem = getOneRem();
      chartRef.current.width = parent.clientWidth - 4 * oneRem;
      chartRef.current.height = parent.clientHeight - 4 * oneRem;
    }

    const ctx = chartRef.current.getContext('2d');
    if (ctx == null) return;

    const { width, height } = chartRef.current;

    const candleData = data.getCandles as Candle[];
    const { top, bottom, start, end } = getChartShape(candleData);

    makeHorizontalLines(ctx, width, height, top, bottom);
    makeVerticalLines(
      ctx,
      width,
      height,
      parseInt(start, 10),
      parseInt(end, 10)
    );
  }, []);

  return chartRef;
};

export default useChart;
