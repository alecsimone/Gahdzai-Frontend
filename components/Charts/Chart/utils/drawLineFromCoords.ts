import { blue } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { Coordinate } from '../types';

const drawLineFromCoords = (
  coords: Coordinate[],
  ctx: CanvasRenderingContext2D,
  color: string = blue
) => {
  ctx.lineWidth = 4;
  ctx.strokeStyle = setAlpha(color, 0.8);

  // Begin path
  ctx.moveTo(coords[0].x, coords[0].y);
  ctx.beginPath();
  // Loop over the rest of the coordinates with lineTo
  coords.forEach((coord) => {
    ctx.lineTo(coord.x, coord.y);
  });
  // Stroke
  ctx.stroke();
};

export default drawLineFromCoords;
