import getStepSize from './getStepSize';

const makeStepList = (
  max: number,
  min: number,
  usableSize: number,
  direction: 'horizontal' | 'vertical'
) => {
  const chartRange = max - min;
  const stepSize = getStepSize(chartRange, usableSize, direction);
  const stepCount = Math.ceil(chartRange / stepSize);

  // We can figure out the first step by rounding down to get the step below our starting point and then going up one step from there.
  const firstStep = Math.floor(min / stepSize) * stepSize + stepSize;

  const stepList = [Math.floor(min * 100) / 100]; // We have to round our starting value when we put it in as well
  for (let i = 0; i < stepCount - 1; i += 1) {
    stepList.push(firstStep + stepSize * i);
  }
  stepList.push(max); // We want the exact maximum value to be the final step, not just the last step we'd reach by stepping

  if (direction === 'vertical') {
    // Because want start at the top of the chart, which is the highest value, we reverse our array so it starts with the highest value.
    stepList.reverse();
  }

  return stepList;
};

export default makeStepList;
