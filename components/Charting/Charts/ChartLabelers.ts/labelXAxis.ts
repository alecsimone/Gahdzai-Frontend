import type { MutableRefObject } from 'react';
import type { CandleSet, PercentageChangeSet } from '../types';
import getVerticalStepSize from './getVerticalStepSize';
import makeTimeLabelObjectsArray from './makeTimeLabelObjectsArray';
import { gutterPadding } from '../constants';
import getTextHeight from '../ChartStylers.ts/getTextHeight';

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
  const { time, timeStepType } = getVerticalStepSize(
    chartStart,
    chartEnd,
    chartWidth
  );

  let timesArray: number[] = [];
  if ('candles' in data) {
    timesArray = data.candles.map((candle) => candle.time);
  } else {
    timesArray = data[0]!.changes.map((change) => change.time);
  }

  const xLabelObjectsArray = makeTimeLabelObjectsArray({
    timesArray,
    time,
    timeStepType,
    usableWidth: usableWidth.current,
  });

  ctx.textBaseline = 'middle';
  const xLabelsYCoord =
    usableHeight.current + gutterPadding + 1 + getTextHeight(ctx, 'test') / 2;
  xLabelObjectsArray.forEach((labelObject) => {
    ctx.fillText(labelObject.labelText, labelObject.xCoord, xLabelsYCoord);
  });
};

export default labelXAxis;
