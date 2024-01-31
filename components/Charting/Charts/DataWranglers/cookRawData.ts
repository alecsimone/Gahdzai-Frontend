import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Candle, CandleSet, PercentageChangeSet } from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import type { Period } from '../../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import convertCandleSetToPercentageChangeSet from './convertCandleSetToPercentageChangeSet';

// * Pulls the data out of the form we get it in from the server into the form we're going to use it in for our chart
// - If we have more than one candle set, we need to convert the candles to percentage change values
// - If we have only one candle set, we just need to massage the data into the exact shape we expect it to be in going forward.
type Signature = (
  rawData: Get_Candles_For_Symbols_QueryQuery,
  period: Period,
  chartType: ChartTypes
) => CandleSet | PercentageChangeSet[];

const cookRawData: Signature = (rawData, period, chartType) => {
  const actualData = rawData.getCandlesForSymbols;
  let data: CandleSet | PercentageChangeSet[];
  if (chartType === 'Comparison') {
    const PercentageChangeSets = actualData.map((candleSet) =>
      convertCandleSetToPercentageChangeSet(candleSet, period)
    );
    data = PercentageChangeSets;
  } else {
    const properCandles: Candle[] = actualData[0]?.candles.map(
      (improperCandleSet) => {
        const properCandle: Candle = {
          time: Number(improperCandleSet.time),
          open: Number(improperCandleSet.open),
          close: Number(improperCandleSet.close),
          high: Number(improperCandleSet.high),
          low: Number(improperCandleSet.low),
        };
        return properCandle;
      }
    )!;
    data = {
      symbol: actualData[0]?.symbol!,
      candles: properCandles,
    };
  }

  return data;
};

export default cookRawData;
