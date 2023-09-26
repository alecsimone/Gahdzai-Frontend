import { useEffect, useRef } from 'react';
import chartMaker, { ChartMakerInterface } from './chartMaker';
import { ChartProps } from './types';
import getMousePosOverCanvas, {
  MouseCoords,
} from './utils/getMousePosOverCanvas';
import drawCrosshairs from './gridMakers/drawCrosshairs';

const useChart = ({ data, chartType, setLegendElements }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const shadowChartRef = useRef<HTMLCanvasElement>(null);
  const mouseCoords = useRef<MouseCoords>(false);

  useEffect(() => {
    const canvas = shadowChartRef.current;
    const mouseTrackerHandler = (event: MouseEvent) => {
      const mousePos = getMousePosOverCanvas(canvas, event);
      mouseCoords.current = mousePos;
    };

    window.addEventListener('mousemove', mouseTrackerHandler);

    return () => {
      window.removeEventListener('mousemove', mouseTrackerHandler);
    };
  });

  useEffect(() => {
    let chartMakerDataObj: ChartMakerInterface;
    if (chartType === 'Candlestick') {
      chartMakerDataObj = {
        chartRef,
        shadowChartRef,
        data,
        chartType,
        setLegendElements,
      };
    } else {
      chartMakerDataObj = {
        chartRef,
        shadowChartRef,
        data,
        chartType,
        setLegendElements,
      };
    }
    const size = chartMaker(chartMakerDataObj);

    const chartMakerHandler = () => {
      chartMaker(chartMakerDataObj);
    };

    window.addEventListener('resize', chartMakerHandler);
    const crosshairHandler = () => {
      const ctx = shadowChartRef.current?.getContext('2d');
      if (ctx && size) {
        drawCrosshairs({
          coords: mouseCoords.current,
          ctx,
          size,
        });
      }
    };
    if (size) {
      window.addEventListener('mousemove', crosshairHandler);
    }

    return () => {
      window.removeEventListener('resize', chartMakerHandler);
      window.removeEventListener('mousemove', crosshairHandler);
    };
  }, [data, chartType]);

  return { chartRef, shadowChartRef };
};

export default useChart;
