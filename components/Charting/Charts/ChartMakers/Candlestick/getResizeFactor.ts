// * Figures out the factor we need to reduce our candle count by so that our candles will fit in our chart
type Signature = (startingCandleCount: number, excessCandles: number) => number;

const getResizeFactor: Signature = (startingCandleCount, excessCandles) => {
  const maxCandlesAllowed = startingCandleCount - excessCandles;
  const candlesLeftRatio = maxCandlesAllowed / startingCandleCount;
  const resizeFactor = Math.ceil(1 / candlesLeftRatio);

  return resizeFactor;
};

export default getResizeFactor;
