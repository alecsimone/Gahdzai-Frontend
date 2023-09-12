import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { CandleShape } from '../types';

interface DrawWickInterface {
  ctx: CanvasRenderingContext2D;
  wickX: number;
  wickStart: number;
  wickEnd: number;
}

const drawWick = (drawWickInterface: DrawWickInterface) => {
  const { ctx, wickX, wickStart, wickEnd } = drawWickInterface;

  ctx.beginPath();
  ctx.moveTo(wickX, wickStart);
  ctx.lineTo(wickX, wickEnd);
  ctx.stroke();
};

const drawCandle = (
  ctx: CanvasRenderingContext2D,
  candleShape: CandleShape
) => {
  const {
    color,
    candleStartX,
    width,
    candleTop,
    candleBottom,
    wickTop,
    wickBottom,
  } = candleShape;

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
