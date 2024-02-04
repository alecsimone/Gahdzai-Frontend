import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import type { CandleShape } from '../../types';

// * Takes in a canvas context and a CandleShape and draws the candle on the canvas
type Signature = (
  ctx: CanvasRenderingContext2D,
  candleShape: CandleShape
) => void;

const drawWick = ({
  ctx,
  wickX,
  wickStart,
  wickEnd,
}: {
  ctx: CanvasRenderingContext2D;
  wickX: number;
  wickStart: number;
  wickEnd: number;
}) => {
  ctx.beginPath();
  ctx.moveTo(wickX, wickStart);
  ctx.lineTo(wickX, wickEnd);
  ctx.stroke();
};

const drawCandle: Signature = (
  ctx,
  { color, candleStartX, width, candleTop, candleBottom, wickTop, wickBottom }
) => {
  ctx.fillStyle = color;

  const rectHeight = candleBottom - candleTop;
  ctx.fillRect(candleStartX, candleTop, width, rectHeight);

  ctx.strokeStyle = setAlpha(white, 0.5);
  const wickX = candleStartX + width / 2;
  drawWick({
    ctx,
    wickX,
    wickStart: candleTop,
    wickEnd: wickTop,
  });
  drawWick({
    ctx,
    wickX,
    wickStart: candleBottom,
    wickEnd: wickBottom,
  });
};

export default drawCandle;
