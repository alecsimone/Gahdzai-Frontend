const candleMargin = 2;

const getCandleWidth = (chartUsableWidth: number, candleCount: number) =>
  Math.floor(chartUsableWidth / candleCount) - candleMargin;

export default getCandleWidth;
