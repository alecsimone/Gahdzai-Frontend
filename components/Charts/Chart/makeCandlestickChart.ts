import { Dispatch, SetStateAction } from 'react';
import { Candle } from '@/__generated__/graphql';
import makeCandles from './candlestickMakers/makeCandles';
import convertCandlesToPoints from './drawMovingAverageLine/convertCandlesToPoints';
import drawMovingAverageLine from './drawMovingAverageLine/drawMovingAverageLine';
import { ChartData, DataPoint } from './types';

interface CandlestickChartInterface {
  chartData: ChartData;
  data: Candle[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

const makeCandlestickChart = ({
  data,
  chartData,
}: CandlestickChartInterface): DataPoint[] => {
  const { ctx } = chartData;

  makeCandles(data, chartData);

  const dataPoints = convertCandlesToPoints(data);
  drawMovingAverageLine(dataPoints, chartData, ctx);

  return dataPoints;
};

export default makeCandlestickChart;
