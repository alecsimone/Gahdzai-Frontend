import { ChartProps } from '../types';
import smashPercentageChangesIntoTimes from './smashPercentageChangesIntoTimes';

const getDataEnd = ({ data, chartType }: ChartProps) => {
  if (chartType === 'Candlestick') {
    const lastCandleStart = parseInt(data[data.length - 1].time, 10);
    const penultimateCandleStart = parseInt(data[data.length - 2].time, 10);
    const candleDuration = lastCandleStart - penultimateCandleStart;

    const endOfLastCandle = lastCandleStart + candleDuration;
    return `${endOfLastCandle}`;
  }
  const allTimes = smashPercentageChangesIntoTimes(data);
  allTimes.sort();

  const lastTime = parseInt(allTimes[allTimes.length - 1], 10);
  const penultimateTime = parseInt(allTimes[allTimes.length - 2], 10);
  const interval = lastTime - penultimateTime;

  const end = lastTime + interval;
  return `${end}`;
};

export default getDataEnd;
