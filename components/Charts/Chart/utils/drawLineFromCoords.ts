import { blue } from '@/styles/constants/colors';
import { Coordinate } from '../types';

interface DrawLineInterface {
  coords: Coordinate[];
  ctx: CanvasRenderingContext2D;
  lineWidth?: number;
  color?: string;
}

const drawLineFromCoords = ({
  coords,
  ctx,
  lineWidth = 4,
  color = blue,
}: DrawLineInterface) => {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;

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
