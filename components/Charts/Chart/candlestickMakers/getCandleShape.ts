import { Candle } from '@/__generated__/graphql';
import { downColor, upColor } from '../gridMakers/constants';
import getCoordForValue from '../utils/getCoordForValue';
import { CandleShape } from './types';

const getCandleShape = (
  candleData: Candle,
  candleWidth: number,
  top: number,
  bottom: number,
  start: number,
  end: number,
  chartUsableHeight: number,
  chartUsableWidth: number
) => {
  const candleIsBullish = candleData.open < candleData.close;
  const candleColor = candleIsBullish ? upColor : downColor;

  // If the candle is bullish, its top will be the closing price. If it's bearish, its top will be the opening price.
  const candleTopValue = candleIsBullish
    ? parseFloat(candleData.close)
    : parseFloat(candleData.open);
  const candleTop = getCoordForValue(
    candleTopValue,
    chartUsableHeight,
    top,
    bottom
  );

  // If the candle is bullish, its bottom will be the opening price. If it's bearish, its top will be the closing price.
  const candleBottomValue = candleIsBullish
    ? parseFloat(candleData.open)
    : parseFloat(candleData.close);
  const candleBottom = getCoordForValue(
    candleBottomValue,
    chartUsableHeight,
    top,
    bottom
  );

  const wickTop = getCoordForValue(
    parseFloat(candleData.high),
    chartUsableHeight,
    top,
    bottom
  );
  const wickBottom = getCoordForValue(
    parseFloat(candleData.low),
    chartUsableHeight,
    top,
    bottom
  );

  const candleStartX = getCoordForValue(
    parseInt(candleData.time, 10),
    chartUsableWidth,
    start,
    end
  );

  const candleShape: CandleShape = {
    color: candleColor,
    width: candleWidth,
    candleTop,
    candleBottom,
    wickTop,
    wickBottom,
    x: candleStartX,
  };

  return candleShape;
};

export default getCandleShape;
