import { ChartProps } from '../types';
import smashPercentageChangesIntoValues from './smashPercentageChangesIntoValues';

const getDataBottom = ({ data, chartType }: ChartProps) => {
  if (chartType === 'Candlestick') {
    const lows = data.map((candle) => parseFloat(candle.low));
    lows.sort();
    return lows[0];
  }
  const allChanges = smashPercentageChangesIntoValues(data);
  allChanges.sort((a, b) => a - b);
  return allChanges[0];
};

export default getDataBottom;
