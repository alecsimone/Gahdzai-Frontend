import { type MutableRefObject, type RefObject } from 'react';
import { type MouseCoords } from './getMousePosOverCanvas';
import drawCrosshairs from './drawCrosshairs';

interface UseCrossHairsInterface {
  usableBoundaries: {
    usableHeight: MutableRefObject<number>;
    usableWidth: MutableRefObject<number>;
  };
  shadowChartRef: RefObject<HTMLCanvasElement>;
  mouseCoords: MouseCoords;
}

const useCrosshairs = ({
  usableBoundaries,
  shadowChartRef,
  mouseCoords,
}: UseCrossHairsInterface) => {
  const ctx = shadowChartRef.current?.getContext('2d');
  if (ctx) {
    drawCrosshairs({
      coords: mouseCoords,
      ctx,
      usableBoundaries,
    });
  }
};

export default useCrosshairs;
