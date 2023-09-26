import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { MouseCoords } from '../utils/getMousePosOverCanvas';

interface CrosshairsInterface {
  coords: MouseCoords;
  ctx: CanvasRenderingContext2D;
  size: {
    usableHeight: number;
    usableWidth: number;
  };
}

const dashDensity = 1; // Higher is less dense
const color = setAlpha(white, 0.5);

const drawCrosshairs = ({
  coords,
  ctx,
  size: { usableHeight, usableWidth },
}: CrosshairsInterface) => {
  ctx.clearRect(0, 0, usableWidth, usableHeight);
  if (!coords) return;
  ctx.strokeStyle = color;
  ctx.setLineDash([dashDensity]);

  const { x, y } = coords;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, usableHeight);

  ctx.moveTo(0, y);
  ctx.lineTo(usableWidth, y);

  ctx.stroke();
};

export default drawCrosshairs;
