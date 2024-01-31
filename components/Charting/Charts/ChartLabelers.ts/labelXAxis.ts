import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, white } from '@/styles/constants/colors';
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
    usableHeight.current + gutterPadding + 1 + getTextHeight(ctx) / 2;

  resetStyling(ctx);
  ctx.textBaseline = 'middle';
  xLabelObjectsArray.forEach((labelObject, index) => {
    ctx.beginPath();
    let { xCoord } = labelObject;
    const { isNewTimeStepType } = labelObject;
    if (index === 0 || isNewTimeStepType) {
      ctx.textAlign = 'left';
    } else if (xLabelObjectsArray[index + 1]?.isNewTimeStepType) {
      ctx.textAlign = 'right';
    } else {
      ctx.textAlign = 'center';
    }

    if (isNewTimeStepType) {
      ctx.strokeStyle = setAlpha(white, 0.5);
    } else {
      ctx.strokeStyle = setAlpha(coolGrey, 0.5);
    }

    if (index === 0) {
      xCoord = gutterPadding / 2;
    } else if (index === xLabelObjectsArray.length - 1) {
      ctx.moveTo(xCoord, usableHeight.current);
      ctx.lineTo(xCoord, 0);
    } else {
      ctx.moveTo(xCoord, usableHeight.current);
      ctx.lineTo(xCoord, 0);
    }

    ctx.fillText(labelObject.labelText, xCoord, xLabelsYCoord);
    ctx.stroke();
  });
};

export default labelXAxis;
