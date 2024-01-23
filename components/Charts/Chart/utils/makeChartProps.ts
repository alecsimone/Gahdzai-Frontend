import { type ChartMakerInterface, type ChartProps } from '../types';

// * Creates a ChartProps object that is properly discriminated as either being for either a candlestick or percentage change chart
type Signature = (dataObj: ChartMakerInterface) => ChartProps;

const makeChartProps: Signature = ({ chartType, data }) => {
  let chartProps: ChartProps;
  if (chartType === 'Candlestick') {
    chartProps = {
      data,
      chartType,
    };
  } else {
    chartProps = {
      data,
      chartType,
    };
  }

  return chartProps;
};

export default makeChartProps;
