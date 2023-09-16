const getResizeFactor = (
  startingCandleCount: number,
  excessCandles: number
) => {
  const maxCandlesAllowed = startingCandleCount - excessCandles;
  const candlesLeftRatio = maxCandlesAllowed / startingCandleCount;
  const resizeFactor = Math.ceil(1 / candlesLeftRatio);

  return resizeFactor;
};

export default getResizeFactor;
