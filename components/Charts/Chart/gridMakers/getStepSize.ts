import getMaxSteps from './getMaxSteps';

const minute = 60;
const hour = minute * 60;
const day = hour * 24;

const sizesArray = {
  vertical: [
    0.1, 0.25, 0.5, 1, 2.5, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000,
    10000,
  ],
  horizontal: [
    minute,
    minute * 2,
    minute * 3,
    minute * 5,
    minute * 10,
    minute * 30,
    hour,
    hour * 2,
    hour * 3,
    hour * 4,
    day,
    day * 2,
    day * 3,
    day * 5,
    day * 7,
    day * 30,
  ],
};

const getStepSize = (
  chartRange: number,
  usableSize: number,
  direction: 'vertical' | 'horizontal'
) => {
  const maxSteps = getMaxSteps(usableSize);
  // First we figure out the exact value that one step should represent based on the range of the chart's data and the number of steps it's allowed to have
  const exactStepSize = chartRange / maxSteps;

  // Then we figure out which step sizes array we're working with, either for the vertical or horizontal axis
  const relevantSizesArray = sizesArray[direction];

  // Then we need to figure out which step size from that array is right for our chart. We'll start with the lowest step as our base case
  let stepSize = relevantSizesArray[0];
  // Then we loop through the sizes array until we get to a step size that is just larger than the exact step size (ie, the first entry in the array that is bigger than our exactStepSize), and we use that as our step size
  relevantSizesArray.forEach((size, index) => {
    if (
      index >= 1 &&
      size > exactStepSize &&
      relevantSizesArray[index - 1] <= exactStepSize
    ) {
      stepSize = size;
    }
  });
  return stepSize;
};

export default getStepSize;
