import { coolGrey } from '@/styles/constants/colors';
import getCoordForValue from '../utils/getCoordForValue';
import { type DirectionalChartData } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

// * Draws a line across a chart at a given value
type Signature = (dataObj: {
  value: number;
  isStrongLine: boolean;
  directionalChartData: DirectionalChartData;
}) => number;

const drawLineAtValue: Signature = ({
  value,
  isStrongLine,
  directionalChartData,
}) => {
  const {
    chartData: { ctx },
    lineDirection,
  } = directionalChartData;

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
    ctx.strokeStyle = coolGrey;
  }
  ctx.stroke();

  return thisLineCoord;
};

export default drawLineAtValue;
