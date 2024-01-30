import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import type { CandleSet, PercentageChangeSet } from '../types';
import getVerticalStepSize from './getVerticalStepSize';
import makeTimeLabelObjectsArray from './makeTimeLabelObjectsArray';
import { gutterPadding } from '../constants';
import getTextHeight from '../ChartStylers.ts/getTextHeight';
import resetStyling from '../ChartStylers.ts/resetStyling';

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

  const xLabelsYCoord =
    usableHeight.current + gutterPadding + 1 + getTextHeight(ctx, 'test') / 2;

  resetStyling(ctx);
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = setAlpha(coolGrey, 0.5);
  ctx.beginPath();
  xLabelObjectsArray.forEach((labelObject, index) => {
    if (index === 0) {
      ctx.textAlign = 'left';
    } else if (index === xLabelObjectsArray.length - 1) {
      ctx.textAlign = 'center';
      ctx.moveTo(labelObject.xCoord, usableHeight.current);
      ctx.lineTo(labelObject.xCoord, 0);
    } else {
      ctx.textAlign = 'center';
      console.log(
        `Drawing line for label ${labelObject.labelText} at ${labelObject.xCoord}`
      );
      ctx.moveTo(labelObject.xCoord, usableHeight.current);
      ctx.lineTo(labelObject.xCoord, 0);
    }
    ctx.fillText(labelObject.labelText, labelObject.xCoord, xLabelsYCoord);
  });
  ctx.stroke();
};

export default labelXAxis;
