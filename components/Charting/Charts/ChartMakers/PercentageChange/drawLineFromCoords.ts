import type { Coordinate } from '../../types';
import { defaultLineColor, defaultLineWidth } from '../../constants';

// * Takes in an array of Coordinates and a canvas context, along with two optional styling parameters, and draws a line on the canvas corresponding to the coordinates
type Signature = (dataObj: {
  coords: Coordinate[];
  ctx: CanvasRenderingContext2D;
  lineWidth?: number;
  color?: string;
}) => void;

const drawLineFromCoords: Signature = ({
  coords,
  ctx,
  lineWidth = defaultLineWidth,
  color = defaultLineColor,
}) => {
  if (coords.length === 0) return;

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;

  // Begin path
  ctx.moveTo(coords[0]!.x, coords[0]!.y);
  ctx.beginPath();

  // Loop over the rest of the coordinates with lineTo
  coords.forEach((coord) => {
    ctx.lineTo(coord.x, coord.y);
  });

  // Stroke
  ctx.stroke();
};

export default drawLineFromCoords;
