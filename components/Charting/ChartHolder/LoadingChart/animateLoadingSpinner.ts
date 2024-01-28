import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { smallText } from '@/styles/constants/fontSizes';

const color = setAlpha(white, 0.9);
const radius = 40; // Radius of the spinner
const lineWidth = 7; // Line width of the spinner
const speed = 0.1; // Rotation speed (adjust as needed)

const text = 'Loading...';

const animateLoadingSpinner = (ctx: CanvasRenderingContext2D) => {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  let angle = 0;

  function drawFrame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the spinner
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 30, radius, angle, angle + 1.25 * Math.PI);
    ctx.stroke();

    angle += speed;

    ctx.fillStyle = color;
    ctx.font = `${smallText} sans-serif`;
    const textMeasurement = ctx.measureText(text);
    ctx.fillText(
      text,
      centerX - textMeasurement.width / 2 + 12,
      centerY + radius + 30
    );

    requestAnimationFrame(drawFrame);
  }

  drawFrame();
};

export default animateLoadingSpinner;
