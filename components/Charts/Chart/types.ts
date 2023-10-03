import { Dispatch, SetStateAction, ReactNode } from 'react';
import {
  Get_Candles_QueryQuery,
  Get_Index_Data_QueryQuery,
  Candle,
  PercentageChanges,
} from '@/__generated__/graphql';

export type ChartTypes = 'Candlestick' | 'PercentChange';

interface ChartQueryPropsBase {
  legendElements: ReactNode[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

interface CandlestickQueryProps extends ChartQueryPropsBase {
  data: Get_Candles_QueryQuery;
  chartType: 'Candlestick';
}

interface PercentageQueryProps extends ChartQueryPropsBase {
  data: Get_Index_Data_QueryQuery;
  chartType: 'PercentChange';
}

export type ChartQueryProps = CandlestickQueryProps | PercentageQueryProps;

interface ChartPropsBase {
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

interface CandlestickProps extends ChartPropsBase {
  data: Candle[];
  chartType: 'Candlestick';
}

interface PercentageChangeProps extends ChartPropsBase {
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
