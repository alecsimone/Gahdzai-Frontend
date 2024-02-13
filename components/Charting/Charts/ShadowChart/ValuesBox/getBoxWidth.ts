import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import getWidestLabelWidth from '../../ChartLabelers.ts/getWidestLabelWidth';
import type { CandleTextObject, ValuesTextObject } from './getTextObjects';
import { valuesBoxCenterPad, valuesBoxSidePad } from '../../constants';

// * Figures out how wide our values box needs to be based on the widest values within it
type Signature = (dataObj: {
  valuesTextObject: ValuesTextObject;
  ctx: CanvasRenderingContext2D;
  textPad: number;
  originX: number;
}) => {
  rectWidth: number;
  weightedMiddle: number;
};

const getBoxWidth: Signature = ({
  valuesTextObject,
  ctx,
  textPad,
  originX,
}) => {
  let widestLabelWidth: number;
  let widestValueWidth: number;
  if (valuesTextObject.type === 'Comparison') {
    // We get the widest symbol's width and the widest value's width
    widestLabelWidth = getWidestLabelWidth(
      ctx,
      valuesTextObject.textObjects.map((obj) => obj.symbol)
    );
    widestValueWidth = getWidestLabelWidth(
      ctx,
      valuesTextObject.textObjects.map((obj) => obj.value)
    );
  } else {
    const candleValues = valuesTextObject.textObjects;
    const keys = Object.keys(candleValues) as (keyof CandleTextObject)[];
    const capitalizedKeys = keys.map((key) => capitalizeFirstLetter(key));

    widestLabelWidth = getWidestLabelWidth(ctx, capitalizedKeys);

    const values = keys.map((key) => candleValues[key]);
    widestValueWidth = getWidestLabelWidth(ctx, values);
  }

  // Then we add those together along with our padding
  const rawRectWidth =
    widestLabelWidth +
    widestValueWidth +
    (valuesBoxSidePad * 2 + valuesBoxCenterPad) * textPad;
  const rectWidth = Math.ceil(rawRectWidth / 25) * 25;

  // Visually, the center line we want to align our text with is not necessarily the center of the box, because the symbols and the values might be different sizes. So we want to use the end of the natural position of the symbol as our center line
  const weightedMiddle =
    originX +
    widestLabelWidth +
    textPad * (valuesBoxSidePad + valuesBoxCenterPad / 2);

  return { rectWidth, weightedMiddle };
};

export default getBoxWidth;
