import { white } from '@/styles/constants/colors';
import type { CandleTextObject } from './getTextObjects';

// * Formats and adds the values for a candlestick chart to our values box
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  candleValues: CandleTextObject;
  lineHeight: number;
  weightedMiddle: number;
  textPad: number;
  originY: number;
  fontSize: number;
}) => void;

const addCandleValues: Signature = ({
  ctx,
  candleValues,
  lineHeight,
  weightedMiddle,
  textPad,
  originY,
  fontSize,
}) => {
  ctx.fillStyle = white;

  const keys = Object.keys(candleValues) as (keyof CandleTextObject)[];
  keys.forEach((key, index) => {
    const yCoord = lineHeight / 2 + (index + 2) * lineHeight;

    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${key}:`, weightedMiddle - textPad / 2, originY + yCoord);

    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'left';

    ctx.fillText(
      candleValues[key],
      weightedMiddle + textPad / 2,
      originY + yCoord
    );
  });
};

export default addCandleValues;
