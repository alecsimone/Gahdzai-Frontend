import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';

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
    console.log(data);
    return <div>We got data! Check the console.</div>;
    // return <Chart data={data} />;
  }
  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
