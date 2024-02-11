import type { MutableRefObject } from 'react';
import getTimeStepSize from './getTimeStepSize';
import makeTimeLabelObjectsArray from './makeTimeLabelObjectsArray';
import { gutterPadding } from '../constants';
import resetStyling from '../ChartStylers.ts/resetStyling';
import drawXLinesAndLabels from './drawXLinesAndLabels';

// * Draws the labels on the X axis of our chart
type Signature = (dataObj: {
  chartStart: number;
  chartEnd: number;
  chartWidth: number;
  timesArray: number[];
  usableWidth: MutableRefObject<number>;
  usableHeight: MutableRefObject<number>;
  ctx: CanvasRenderingContext2D;
}) => void;

const labelXAxis: Signature = ({
  chartStart,
  chartEnd,
  chartWidth,
  timesArray,
  usableWidth,
  usableHeight,
  ctx,
}) => {
  const { timeStepSize, timeStepType } = getTimeStepSize(
    chartStart,
    chartEnd,
    chartWidth
  );

  const xLabelObjectsArray = makeTimeLabelObjectsArray({
    timesArray,
    timeStepSize,
    timeStepType,
    usableWidth: usableWidth.current,
  });

  const xLabelsYCoord = usableHeight.current + gutterPadding + 1;

  resetStyling(ctx);
  ctx.textBaseline = 'top';
  xLabelObjectsArray.forEach((labelObject, index) => {
    drawXLinesAndLabels({
      ctx,
      labelObject,
      index,
      xLabelObjectsArray,
      xLabelsYCoord,
      usableHeight,
    });
  });
};

export default labelXAxis;
