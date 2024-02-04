// * Figures out how wide our candles can be to fit on our chart
type Signature = (usableWidth: number, candleCount: number) => number;

const candleMargin = 2;

const getCandleWidth: Signature = (usableWidth, candleCount) =>
  Math.floor(usableWidth / candleCount) - candleMargin;

export default getCandleWidth;
