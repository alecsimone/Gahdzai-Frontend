/* eslint-disable @typescript-eslint/no-loop-func */
import type { CoordinatedDataPoint, UsableBoundaries } from '../types';
import drawValueHighlightBubbles from './drawValueHighlightBubbles';
import type { MouseCoords } from './getMousePosOverCanvas';
import makeValuesBox from './makeValuesBox';

// * Finds the value of any lines on this chart at the X position of the cursor
type Signature = (dataObj: {
  mouseCoords: MouseCoords;
  coordinatedData: CoordinatedDataPoint[];
  usableBoundaries: UsableBoundaries;
  shadowChart: HTMLCanvasElement;
}) => void;

const maxFuzz = 10;

const showValueAtCursor: Signature = ({
  mouseCoords,
  coordinatedData,
  usableBoundaries: { usableHeight, usableWidth },
  shadowChart,
}) => {
  if (!mouseCoords) return;
  if (
    mouseCoords.x > usableWidth.current ||
    mouseCoords.y > usableHeight.current
  ) {
    return;
  }

  let matchingDataPoints = coordinatedData.filter(
    (coordinatedDataPoint) => coordinatedDataPoint.x === mouseCoords.x
  );
  let positionFuzz = 1;
  while (matchingDataPoints.length === 0 && positionFuzz < maxFuzz) {
    matchingDataPoints = coordinatedData.filter(
      (coordinatedDataPoint) =>
        coordinatedDataPoint.x === mouseCoords.x + positionFuzz
    );
    if (matchingDataPoints.length === 0) {
      matchingDataPoints = coordinatedData.filter(
        (coordinatedDataPoint) =>
          coordinatedDataPoint.x === mouseCoords.x - positionFuzz
      );
    }
    positionFuzz += 1;
  }

  if (matchingDataPoints.length > 0) {
    const ctx = shadowChart.getContext('2d');
    if (ctx) {
      makeValuesBox({
        ctx,
        coordinatedDataPoints: matchingDataPoints,
      });
      drawValueHighlightBubbles({
        ctx,
        coordinatedDataPoints: matchingDataPoints,
      });
    }
  }
};

export default showValueAtCursor;
