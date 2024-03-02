import makeNumberReadable from '@/utils/makeNumberReadable';
import getHorizontalStepSize from './getHorizontalStepSize';

// * Makes a list of the horizontal gridlines (ie, for the Y-axis) our chart will need. Starting and ending with the highest and lowest values in the data, and taking nicely sized, rounded steps in between.
// - The sizes of those steps are determined by getHorizontalStepSize() using an array of possible step sizes inside it.
type Signature = (
  chartBottom: number,
  chartTop: number,
  chartHeight: number
) => number[];

const makeHorizontalStepList: Signature = (
  chartBottom,
  chartTop,
  chartHeight
) => {
  // First we figure out how many steps there are
  const chartDataRange = chartTop - chartBottom;
  const stepSize = getHorizontalStepSize(chartDataRange, chartHeight);
  const stepCount = Math.ceil(chartDataRange / stepSize);

  // Then we figure out what the first step that comes after the minimum value in the chart is so it can be our first step
  const stepBeforeMin = Math.floor(chartBottom / stepSize) * stepSize;
  const firstStepAfterMin = stepBeforeMin + stepSize;

  const stepList = [Number(makeNumberReadable(chartBottom).replace(',', ''))];
  for (let i = 0; i < stepCount; i += 1) {
    const nextStepValue = firstStepAfterMin + stepSize * i;
    if (nextStepValue < chartTop) {
      stepList.push(Number(makeNumberReadable(nextStepValue).replace(',', '')));
    }
  }
  stepList.push(Number(makeNumberReadable(chartTop).replace(',', ''))); // We want the exact maximum value to be the final step, not just the last step we'd reach by stepping

  stepList.reverse(); // Because we start at the top of the chart, which is the highest value, we reverse our array so it starts with the highest value.

  return stepList;
};

export default makeHorizontalStepList;
