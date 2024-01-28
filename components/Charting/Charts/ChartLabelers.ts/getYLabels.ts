import makeHorizontalStepList from './makeHorizontalStepList';

// * Creates a list of all the labels we'll be using for this chart's y-axis, ie the values that will label the horizontal gridlines
type Signature = (
  chartBottom: number,
  chartTop: number,
  chartHeight: number
) => string[];

const getYLabels: Signature = (chartBottom, chartTop, chartHeight) => {
  const stepList = makeHorizontalStepList(chartBottom, chartTop, chartHeight);

  const yLabels = stepList.map((step) => `${step}`);
  return yLabels;
};

export default getYLabels;
