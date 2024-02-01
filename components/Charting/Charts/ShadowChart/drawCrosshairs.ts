import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import type { MouseCoords } from './getMousePosOverCanvas';
import type { UsableBoundaries } from '../types';

interface CrosshairsInterface {
  coords: MouseCoords;
  ctx: CanvasRenderingContext2D;
  usableBoundaries: UsableBoundaries;
}

const dashDensity = 1; // Higher is less dense
const color = setAlpha(white, 0.5);

const drawCrosshairs = ({
  coords,
  ctx,
  usableBoundaries: { usableHeight, usableWidth },
}: CrosshairsInterface) => {
  ctx.clearRect(0, 0, usableWidth.current, usableHeight.current);
  if (!coords) return;

  const { x, y } = coords;
  if (x >= usableWidth.current) return;
  if (y >= usableHeight.current) return;
  ctx.strokeStyle = color;
  ctx.setLineDash([dashDensity]);

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, usableHeight.current);

  ctx.moveTo(0, y);
  ctx.lineTo(usableWidth.current, y);

  ctx.stroke();
};

export default drawCrosshairs;
