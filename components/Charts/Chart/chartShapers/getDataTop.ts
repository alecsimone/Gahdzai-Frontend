import { ChartProps } from '../types';
import smashPercentageChangesIntoValues from './smashPercentageChangesIntoValues';

const getDataTop = ({ data, chartType }: ChartProps) => {
  if (chartType === 'Candlestick') {
    const highs = data.map((candle) => parseFloat(candle.high));
    highs.sort();
    return highs[highs.length - 1];
  }
  const allChanges = smashPercentageChangesIntoValues(data);
  allChanges.sort();
  return allChanges[allChanges.length - 1];
};

export default getDataTop;
