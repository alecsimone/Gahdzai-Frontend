import type { MutableRefObject } from 'react';

export interface ChartSize {
  chartWidth: number;
  chartHeight: number;
}

export interface UsableBoundaries {
  usableWidth: MutableRefObject<number>;
  usableHeight: MutableRefObject<number>;
}

export interface ChartDataRange {
  chartTop: number;
  chartBottom: number;
  chartStart: number;
  chartEnd: number;
}

export interface Candle {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface CandleSet {
  symbol: string;
  initialValue: number;
  candles: Candle[];
}

export interface PercentageChange {
  time: number;
  change: number;
}

export interface PercentageChangeSet {
  symbol: string;
  initialValue: number;
  latestValue: number;
  changes: PercentageChange[];
}

export const timeTypes = ['year', 'month', 'day', 'hour', 'minute'] as const;
export type TimeTypes = (typeof timeTypes)[number];

export interface DataPoint {
  time: number;
  value: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface CandleShape {
  color: string;
  candleStartX: number;
  width: number;
  candleTop: number;
  candleBottom: number;
  wickTop: number;
  wickBottom: number;
}

export interface CoordinatedDataPoint {
  symbol: string;
  x: number;
  y?: number;
  width?: number;
  data: Candle | PercentageChange;
}
