import type { Candle, CandleShape, ChartDataRange } from '../../types';
import { downColor, upColor } from '../../constants';
import getYCoordByValue from '../../DataPlotters/getYCoordByValue';
import getXCoordByIndex from '../../DataPlotters/getXCoordByIndex';

// * Takes in Candle data and chart size data and figures out the coordinates of the relevant points of the candle on our chart
type Signature = (dataObj: {
  candleData: Candle;
  candleWidth: number;
  usableHeight: number;
  usableWidth: number;
  chartDataRange: ChartDataRange;
  candleIndex: number;
  totalCandles: number;
}) => CandleShape;

const getCandleShape: Signature = ({
  candleData: { open, close, high, low },
  candleWidth,
  usableHeight,
  usableWidth,
  chartDataRange: { chartTop, chartBottom },
  candleIndex,
  totalCandles,
}) => {
  const candleIsBullish = open < close;
  const candleColor = candleIsBullish ? upColor : downColor;

  // If the candle is bullish, its top will be the closing price. If it's bearish, its top will be the opening price.
  const candleTopValue = candleIsBullish ? close : open;
  const candleTop = getYCoordByValue({
    value: candleTopValue,
    chartTop,
    chartBottom,
    usableHeight,
  });

  // If the candle is bullish, its bottom will be the opening price. If it's bearish, its bottom will be the closing price.
  const candleBottomValue = candleIsBullish ? open : close;
  const candleBottom = getYCoordByValue({
    value: candleBottomValue,
    usableHeight,
    chartTop,
    chartBottom,
  });

  const wickTop = getYCoordByValue({
    value: high,
    usableHeight,
    chartTop,
    chartBottom,
  });
  const wickBottom = getYCoordByValue({
    value: low,
    usableHeight,
    chartTop,
    chartBottom,
  });

  const candleStartX = getXCoordByIndex(usableWidth, candleIndex, totalCandles);

  const candleShape: CandleShape = {
    color: candleColor,
    width: candleWidth,
    candleTop,
    candleBottom,
    wickTop,
    wickBottom,
    candleStartX,
  };

  return candleShape;
};

export default getCandleShape;
