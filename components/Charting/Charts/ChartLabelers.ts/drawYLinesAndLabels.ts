import type { MutableRefObject } from 'react';
import type { YLabelObject } from './labelYAxis';
import { gutterPadding } from '../constants';

// * Does the actual drawing of the y-axis (horizontal) gridlines and their labels on our canvas
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  labelObject: YLabelObject;
  textHeight: number;
  index: number;
  yAxisLabelObjectsArray: YLabelObject[];
  usableHeight: MutableRefObject<number>;
  usableWidth: MutableRefObject<number>;
  decorator: string;
}) => void;

const drawYLinesAndLabels: Signature = ({
  ctx,
  labelObject,
  textHeight,
  index,
  yAxisLabelObjectsArray,
  usableHeight,
  usableWidth,
  decorator,
}) => {
  let { yCoord } = labelObject;

  ctx.beginPath();
  if (index === 0) {
    ctx.textBaseline = 'top';
    yCoord = gutterPadding / 2;
  } else if (index === yAxisLabelObjectsArray.length - 1) {
    ctx.textBaseline = 'bottom';
    yCoord = usableHeight.current;
  } else {
    // We don't need to draw lines at the top or bottom of the chart, only for the intervening steps
    ctx.textBaseline = 'middle';
    ctx.moveTo(0, labelObject.yCoord);
    ctx.lineTo(usableWidth.current, labelObject.yCoord);
  }

  let skipLabel = false;
  if (index === 1 && yCoord < 1.5 * textHeight) {
    // If the second value is less than 1.5 textHeights from the top of the chart, we want to skip it so it doesn't overlap with the first value, which will be at the top of the chart (and 1 textHeight tall)
    skipLabel = true;
  } else if (
    index === yAxisLabelObjectsArray.length - 2 &&
    yCoord > usableHeight.current - 1.5 * textHeight
  ) {
    // If the second to last value is less than 1.5 textHeights from the bottom of the chart, we want to skip it
    skipLabel = true;
  }
  if (!skipLabel) {
    ctx.fillText(
      `${labelObject.labelText}${decorator}`,
      usableWidth.current + gutterPadding,
      yCoord
    );
  }
  ctx.stroke();
};

export default drawYLinesAndLabels;
