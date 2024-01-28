import getMaxSteps from './getMaxSteps';

// * Figures out how many horizontal steps we can fit in a chart given its usableSize
type Signature = (chartRange: number, chartSize: number) => number;

const sizesArray = [
  0.1, 0.25, 0.5, 1, 2.5, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000,
];

const getHorizontalStepSize: Signature = (chartRange, chartSize) => {
  const maxSteps = getMaxSteps(chartSize);
  // First we figure out the exact value that one step should represent based on the range of the chart's data and the number of steps it's allowed to have
  const exactStepSize = chartRange / maxSteps;

  // Then we need to figure out which step size from that array is right for our chart. We'll start with the lowest step as our base case
  let stepSize = sizesArray[0]!;
  // Then we loop through the sizes array until we get to a step size that is just larger than the exact step size (ie, the first entry in the array that is bigger than our exactStepSize), and we use that as our step size
  sizesArray.forEach((size, index) => {
    if (
      index >= 1 &&
      size > exactStepSize &&
      sizesArray[index - 1]! <= exactStepSize // Won't be null because we're just looping over the array, and we know the array doesn't have any undefined values in it
    ) {
      stepSize = size;
    }
  });
  return stepSize;
};

export default getHorizontalStepSize;
