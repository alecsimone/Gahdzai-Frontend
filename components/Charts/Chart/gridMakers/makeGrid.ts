import type { ChartData, DataPoint } from '../types';
import makeHorizontalGridLines from './makeHorizontalGridLines';
import makeVerticalGridLines from './makeVerticalGridLines';

// * Wrapper function that handles calling our different functions for making the vertical and horizontal grid lines
type Signature = (chartData: ChartData, finalDatapoints: DataPoint[]) => void;

const makeGrid: Signature = (chartData, finalDatapoints) => {
  makeHorizontalGridLines(chartData);
  makeVerticalGridLines(chartData, finalDatapoints);
};

export default makeGrid;
