import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import type { HeatmapData } from './types';

// * Turns query data into the format that we need for our heatmap
type Signature = (
  rawData: Get_Candles_For_Symbols_QueryQuery,
  isDailyPeriod: boolean
) => HeatmapData[];

const cookHeatmapData: Signature = (rawData, isDailyPeriod) => {
  const actualData = rawData.getCandlesForSymbols;
  const heatmapData: HeatmapData[] = actualData.map((candleSet) => {
    const { symbol } = candleSet;

    const initialValue = isDailyPeriod
      ? makeSafeDecimals(candleSet.candles[0]!.close)
      : makeSafeDecimals(candleSet.candles[0]!.open);
    const finalValue = makeSafeDecimals(candleSet.candles.at(-1)!.close);

    const rawChange = makeSafeDecimals(finalValue - initialValue);

    const percentChange = makeSafeDecimals((rawChange / initialValue) * 100);

    // TODO Make changeScore based off of the z-score of the percentage change

    return {
      symbol,
      currentValue: finalValue,
      rawChange,
      changeScore: percentChange,
    };
  });

  return heatmapData;
};

export default cookHeatmapData;
