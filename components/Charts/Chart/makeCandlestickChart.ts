import { Dispatch, SetStateAction, ReactNode } from 'react';
import { Candle } from '@/__generated__/graphql';
import makeCandles from './candlestickMakers/makeCandles';
import convertCandlesToPoints from './drawMovingAverageLine/convertCandlesToPoints';
import drawMovingAverageLine from './drawMovingAverageLine/drawMovingAverageLine';
import { ChartData } from './types';

interface CandlestickChartInterface {
  chartData: ChartData;
  data: Candle[];
  setLegendElements: Dispatch<SetStateAction<ReactNode[]>>;
}

const makeCandlestickChart = ({
  data,
  chartData,
}: CandlestickChartInterface) => {
  const { ctx } = chartData;

  makeCandles(data, chartData);

  const dataPoints = convertCandlesToPoints(data);
  drawMovingAverageLine(dataPoints, chartData, ctx);
};

export default makeCandlestickChart;
