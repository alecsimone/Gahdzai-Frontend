import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';
import Chart from '../Chart/Chart';
import StyledChartHolder from './StyledChartHolder';

// interface ChartHolderProps {}

const ChartHolder = (): JSX.Element => {
  const { data, loading, error, legendElements, setLegendElements } =
    useChartHolder();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <StyledChartHolder className="chartHolder">
        <header>{legendElements}</header>
        <Chart
          data={data}
          chartType="PercentChange"
          setLegendElements={setLegendElements}
        />
      </StyledChartHolder>
    );
  }
  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
