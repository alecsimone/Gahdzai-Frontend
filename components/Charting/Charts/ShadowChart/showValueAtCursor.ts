/* eslint-disable @typescript-eslint/no-loop-func */
import type {
  Coordinate,
  CoordinatedDataPoint,
  UsableBoundaries,
} from '../types';
import drawValueHighlightBubbles from './drawValueHighlightBubbles';
import makeValuesBox from './ValuesBox/makeValuesBox';
import type { ChartTypes } from '../../ChartHolder/types';

// * Finds the value of any lines on this chart at the X position of the cursor
type Signature = (dataObj: {
  mouseCoords: Coordinate;
  coordinatedData: CoordinatedDataPoint[];
  usableBoundaries: UsableBoundaries;
  shadowChart: HTMLCanvasElement;
  chartType: ChartTypes;
}) => number;

const maxFuzz = 10;

const showValueAtCursor: Signature = ({
  mouseCoords,
  coordinatedData,
  usableBoundaries: { usableHeight, usableWidth },
  shadowChart,
  chartType,
}) => {
  if (
    mouseCoords.x > usableWidth.current ||
    mouseCoords.y > usableHeight.current
  ) {
    return 0;
  }

  let matchingDataPoints: CoordinatedDataPoint[] = [];
  if (chartType === 'Comparison') {
    let positionFuzz = 0;
    while (matchingDataPoints.length === 0 && positionFuzz < maxFuzz) {
      matchingDataPoints = coordinatedData.filter(
        (coordinatedDataPoint) =>
          coordinatedDataPoint.x === mouseCoords.x + positionFuzz
      );
      if (matchingDataPoints.length === 0 && positionFuzz > 0) {
        matchingDataPoints = coordinatedData.filter(
          (coordinatedDataPoint) =>
            coordinatedDataPoint.x === mouseCoords.x - positionFuzz
        );
      }
      positionFuzz += 1;
    }
  } else {
    let positionFuzz = 0;
    while (matchingDataPoints.length === 0 && positionFuzz < maxFuzz) {
      matchingDataPoints = coordinatedData.filter(
        (coordinatedDataPoint) =>
          coordinatedDataPoint.x <= mouseCoords.x + positionFuzz &&
          coordinatedDataPoint.x + coordinatedDataPoint.width! >=
            mouseCoords.x - positionFuzz
      );

      positionFuzz += 1;
    }
  }

  if (matchingDataPoints.length > 0) {
    const ctx = shadowChart.getContext('2d');
    if (ctx) {
      if ('change' in matchingDataPoints[0]!.data) {
        // We only want to draw the bubbles for percentage change sets
        drawValueHighlightBubbles({
          ctx,
          coordinatedDataPoints: matchingDataPoints,
        });
      }
      makeValuesBox({
        ctx,
        coordinatedDataPoints: matchingDataPoints,
        mouseX: mouseCoords.x,
        usableWidth: usableWidth.current,
      });
    }
    return matchingDataPoints[0]!.data.time;
  }
  return 0;
};

export default showValueAtCursor;
