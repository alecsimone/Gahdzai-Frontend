import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import getStepCount from './getStepCount';
import getStepSize from './getStepSize';
import { gutterPadding } from './constants';
import getCoordForValue from '../utils/getCoordForValue';

const getTimeString = (time: number) => {
  const thisDate = new Date(time * 1000);
  const thisHour = thisDate.getHours();
  const thisMinute = `${
    thisDate.getMinutes() < 10 ? '0' : ''
  }${thisDate.getMinutes()}`;
  return `${thisHour}:${thisMinute}`;
};

const makeVerticalLines = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  start: number,
  end: number
) => {
  // First we figure out the total data range the chart needs to cover
  const chartRange = end - start;

  // We then figure out how much space we need between each line. The stepCount is based on creating a minimum screen distance between lines, and then based on the range of the chart we map that onto a step size
  const maxSteps = getStepCount(usableWidth);
  const chartStep = getStepSize(chartRange, maxSteps, 'horizontal');

  // Now we can figure out how many steps will actually fit in our chart by figuring out how many steps it takes to cover our range
  const steps = Math.ceil(chartRange / chartStep);

  // Then we can figure out the first step by rounding down to get the step below our starting point and then going up one step from there.
  const firstStep = Math.floor(start / chartStep) * chartStep + chartStep;

  // Now we can generate an array of the steps. We start our array with the starting time of our data
  const stepList = [start];
  for (let i = 0; i < steps - 1; i += 1) {
    // For each step, we want to get the value i steps away from the first step. We add that value to our stepList array.
    stepList.push(firstStep + chartStep * i);
  }
  stepList.push(end);

  // Now we can begin drawing our lines.
  ctx.strokeStyle = setAlpha(coolGrey, 0.2);
  for (let i = 0; i <= steps; i += 1) {
    ctx.beginPath();

    // First we have to figure out the X coordinate this line will run across. It will go from 0 to the horizontal gutter on the Y axis while its X coordinate stays the same.
    const thisLineX = getCoordForValue(stepList[i], usableWidth, start, end);
    ctx.moveTo(thisLineX, 0);

    // Then we can draw our line across the chart at that X coordinate
    ctx.lineTo(thisLineX, usableHeight);
    if (i === steps) {
      // For our last line, we want a sharper border, so we change the stroke style to remove the transparency.
      ctx.strokeStyle = coolGrey;
    }
    ctx.stroke();

    // Finally, we need to label this line on the grid
    const timeString = getTimeString(stepList[i]);
    ctx.font = `${smallText} sans-serif`;
    ctx.fillStyle = white;
    ctx.textAlign = i === 0 ? 'start' : 'center';
    ctx.fillText(
      `${timeString}`,
      i === 0 ? gutterPadding : thisLineX,
      usableHeight + gutterPadding
    );
  }
};
export default makeVerticalLines;
