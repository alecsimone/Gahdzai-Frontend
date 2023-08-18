import { Get_Candles_QueryQuery, Candle } from '@/__generated__/graphql';
import StyledChart from './StyledChart';
import useChart from './useChart';

interface ChartProps {
  data: Get_Candles_QueryQuery;
}

const Chart = ({ data }: ChartProps): JSX.Element => {
  const chartRef = useChart(data.getCandles as Candle[]);
  return <StyledChart ref={chartRef}>A chart</StyledChart>;
};

export default Chart;
