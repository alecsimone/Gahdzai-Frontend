import type { Dispatch, SetStateAction } from 'react';
import getLegendElementsFromPercentageData from './getLegendElementsFromPercentageData';
import type { PercentageChangeSet } from '../../Charts/types';
import updateLegendIfNeeded from './updateLegendIfNeeded';

// * Creates a legend for a percentage chart based on the chart's data
type Signature = (
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>,
  data: PercentageChangeSet[]
) => void;

const makeLegendForPercentageChart: Signature = (setLegendElements, data) => {
  const elements = data.map((percentageChangeSet, index) =>
    getLegendElementsFromPercentageData(percentageChangeSet, index)
  );

  // ? If we're running out of API queries, we can test the legend with multiple elements by querying for one element and then using this code
  // if (elements.length === 1) {
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  // }

  updateLegendIfNeeded(elements, setLegendElements);
};

export default makeLegendForPercentageChart;
