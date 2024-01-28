import getVerticalStepSize from './getVerticalStepSize';

// * Creates a list of all the labels we'll be using for this chart's X-axis, ie the times that will label the vertical gridlines
type Signature = (
  chartStart: number,
  chartEnd: number,
  chartWidth: number
) => string[];

const getXLabels: Signature = (chartStart, chartEnd, chartWidth) => {
  const { time, timeType } = getVerticalStepSize(
    chartStart,
    chartEnd,
    chartWidth
  );
  console.log({ time, timeType });
};

export default getXLabels;
