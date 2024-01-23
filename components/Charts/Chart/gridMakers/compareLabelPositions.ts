import { type LabelSkipCheckInterface } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

// * Compares a label to the one next to it to make sure that they don't overlap. We do this by getting the coordinate of each label and then adding its size to that coordinate, then making sure the other one is past the first one.
type Signature = (
  dataObj: LabelSkipCheckInterface,
  direction: 'before' | 'after'
) => boolean;

const compareLabelPositions: Signature = (
  { labelsList, i, thisLineCoord, labelText, directionalChartData },
  direction
) => {
  const {
    chartData: { ctx },
    lineDirection,
  } = directionalChartData;
  const { usablePixelSize, chartOrigin, chartTerminus } =
    getChartShapeFromChartData(directionalChartData);

  let shouldSkipLabel = false;

  // First we figure out the boundaries of the initial label
  const thisTextMeasurement = ctx.measureText(labelText);
  let thisTextOverhang: number;
  if (lineDirection === 'horizontal') {
    if (direction === 'before') {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxAscent;
    } else {
      thisTextOverhang = thisTextMeasurement.fontBoundingBoxDescent;
    }
  } else if (direction === 'before') {
    // lineDirection must be vertical
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxLeft;
  } else {
    // direction must be after
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxRight;
  }
  const thisTextBoundary = thisLineCoord - thisTextOverhang;

  // Then we get the boundary of the neighboring label
  const neighboringText =
    direction === 'before' ? labelsList[i - 1]! : labelsList[i + 1]!;
  const neighboringTextMeasurement = ctx.measureText(neighboringText);
  const neighboringLineCoord = getCoordForValue(
    Number(neighboringText),
    usablePixelSize,
    chartOrigin,
    chartTerminus
  );
  let neighboringTextOverhang: number;
  if (lineDirection === 'horizontal') {
    if (direction === 'before') {
      neighboringTextOverhang =
        neighboringTextMeasurement.fontBoundingBoxDescent; // For height, fontBoundingBox seems to be more accurate
    } else {
      neighboringTextOverhang =
        neighboringTextMeasurement.fontBoundingBoxAscent;
    }
  } else if (direction === 'before') {
    // lineDirection must be vertical
    neighboringTextOverhang = neighboringTextMeasurement.width; // I believe we need to use width because the text is aligned to the left, so the actualBoundingBoxRight seems to only get half of its true width
  } else {
    // direction must be after
    neighboringTextOverhang = neighboringTextMeasurement.actualBoundingBoxLeft;
  }
  const neighboringTextBoundary =
    neighboringLineCoord + neighboringTextOverhang;

  if (
    direction === 'before' &&
    neighboringTextBoundary + 6 > thisTextBoundary
  ) {
    shouldSkipLabel = true;
  }
  if (
    direction === 'after' &&
    thisTextBoundary + 10 > neighboringTextBoundary
  ) {
    shouldSkipLabel = true;
  }

  return shouldSkipLabel;
};

export default compareLabelPositions;
