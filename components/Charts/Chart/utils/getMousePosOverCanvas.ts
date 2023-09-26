export type MouseCoords =
  | {
      x: number;
      y: number;
    }
  | false;

const getMousePosOverCanvas = (
  canvas: HTMLCanvasElement | null,
  event: MouseEvent
): MouseCoords => {
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
