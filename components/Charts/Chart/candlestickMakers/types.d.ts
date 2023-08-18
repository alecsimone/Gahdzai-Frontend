export interface CandleShape {
  width: number;
  color: string;
  candleTop: number;
  candleBottom: number;
  wickTop: number;
  wickBottom: number;
  x: number;
}

export interface ChartBoundaries {
  chartTop: number;
  chartBottom: number;
  chartStart: number;
  chartEnd: number;
}
