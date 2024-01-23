import makeNumberReadable from '@/utils/makeNumberReadable';
import getHorizontalStepSize from './getHorizontalStepSize';
import type { DirectionalChartData } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

// * Makes a list of the horizontal gridlines (ie, for the Y-axis) our chart will need. Starting and ending with the highest and lowest values in the data, and taking nicely sized, rounded steps in between.
// - The sizes of those steps are determined by getHorizontalStepSize() using an array of possible step sizes inside it.
type Signature = (directionalChartData: DirectionalChartData) => number[];

const makeHorizontalStepList: Signature = (directionalChartData) => {
  const {
    usablePixelSize,
    chartOrigin: max,
    chartTerminus: min,
  } = getChartShapeFromChartData(directionalChartData);

  // First we figure out how many steps there are
  const chartDataRange = max - min;
  const stepSize = getHorizontalStepSize(chartDataRange, usablePixelSize);
  const stepCount = Math.ceil(chartDataRange / stepSize);

  // Then we figure out what the first step that comes after the minimum value in the chart is so it can be our first step
  const stepBeforeMin = Math.floor(min / stepSize) * stepSize;
  const firstStepAfterMin = stepBeforeMin + stepSize;

  const stepList = [Number(makeNumberReadable({ number: min }))];
  for (let i = 0; i < stepCount; i += 1) {
    const nextStepValue = firstStepAfterMin + stepSize * i;
    if (nextStepValue < max) {
      stepList.push(Number(makeNumberReadable({ number: nextStepValue })));
    }
  }
  stepList.push(Number(makeNumberReadable({ number: max }))); // We want the exact maximum value to be the final step, not just the last step we'd reach by stepping

  stepList.reverse(); // Because we start at the top of the chart, which is the highest value, we reverse our array so it starts with the highest value.

  return stepList;
};

export default makeHorizontalStepList;
