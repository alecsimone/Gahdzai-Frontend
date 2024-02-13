import { useRef, type MutableRefObject } from 'react';
import type { Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import getChartDataRange from './ChartShapers/getChartDataRange';
import cookRawData from './DataWranglers/cookRawData';
import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  PercentageChangeSet,
} from './types';
import type { ChartTypes } from '../ChartHolder/types';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';

// * Cooks our raw data (ie, converts it to the exact shape we're going to work with for our chart) and creates a ref to hold the coordinatedDataPoints that will keep track of both the values and chart coordinates of each datapoint
type Signature = (dataObj: {
  rawData: Get_Candles_For_Symbols_QueryQuery;
  period: Period;
  chartType: ChartTypes;
}) => {
  data: CandleSet | PercentageChangeSet[];
  chartDataRange: ChartDataRange;
  coordinatedData: MutableRefObject<CoordinatedDataPoint[]>;
};

const useChartData: Signature = ({ rawData, period, chartType }) => {
  const coordinatedData = useRef<CoordinatedDataPoint[]>([]);

  const data = cookRawData(rawData, period, chartType);
  const chartDataRange = getChartDataRange(data);

  return {
    data,
    chartDataRange,
    coordinatedData,
  };
};

export default useChartData;
