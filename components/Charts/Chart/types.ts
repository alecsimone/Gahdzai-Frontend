import {
  Get_Candles_QueryQuery,
  Get_Index_Data_QueryQuery,
  Candle,
  PercentageChanges,
} from '@/__generated__/graphql';

export type ChartTypes = 'Candlestick' | 'PercentChange';

interface CandlestickQueryProps {
  data: Get_Candles_QueryQuery;
  chartType: 'Candlestick';
}

interface PercentageQueryProps {
  data: Get_Index_Data_QueryQuery;
  chartType: 'PercentChange';
}

export type ChartQueryProps = CandlestickQueryProps | PercentageQueryProps;

interface CandlestickProps {
  data: Candle[];
  chartType: 'Candlestick';
}

interface PercentageChangeProps {
  data: PercentageChanges[];
  chartType: 'PercentChange';
}

export type ChartProps = CandlestickProps | PercentageChangeProps;

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
  chartType: ChartTypes;
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

export type DataPoint = {
  time: string;
  value: number;
};

export type Coordinate = {
  x: number;
  y: number;
};
