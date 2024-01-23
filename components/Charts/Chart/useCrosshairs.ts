import { MutableRefObject, RefObject, useEffect } from 'react';
import { ChartSize } from './types';
import { MouseCoords } from './utils/getMousePosOverCanvas';
import drawCrosshairs from './gridMakers/drawCrosshairs';

interface UseCrossHairsInterface {
  sizeRef: MutableRefObject<ChartSize>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
  mouseCoords: MutableRefObject<MouseCoords>;
}

const useCrosshairs = ({
  sizeRef,
  shadowChartRef,
  mouseCoords,
}: UseCrossHairsInterface) => {
  useEffect(() => {
    const crosshairHandler = () => {
      const ctx = shadowChartRef.current?.getContext('2d');
      if (ctx && sizeRef.current) {
        drawCrosshairs({
          coords: mouseCoords.current,
          ctx,
          size: sizeRef.current,
        });
      }
    };
    if (sizeRef.current) {
      window.addEventListener('mousemove', crosshairHandler);
    }

    return () => {
      window.removeEventListener('mousemove', crosshairHandler);
    };
  }, [mouseCoords, sizeRef, shadowChartRef]);
};

export default useCrosshairs;
