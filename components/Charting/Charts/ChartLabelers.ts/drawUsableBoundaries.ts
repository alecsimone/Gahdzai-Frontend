import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import resetStyling from '../ChartStylers.ts/resetStyling';
import { usableBoundaryStrokeWidth } from '../constants';

// * Draws the bottom and right most grid lines around our chart
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  usableWidth: number;
  usableHeight: number;
}) => void;

const drawUsableBoundaries: Signature = ({
  ctx,
  usableWidth,
  usableHeight,
}) => {
  console.log({ usableWidth, usableHeight });
  resetStyling(ctx);

  ctx.strokeStyle = `${setAlpha(white, 0.6)}`;
  ctx.lineWidth = usableBoundaryStrokeWidth;

  ctx.beginPath();
  ctx.moveTo(0, usableHeight);
  ctx.lineTo(usableWidth, usableHeight);
  ctx.stroke();

  ctx.moveTo(usableWidth, 0);
  ctx.lineTo(usableWidth, usableHeight);
  ctx.stroke();
};

export default drawUsableBoundaries;
