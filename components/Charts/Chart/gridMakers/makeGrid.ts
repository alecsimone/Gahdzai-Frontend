import { ChartData, DataPoint } from '../types';
import makeGridLines from './makeGridLines';
import makeVerticalGridLines from './makeVerticalGridLines';

const makeGrid = (chartData: ChartData, finalDatapoints: DataPoint[]) => {
  makeGridLines({ lineDirection: 'horizontal', chartData });
  makeVerticalGridLines(chartData, finalDatapoints);
};

export default makeGrid;
