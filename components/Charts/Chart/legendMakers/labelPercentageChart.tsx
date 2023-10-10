import { Dispatch, SetStateAction } from 'react';
import getLegendElementsFromPercentageData from './getLegendElementsFromPercentageData';
import updateLegendIfNeeded from './updateLegendIfNeeded';
import { PercentageChanges } from '../types';

const labelPercentageChart = (
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>,
  data: PercentageChanges[]
) => {
  const elements = data.map((changes, index) =>
    getLegendElementsFromPercentageData(changes, index)
  );

  // ? If we're running out of data, we can test the legend with multiple elements by querying for one element and then using this code
  // if (elements.length === 1) {
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  // }

  updateLegendIfNeeded(elements, setLegendElements);
};

export default labelPercentageChart;
