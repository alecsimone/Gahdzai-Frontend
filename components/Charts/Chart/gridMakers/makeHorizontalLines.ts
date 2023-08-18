import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import getStepCount from './getStepCount';
import getStepSize from './getStepSize';
import { gutterPadding } from './constants';
import getCoordForValue from '../utils/getCoordForValue';

const makeHorizontalLines = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  top: number,
  bottom: number
) => {
  // First we figure out the total data range the chart needs to cover
  const chartRange = top - bottom;

  // We then figure out how much space we need between each line. The stepCount is based on creating a minimum screen distance between lines, and then based on the range of the chart we map that onto a step size
  const maxSteps = getStepCount(usableHeight);
  const chartStep = getStepSize(chartRange, maxSteps, 'vertical');

  // Now we can figure out how many steps will actually fit in our chart by figuring out how many steps it takes to cover our range and then adding 1 for a bookend
  const steps = Math.ceil(chartRange / chartStep) + 1;

  // Then we can figure out the first step by rounding down to get the step below our starting point and then going up one step from there.
  const firstStep = Math.floor(bottom / chartStep) * chartStep + chartStep;

  // Now we can generate an array of the steps. We start our array with the lowest value on our chart rounded to two decimal places.
  const stepList = [Math.floor(bottom * 100) / 100];
  // Then we loop through our steps. In this loop though we want to skip the last step, as we don't need a line at the top of the chart, so we only loop up to steps - 1.
  for (let i = 0; i < steps - 1; i += 1) {
    // For each step, we want to get the value i steps away from the first step. We add that value to our stepList array.
    stepList.push(firstStep + chartStep * i);
  }
  // Then because want to start at the top of the chart, we reverse our array so it starts with the highest value.
  stepList.reverse();

  // Now we can begin drawing our lines.
  ctx.strokeStyle = setAlpha(coolGrey, 0.4);
  // We loop through our steps, again skipping the last step as we don't need a line at the top of the chart.
  for (let i = 0; i <= steps - 1; i += 1) {
    ctx.beginPath();

    // First we have to figure out the Y coordinate this line will run across. It will go from 0 to the vertical gutter on the X axis while its Y coordinate stays the same.
    const thisLineY = getCoordForValue(stepList[i], usableHeight, top, bottom);
    ctx.moveTo(0, thisLineY);

    // Then we can draw our line across the chart at that Y coordinate
    ctx.lineTo(usableWidth, thisLineY);
    if (i === steps - 1) {
      // For our last line, we want a sharper border, so we change the stroke style to remove the transparency.
      ctx.strokeStyle = coolGrey;
    }
    ctx.stroke();

    // Finally, we need to label this line on the grid
    ctx.font = `${smallText} sans-serif`;
    ctx.fillStyle = white;
    ctx.textBaseline = 'middle';
    ctx.fillText(`${stepList[i]}`, usableWidth + gutterPadding, thisLineY);
  }

  // To finish, we just need to add a label to the top of the chart
  ctx.textBaseline = 'top';
  ctx.fillText(`${top}`, usableWidth + gutterPadding, gutterPadding / 2);
};
export default makeHorizontalLines;
