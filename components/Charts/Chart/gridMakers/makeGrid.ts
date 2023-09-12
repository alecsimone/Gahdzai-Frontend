import { ChartData } from '../types';
import makeGridLines from './makeGridLines';

const makeGrid = (chartData: ChartData) => {
  makeGridLines({ lineDirection: 'horizontal', chartData });
  makeGridLines({ lineDirection: 'vertical', chartData });
};

export default makeGrid;
