export interface CandleShape {
  color: string;
  candleStartX: number;
  width: number;
  candleTop: number;
  candleBottom: number;
  wickTop: number;
  wickBottom: number;
}

export interface ChartBoundaries {
  chartTop: number;
  chartBottom: number;
  chartStart: number;
  chartEnd: number;
}

export interface ChartData {
  ctx: CanvasRenderingContext2D;
  usableWidth: number;
  usableHeight: number;
  chartBoundaries: ChartBoundaries;
}

export type LineDirection = 'horizontal' | 'vertical';

export interface DirectionalChartData {
  chartData: ChartData;
  lineDirection: LineDirection;
}

export interface LabelSkipCheckInterface {
  stepList: number[];
  i: number;
  thisLineCoord: number;
  labelText: string;
  directionalChartData: DirectionalChartData;
}
