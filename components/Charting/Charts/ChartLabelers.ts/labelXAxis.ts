import type { MutableRefObject } from 'react';
import type { CandleSet, PercentageChangeSet } from '../types';
import getTimeStepSize from './getTimeStepSize';
import makeTimeLabelObjectsArray from './makeTimeLabelObjectsArray';
import { gutterPadding } from '../constants';
import getTextHeight from '../ChartStylers.ts/getTextHeight';
import resetStyling from '../ChartStylers.ts/resetStyling';
import makeTimesArray from './makeTimesArray';
import drawXLinesAndLabels from './drawXLinesAndLabels';

// * Draws the labels on the X axis of our chart
type Signature = (dataObj: {
  chartStart: number;
  chartEnd: number;
  chartWidth: number;
  data: CandleSet | PercentageChangeSet[];
  usableWidth: MutableRefObject<number>;
  usableHeight: MutableRefObject<number>;
  ctx: CanvasRenderingContext2D;
}) => void;

const labelXAxis: Signature = ({
  chartStart,
  chartEnd,
  chartWidth,
  data,
  usableWidth,
  usableHeight,
  ctx,
}) => {
  const { timeStepSize, timeStepType } = getTimeStepSize(
    chartStart,
    chartEnd,
    chartWidth
  );

  const timesArray = makeTimesArray(data);

  const xLabelObjectsArray = makeTimeLabelObjectsArray({
    timesArray,
    timeStepSize,
    timeStepType,
    usableWidth: usableWidth.current,
  });

  const xLabelsYCoord =
    usableHeight.current + gutterPadding + 1 + getTextHeight(ctx) / 2;

  resetStyling(ctx);
  ctx.textBaseline = 'middle';
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
