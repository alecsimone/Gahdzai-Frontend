/* eslint-disable @typescript-eslint/no-loop-func */
import type {
  Coordinate,
  CoordinatedDataPoint,
  UsableBoundaries,
} from '../types';
import drawValueHighlightBubbles from './drawValueHighlightBubbles';
import makeValuesBox from './makeValuesBox';

// * Finds the value of any lines on this chart at the X position of the cursor
type Signature = (dataObj: {
  mouseCoords: Coordinate;
  coordinatedData: CoordinatedDataPoint[];
  usableBoundaries: UsableBoundaries;
  shadowChart: HTMLCanvasElement;
}) => number;

const maxFuzz = 10;

const showValueAtCursor: Signature = ({
  mouseCoords,
  coordinatedData,
  usableBoundaries: { usableHeight, usableWidth },
  shadowChart,
}) => {
  if (
    mouseCoords.x > usableWidth.current ||
    mouseCoords.y > usableHeight.current
  ) {
    return 0;
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
      if ('change' in matchingDataPoints[0]!.data) {
        // We only want to draw the bubbles for percentage change sets
        drawValueHighlightBubbles({
          ctx,
          coordinatedDataPoints: matchingDataPoints,
        });
      }
    }
    return matchingDataPoints[0]!.data.time;
  }
  return 0;
};

export default showValueAtCursor;
