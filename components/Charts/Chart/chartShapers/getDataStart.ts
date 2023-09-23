import { ChartProps } from '../types';
import smashPercentageChangesIntoTimes from './smashPercentageChangesIntoTimes';

const getDataStart = ({ data, chartType }: ChartProps) => {
  if (chartType === 'Candlestick') {
    return data[0].time;
  }
  const allTimes = smashPercentageChangesIntoTimes(data);
  allTimes.sort();
  return allTimes[0];
};

export default getDataStart;
