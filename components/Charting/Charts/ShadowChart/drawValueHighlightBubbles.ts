import getLineColor from '../ChartMakers/PercentageChange/getLineColor';
import type { CoordinatedDataPoint } from '../types';

// * Draws a little bubble on the chart at the datapoint that we're pulling out into our values box, the one corresponding to the current x position of the cursor
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  coordinatedDataPoints: CoordinatedDataPoint[];
}) => void;

const bubbleRadius = 6;

const drawValueHighlightBubbles: Signature = ({
  ctx,
  coordinatedDataPoints,
}) => {
  const drawCircle = (x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.arc(x, y, bubbleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  coordinatedDataPoints.forEach((point, index) => {
    const color = getLineColor({ symbol: point.symbol, lineIndex: index });
    const { x, y } = point;

    drawCircle(x, y!, color);
  });
};

export default drawValueHighlightBubbles;
