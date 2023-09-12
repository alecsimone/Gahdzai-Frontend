import { Candle } from '@/__generated__/graphql';
import { downColor, upColor } from '../constants';
import getCoordForValue from '../utils/getCoordForValue';
import { CandleShape, ChartData } from '../types';

const getCandleShape = (
  candleData: Candle,
  candleWidth: number,
  chartData: ChartData
) => {
  const candleIsBullish = candleData.open < candleData.close;
  const candleColor = candleIsBullish ? upColor : downColor;

  const {
    usableHeight,
    usableWidth,
    chartBoundaries: { chartTop, chartBottom, chartStart, chartEnd },
  } = chartData;

  // If the candle is bullish, its top will be the closing price. If it's bearish, its top will be the opening price.
  const candleTopValue = candleIsBullish
    ? parseFloat(candleData.close)
    : parseFloat(candleData.open);
  const candleTop = getCoordForValue(
    candleTopValue,
    usableHeight,
    chartTop,
    chartBottom
  );

  // If the candle is bullish, its bottom will be the opening price. If it's bearish, its bottom will be the closing price.
  const candleBottomValue = candleIsBullish
    ? parseFloat(candleData.open)
    : parseFloat(candleData.close);
  const candleBottom = getCoordForValue(
    candleBottomValue,
    usableHeight,
    chartTop,
    chartBottom
  );

  const wickTop = getCoordForValue(
    parseFloat(candleData.high),
    usableHeight,
    chartTop,
    chartBottom
  );
  const wickBottom = getCoordForValue(
    parseFloat(candleData.low),
    usableHeight,
    chartTop,
    chartBottom
  );

  const candleStartX = getCoordForValue(
    parseInt(candleData.time, 10),
    usableWidth,
    chartStart,
    chartEnd
  );

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
