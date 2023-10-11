import { coolGrey } from '@/styles/constants/colors';
import getCoordForValue from '../utils/getCoordForValue';
import { DirectionalChartData } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

interface DrawLineAtValueInterface {
  value: number;
  isStrongLine: boolean;
  directionalChartData: DirectionalChartData;
}

const drawLineAtValue = (dataObj: DrawLineAtValueInterface) => {
  const { value, isStrongLine, directionalChartData } = dataObj;

  const { chartData, lineDirection } = directionalChartData;
  const { ctx } = chartData;

  const { usablePixelSize, lineTerminus, chartOrigin, chartTerminus } =
    getChartShapeFromChartData(directionalChartData);

  ctx.lineWidth = 1;
  ctx.beginPath();

  let thisLineCoord: number;
  if (lineDirection === 'horizontal') {
    thisLineCoord = getCoordForValue(
      value,
      usablePixelSize,
      chartOrigin,
      chartTerminus
    );
  } else {
    thisLineCoord = value;
  }

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
