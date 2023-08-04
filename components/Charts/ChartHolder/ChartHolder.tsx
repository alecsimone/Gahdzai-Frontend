import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';
import Chart from '../Chart/Chart';

// interface ChartHolderProps {}

const ChartHolder = (): JSX.Element => {
  const { data, loading, error } = useChartHolder();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return <Chart data={data} />;
  }
  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
