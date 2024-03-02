import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, white } from '@/styles/constants/colors';
import type { XLabelObject } from './makeTimeLabelObjectsArray';
import { gutterPadding } from '../constants';

// * Does the actual drawing of the x-axis (vertical) gridlines and their labels on our canvas
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  labelObject: XLabelObject;
  index: number;
  xLabelObjectsArray: XLabelObject[];
  xLabelsYCoord: number;
  usableHeight: MutableRefObject<number>;
}) => void;

const drawXLinesAndLabels: Signature = ({
  ctx,
  labelObject,
  index,
  xLabelObjectsArray,
  xLabelsYCoord,
  usableHeight,
}) => {
  ctx.beginPath();
  let { xCoord } = labelObject;
  const { isNewTimeStepType } = labelObject;

  // For the first line, or for any line that represents a new timeStepType (ie, a new day on a weekly chart that was incrementing by hours before), we want to left align the label
  if (index === 0 || isNewTimeStepType) {
    ctx.textAlign = 'left';
  } else if (xLabelObjectsArray[index + 1]?.isNewTimeStepType) {
    // If the next datapoint is going to be a new timeStepType, we want to right-align the label
    ctx.textAlign = 'right';
  } else {
    // Otherwise we want the label centered
    ctx.textAlign = 'center';
  }

  // New timeStepTypes get a stronger white line, otherwise we use a coolGrey line
  if (isNewTimeStepType) {
    ctx.strokeStyle = setAlpha(white, 0.5);
  } else {
    ctx.strokeStyle = setAlpha(coolGrey, 0.5);
  }

  if (index === 0) {
    xCoord = gutterPadding / 2;
  } else {
    ctx.moveTo(xCoord, usableHeight.current);
    ctx.lineTo(xCoord, 0);
  }

  ctx.fillStyle = `${setAlpha(white, 0.6)}`;
  ctx.textBaseline = 'top';
  ctx.fillText(labelObject.labelText, xCoord, xLabelsYCoord);
  ctx.stroke();
};

export default drawXLinesAndLabels;
