import getStepSize from './getStepSize';
import { DirectionalChartData } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

const makeStepList = (directionalChartData: DirectionalChartData) => {
  const { usablePixelSize, chartOrigin, chartTerminus } =
    getChartShapeFromChartData(directionalChartData);

  const { lineDirection } = directionalChartData;
  const max = lineDirection === 'horizontal' ? chartOrigin : chartTerminus;
  const min = lineDirection === 'horizontal' ? chartTerminus : chartOrigin;

  const chartDataRange = max - min;
  const stepSize = getStepSize(chartDataRange, usablePixelSize, lineDirection);
  const stepCount = Math.ceil(chartDataRange / stepSize);

  const stepBeforeMin = Math.floor(min / stepSize) * stepSize;
  const firstStepAfterMin = stepBeforeMin + stepSize;

  const roundedMin = Math.floor(min * 100) / 100;
  const stepList = [roundedMin];
  for (let i = 0; i < stepCount; i += 1) {
    const nextStepValue = firstStepAfterMin + stepSize * i;
    if (nextStepValue < max) {
      stepList.push(nextStepValue);
    }
  }
  stepList.push(max); // We want the exact maximum value to be the final step, not just the last step we'd reach by stepping

  if (lineDirection === 'horizontal') {
    // Because we start at the top of the chart, which is the highest value, we reverse our array so it starts with the highest value.
    stepList.reverse();
  }

  return stepList;
};

export default makeStepList;
