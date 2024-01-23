import type { Dispatch, SetStateAction } from 'react';
import getLegendElementsFromPercentageData from './getLegendElementsFromPercentageData';
import updateLegendIfNeeded from './updateLegendIfNeeded';
import { type PercentageChanges } from '../types';

// * Creates a legend for a percentage chart based on the chart's data
type Signature = (
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>,
  data: PercentageChanges[]
) => void;

const labelPercentageChart: Signature = (setLegendElements, data) => {
  const elements = data.map((changes, index) =>
    getLegendElementsFromPercentageData(changes, index)
  );

  // ? If we're running out of API queries, we can test the legend with multiple elements by querying for one element and then using this code
  // if (elements.length === 1) {
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  // }

  updateLegendIfNeeded(elements, setLegendElements);
};

export default labelPercentageChart;
