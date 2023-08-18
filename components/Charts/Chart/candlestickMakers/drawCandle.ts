import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { CandleShape } from './types';

const drawCandle = (
  ctx: CanvasRenderingContext2D,
  candleShape: CandleShape
) => {
  const { color, width, candleTop, candleBottom, wickTop, wickBottom, x } =
    candleShape;

  const rectHeight = candleBottom - candleTop;

  ctx.fillStyle = color;
  ctx.fillRect(x, candleTop, width, rectHeight);

  ctx.strokeStyle = setAlpha(white, 0.5);
  ctx.beginPath();
  ctx.moveTo(x + width / 2, candleTop);
  ctx.lineTo(x + width / 2, wickTop);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + width / 2, candleBottom);
  ctx.lineTo(x + width / 2, wickBottom);
  ctx.stroke();
};

export default drawCandle;
