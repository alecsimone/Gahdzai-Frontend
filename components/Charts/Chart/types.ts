import type { Dispatch, SetStateAction, ReactNode, RefObject } from 'react';
import type {
  Get_Candles_QueryQuery,
  Get_Index_Data_QueryQuery,
  Candle,
  CandleSet,
} from '@/__generated__/graphql';
import type { HighlightedSymbols } from '../ChartHolder/Contexts/HighlightContext';

export type ChartTypes = 'Candlestick' | 'PercentChange';

export interface PercentageChangeValue {
  __typename?: 'PercentageChangeValue';
  percentageChange: number;
  time: string;
}

export interface PercentageChanges {
  __typename?: 'PercentageChanges';
  latestValue: number;
  initialValue: number;
  symbol: string;
  values: PercentageChangeValue[];
}

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
  labelsList: string[];
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

export const periodTypes = ['year', 'month', 'date', 'hour', 'minute'] as const;
export type PeriodTypes = (typeof periodTypes)[number];

interface ChartInterfaceBase {
  data: Candle[] | CandleSet[];
  chartType: ChartTypes;
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

interface CandlestickChartInterface extends ChartInterfaceBase {
  data: Candle[];
  chartType: 'Candlestick';
}

interface PercentageChangeChartInterface extends ChartInterfaceBase {
  data: CandleSet[];
  chartType: 'PercentChange';
}

export type ChartInterface =
  | CandlestickChartInterface
  | PercentageChangeChartInterface;

interface ChartMakerInterfaceBase {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightedSymbols: HighlightedSymbols[];
}

interface CandleChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'Candlestick';
  data: Candle[];
}

interface PercentageChartMakerInterface extends ChartMakerInterfaceBase {
  chartType: 'PercentChange';
  data: PercentageChanges[];
}

export type ChartMakerInterface =
  | CandleChartMakerInterface
  | PercentageChartMakerInterface;

export type ChartSize = { usableWidth: number; usableHeight: number } | false;
