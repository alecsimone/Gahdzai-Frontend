import { ChartProps } from '../types';
import smashPercentageChangesIntoTimes from './smashPercentageChangesIntoTimes';

// * Gets the earliest time in a dataset, either Candlestick or percentChange
type Signature = (obj: ChartProps) => string;

const getDataStart: Signature = ({ data, chartType }) => {
  if (chartType === 'Candlestick') {
    return data[0].time;
  }
  const allTimes = smashPercentageChangesIntoTimes(data);
  allTimes.sort();
  return allTimes[0];
};

export default getDataStart;
