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
  ctx.moveTo(0, usableHeight);
  ctx.lineTo(usableWidth, usableHeight);
  ctx.stroke();

  ctx.moveTo(usableWidth, 0);
  ctx.lineTo(usableWidth, usableHeight);
  ctx.stroke();
};

export default drawUsableBoundaries;
