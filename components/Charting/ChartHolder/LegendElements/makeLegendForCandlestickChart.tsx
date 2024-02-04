import type { Dispatch, SetStateAction } from 'react';
import type { CandleSet } from '../../Charts/types';
import getLegendElementFromCandlestickData from './getLegendElementFromCandlestickData';
import updateLegendIfNeeded from './updateLegendIfNeeded';

// * Creates a legend for a candlestick chart based on the chart's data
type Signature = (
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>,
  data: CandleSet
) => void;

const makeLegendForCandlestickChart: Signature = (setLegendElements, data) => {
  const legendElement = getLegendElementFromCandlestickData(data);
  updateLegendIfNeeded([legendElement], setLegendElements);
};

export default makeLegendForCandlestickChart;
