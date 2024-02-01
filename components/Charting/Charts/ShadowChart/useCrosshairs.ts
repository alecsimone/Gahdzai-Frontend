import { type RefObject } from 'react';
import { type MouseCoords } from './getMousePosOverCanvas';
import drawCrosshairs from './drawCrosshairs';
import type { UsableBoundaries } from '../types';

interface UseCrossHairsInterface {
  usableBoundaries: UsableBoundaries;
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
