import { coolGrey } from '@/styles/constants/colors';
import getCoordForValue from '../utils/getCoordForValue';

interface DrawLineAtValueInterface {
  ctx: CanvasRenderingContext2D;
  value: number;
  isStrongLine: boolean;
  usablePixelSize: number;
  chartOrigin: number;
  chartTerminus: number;
  lineTerminus: number;
  lineDirection: 'horizontal' | 'vertical';
}

const drawLineAtValue = (dataObj: DrawLineAtValueInterface) => {
  const {
    ctx,
    value,
    isStrongLine,
    usablePixelSize,
    chartOrigin,
    chartTerminus,
    lineTerminus,
    lineDirection,
  } = dataObj;

  ctx.beginPath();

  const thisLineCoord = getCoordForValue(
    value,
    usablePixelSize,
    chartOrigin,
    chartTerminus
  );

  if (lineDirection === 'horizontal') {
    ctx.moveTo(0, thisLineCoord);
    ctx.lineTo(lineTerminus, thisLineCoord);
  } else if (lineDirection === 'vertical') {
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
