// * Draws a rounded rectangle on a canvas
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  rectangle: {
    x: number;
    y: number;
    width: number;
    height: number;
    roundingRadius: number;
  };
  style?: {
    fillColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
  };
}) => void;

const drawRoundedRect: Signature = ({
  ctx,
  rectangle: { x, y, width, height, roundingRadius },
  style,
}) => {
  ctx.beginPath();
  ctx.moveTo(x + roundingRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, roundingRadius);
  ctx.arcTo(x + width, y + height, x, y + height, roundingRadius);
  ctx.arcTo(x, y + height, x, y, roundingRadius);
  ctx.arcTo(x, y, x + width, y, roundingRadius);
  ctx.closePath();

  if (style) {
    const { fillColor, strokeColor, strokeWidth } = style;
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor && strokeWidth) {
      ctx.setLineDash([]);
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    }
  }
};

export default drawRoundedRect;
