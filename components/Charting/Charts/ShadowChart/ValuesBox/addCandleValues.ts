import { white } from '@/styles/constants/colors';
import { miniText } from '@/styles/constants/fontSizes';
import type { CandleTextObject } from './getTextObjects';

// * Formats and adds the values for a candlestick chart to our values box
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  candleValues: CandleTextObject;
  lineHeight: number;
  weightedMiddle: number;
  textPad: number;
  originY: number;
}) => void;

const addCandleValues: Signature = ({
  ctx,
  candleValues,
  lineHeight,
  weightedMiddle,
  textPad,
  originY,
}) => {
  ctx.fillStyle = white;

  const keys = Object.keys(candleValues) as (keyof CandleTextObject)[];
  keys.forEach((key, index) => {
    const yCoord = lineHeight / 2 + (index + 2) * lineHeight;

    ctx.font = `${miniText} sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${key}:`, weightedMiddle - textPad / 2, originY + yCoord);

    ctx.font = `${miniText} sans-serif`;
    ctx.textAlign = 'left';

    ctx.fillText(
      candleValues[key],
      weightedMiddle + textPad / 2,
      originY + yCoord
    );
  });
};

export default addCandleValues;
