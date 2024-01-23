import { type Dispatch, type SetStateAction } from 'react';
import {
  type ChartData,
  type PercentageChanges,
  type DataPoint,
} from './types';
import labelPercentageChart from './legendMakers/labelPercentageChart';
import { type HighlightedSymbols } from '../ChartHolder/Contexts/HighlightContext';

import drawPercentageChangesLineChart from './drawPercentageChangesLineChart';

// * Takes in an array of PercentageChanges data for a chart and draws the lines and creates legend elements for each of them
type Signature = (dataObj: {
  chartData: ChartData;
  data: PercentageChanges[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightedSymbols: HighlightedSymbols[];
}) => DataPoint[];

const makePercentageChart: Signature = ({
  chartData,
  data,
  setLegendElements,
  highlightedSymbols,
}) => {
  let dataPoints: DataPoint[] = [];
  data.forEach((changes, index) => {
    const theseData = drawPercentageChangesLineChart(
      changes,
      index,
      highlightedSymbols,
      chartData
    );
    dataPoints = dataPoints.concat(theseData);
  });

  labelPercentageChart(setLegendElements, data);

  return dataPoints;
};

export default makePercentageChart;
