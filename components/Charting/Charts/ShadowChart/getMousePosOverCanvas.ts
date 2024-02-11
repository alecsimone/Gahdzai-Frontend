import type { Coordinate } from '../types';

// * Finds the position of the mouse relative to the canvas and returns it as a MouseCoords object. If the mouse is not over the canvas, we return false
type Signature = (
  canvas: HTMLCanvasElement | null,
  event: MouseEvent
) => MouseCoords;

export type MouseCoords = Coordinate | false;

const getMousePosOverCanvas: Signature = (canvas, event) => {
  if (canvas == null) return false;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
    return { x, y };
  }
  return false;
};

export default getMousePosOverCanvas;
