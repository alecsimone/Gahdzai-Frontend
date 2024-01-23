// * Figures out how many steps we can cram into a chart based on the size of the chart and our smallest allowed step size

const minStepSize = 80;
const maxStepsLimit = 20;

const getMaxSteps = (size: number) => {
  // First we figure out how many steps we can fit within a chart of this size
  let stepCount = Math.floor(size / minStepSize);

  // If that's a bigger number than our step limit, we reduce our stepCount to the maxSteps limit
  if (stepCount > maxStepsLimit) {
    stepCount = maxStepsLimit;
  }

  // If our stepCount is less than 1, we return 1
  if (stepCount < 1) {
    stepCount = 1;
  }
  return stepCount;
};

export default getMaxSteps;
