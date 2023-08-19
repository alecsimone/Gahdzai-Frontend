import { coolGrey } from '@/styles/constants/colors';
import getCoordForValue from '../utils/getCoordForValue';

const drawLineAtValue = (
  ctx: CanvasRenderingContext2D,
  value: number,
  isStrongLine: boolean,
  usableSize: number,
  chartOrigin: number,
  chartTerminus: number,
  lineTerminus: number,
  direction: 'horizontal' | 'vertical'
) => {
  ctx.beginPath();

  const thisLineCoord = getCoordForValue(
    value,
    usableSize,
    chartOrigin,
    chartTerminus
  );

  if (direction === 'horizontal') {
    ctx.moveTo(0, thisLineCoord);
    ctx.lineTo(lineTerminus, thisLineCoord);
  } else if (direction === 'vertical') {
    ctx.moveTo(thisLineCoord, 0);
    ctx.lineTo(thisLineCoord, lineTerminus);
  }

  if (isStrongLine) {
    // For our last line, we want a sharper border, so we change the stroke style to remove the transparency.
    ctx.strokeStyle = coolGrey;
  }
  ctx.stroke();

  return thisLineCoord;
};

export default drawLineAtValue;
