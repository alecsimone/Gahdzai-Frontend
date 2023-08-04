import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const minute = 60;
const hour = minute * 60;
const day = hour * 24;

const makeVerticalLines = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  start: number,
  end: number
) => {
  const chartSize = end - start;
  let chartStep: number;
  if (chartSize < minute * 8) {
    chartStep = minute;
  } else if (chartSize < minute * 8 * 2) {
    chartStep = minute * 2;
  } else if (chartSize < minute * 8 * 3) {
    chartStep = minute * 3;
  } else if (chartSize < minute * 8 * 5) {
    chartStep = minute * 5;
  } else if (chartSize < minute * 8 * 10) {
    chartStep = minute * 10;
  } else if (chartSize < minute * 8 * 30) {
    chartStep = minute * 30;
  } else if (chartSize < hour * 8) {
    chartStep = hour;
  } else if (chartSize < hour * 8 * 2) {
    chartStep = hour * 2;
  } else if (chartSize < hour * 8 * 3) {
    chartStep = hour * 3;
  } else if (chartSize < hour * 8 * 4) {
    chartStep = hour * 4;
  } else {
    chartStep = day;
  }

  const steps = Math.ceil(chartSize / chartStep) + 1;
  const floor = Math.floor(start / chartStep) * chartStep;

  console.log({ chartSize, chartStep, steps });

  const stepList = [];
  for (let i = 0; i < steps; i += 1) {
    stepList.push(floor + chartStep * i);
  }
  console.log(stepList);

  ctx.strokeStyle = setAlpha(coolGrey, 0.4);
  for (let i = 0; i <= steps; i += 1) {
    const thisLineX = ((width - 100) * i) / steps;
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(thisLineX, 0);
      ctx.lineTo(thisLineX, height - 100);
      ctx.stroke();
    }

    if (i < steps) {
      const thisDate = new Date(stepList[i] * 1000);
      const thisHour = thisDate.getHours();
      ctx.font = `${smallText} sans-serif`;
      ctx.fillStyle = white;
      ctx.textAlign = i === 0 ? 'start' : 'center';
      ctx.fillText(`${thisHour}:00`, thisLineX, height - 80);
    }
  }
};
export default makeVerticalLines;
