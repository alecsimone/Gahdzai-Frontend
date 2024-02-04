import makeSafeDecimals from '@/utils/makeSafeDecimals';
import type { Candle, DataPoint } from '../../types';

// * Takes in an array of candles and returns an array of DataPoints representing the average value of the candle
type Signature = (candleData: Candle[]) => DataPoint[];

export const getCandleValue = (candleData: Candle) => {
  const { high, low, open, close } = candleData;

  const highLowMid = makeSafeDecimals((high + low) / 2);
  const openCloseMid = makeSafeDecimals((open + close) / 2);

  const overallMid = makeSafeDecimals((highLowMid + openCloseMid) / 2);

  return overallMid;
};

const convertCandlesToPoints: Signature = (candleData) => {
  const dataPoints: DataPoint[] = candleData.map((candle) => ({
    time: candle.time,
    value: getCandleValue(candle),
  }));

  return dataPoints;
};

export default convertCandlesToPoints;
