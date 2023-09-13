import { Candle } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';

export const getCandleValue = (candleData: Candle) => {
  const { high, low, open, close } = candleData;

  const highNumber = parseFloat(high);
  const lowNumber = parseFloat(low);
  const openNumber = parseFloat(open);
  const closeNumber = parseFloat(close);

  const highLowMid = makeSafeDecimals((highNumber + lowNumber) / 2);
  const openCloseMid = makeSafeDecimals((openNumber + closeNumber) / 2);

  const overallMid = makeSafeDecimals((highLowMid + openCloseMid) / 2);

  return overallMid;
};

const convertCandlesToPoints = (candleData: Candle[]) => {
  const dataPoints = candleData.map((candle) => ({
    time: candle.time,
    value: getCandleValue(candle),
  }));

  return dataPoints;
};

export default convertCandlesToPoints;
