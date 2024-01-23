import { ChartProps } from '../types';
import smashPercentageChangesIntoValues from './smashPercentageChangesIntoValues';

// * Gets the highest point in a dataset, either Candlestick or percentChange
type Signature = (obj: ChartProps) => number;

const getDataTop: Signature = ({ data, chartType }) => {
  if (chartType === 'Candlestick') {
    const highs = data.map((candle) => parseFloat(candle.high));
    highs.sort();
    return highs[highs.length - 1];
  }
  const allChanges = smashPercentageChangesIntoValues(data);
  allChanges.sort((a, b) => a - b);
  return allChanges[allChanges.length - 1];
};

export default getDataTop;
