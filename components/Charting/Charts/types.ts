export interface ChartSize {
  chartWidth: number;
  chartHeight: number;
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
  candles: Candle[];
}

export interface PercentageChange {
  time: number;
  change: number;
}

export interface PercentageChangeSet {
  symbol: string;
  initialValue: number;
  changes: PercentageChange[];
}

export const timeTypes = ['year', 'month', 'day', 'hour', 'minute'] as const;
export type TimeTypes = (typeof timeTypes)[number];
