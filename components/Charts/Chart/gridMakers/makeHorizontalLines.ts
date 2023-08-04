import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const makeHorizontalLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  top: number,
  bottom: number
) => {
  const chartSize = top - bottom;
  let chartStep: number;
  if (chartSize < 1) {
    chartStep = 0.1;
  } else if (chartSize < 2) {
    chartStep = 0.25;
  } else if (chartSize < 4) {
    chartStep = 0.5;
  } else if (chartSize < 8) {
    chartStep = 1;
  } else if (chartSize < 16) {
    chartStep = 2;
  } else if (chartSize < 40) {
    chartStep = 5;
  } else {
    chartStep = 10;
  }
  const steps = Math.ceil(chartSize / chartStep) + 1;
  const floor = Math.floor(bottom / chartStep) * chartStep;
  // const ceiling = Math.ceil(top / chartStep) * chartStep;

  // Generate an array of the steps
  const stepList = [];
  for (let i = 0; i < steps; i += 1) {
    stepList.push(floor + chartStep * i);
  }
  stepList.reverse();

  ctx.strokeStyle = setAlpha(coolGrey, 0.8);
  for (let i = 1; i <= steps; i += 1) {
    ctx.beginPath();
    const thisLineY = ((height - 100) * i) / steps;
    ctx.moveTo(0, thisLineY);
    ctx.lineTo(width - 100, thisLineY);
    ctx.stroke();

    ctx.font = `${smallText} sans-serif`;
    ctx.fillStyle = white;
    ctx.textBaseline = 'middle';
    ctx.fillText(`${stepList[i - 1]}`, width - 80, thisLineY);
  }
};
export default makeHorizontalLines;
