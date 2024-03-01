import getOneRem from '@/styles/functions/getOneRem';
import { coolGrey, lightBlack } from '@/styles/constants/colors';
import drawRoundedRect from '@/utils/canvas/drawRoundedRect';
import getTextHeight from '../../ChartStylers.ts/getTextHeight';
import type { CoordinatedDataPoint } from '../../types';
import resetStyling from '../../ChartStylers.ts/resetStyling';
import getTextObjects from './getTextObjects';
import getBoxWidth from './getBoxWidth';
import addTimeAndDateStrings from './addTimeAndDateStrings';
import addComparisonValues from './addComparisonValues';
import addCandleValues from './addCandleValues';
import { scaleFactor } from '../../constants';

// * Given a set of CoordinatedDataPoints (presumably ones that correspond to the current cursor's position), make a little box presenting them all in a nice looking way
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  coordinatedDataPoints: CoordinatedDataPoint[];
  origin?: {
    x: number;
    y: number;
  };
  mouseX: number;
  usableWidth: number;
}) => void;

const makeValuesBox: Signature = ({
  ctx,
  coordinatedDataPoints,
  origin = { x: 5, y: 8 },
  mouseX,
  usableWidth,
}) => {
  // First some basic styling. We use textBaseline middle because we want to make sure everything on each line is center aligned
  resetStyling(ctx);
  ctx.textAlign = 'left';

  // And some basic calculations about our text. First we need to figure out how high a line of text is, making sure we've set our font to bold so it will be the bigger size
  const fontSize = getOneRem() * 1.7 * scaleFactor;
  ctx.font = `bold ${fontSize} sans-serif`;
  const textHeight = getTextHeight(ctx);
  const lineHeight = textHeight;

  // And then we want to get our basic padding unit, which will be 0.5rem
  const textPad = getOneRem() / 2;

  // Now we make a list of all the text we're going to display for the dataPoints so we can figure out how big the rectangle needs to be
  const valuesTextObject = getTextObjects(coordinatedDataPoints);

  const { rectWidth, weightedMiddle } = getBoxWidth({
    valuesTextObject,
    ctx,
    textPad,
    originX: origin.x,
  });

  let computedOriginX: number = origin.x;
  let computedWeightedMiddle: number = weightedMiddle;
  if (origin.x + rectWidth > mouseX) {
    computedOriginX = usableWidth - rectWidth - 2 * origin.x;
    computedWeightedMiddle = computedOriginX + weightedMiddle;
  }

  // We want the box to be 1 textPad taller than it needs to be, and then we want to offset it by -1/2 text pads so the box will have some vertical padding inside it
  let rectHeight: number;
  if (valuesTextObject.type === 'Comparison') {
    rectHeight = (coordinatedDataPoints.length + 2) * lineHeight + textPad; // The +2 is for the time and date strings
  } else {
    rectHeight = 6 * lineHeight + textPad; // 6 is the 4 values of a candle plus the two lines of timeStrings
  }
  const rectStart = origin.y - textPad / 2;

  // Then we draw the box we're going to put all this on top of
  drawRoundedRect({
    ctx,
    rectangle: {
      x: computedOriginX,
      y: rectStart,
      width: rectWidth,
      height: rectHeight,
      roundingRadius: 4,
    },
    style: {
      fillColor: lightBlack,
      strokeWidth: 1,
      strokeColor: coolGrey,
    },
  });

  // Now we can make our time and date strings. All these datapoints should have the same time (because that's how they were found in the first place, all the datapoints with a given time), so we can just use the first one.
  addTimeAndDateStrings({
    time: coordinatedDataPoints[0]!.data.time,
    ctx,
    weightedMiddle: computedWeightedMiddle,
    lineHeight,
    originY: origin.y,
    fontSize,
  });

  // And now we can add our values
  if (valuesTextObject.type === 'Comparison') {
    addComparisonValues({
      ctx,
      textObjects: valuesTextObject.textObjects,
      lineHeight,
      weightedMiddle: computedWeightedMiddle,
      textPad,
      originY: origin.y,
      fontSize,
    });
  } else {
    addCandleValues({
      ctx,
      candleValues: valuesTextObject.textObjects,
      lineHeight,
      weightedMiddle: computedWeightedMiddle,
      textPad,
      originY: origin.y,
      fontSize,
    });
  }
};

export default makeValuesBox;
