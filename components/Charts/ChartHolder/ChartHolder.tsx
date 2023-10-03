import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';
import Chart from '../Chart/Chart';
import StyledChartHolder from './StyledChartHolder';
import LoadingChart from './LoadingChart/LoadingChart';

// interface ChartHolderProps {}

const ChartHolder = (): JSX.Element => {
  const {
    data,
    loading,
    error,
    legendElements,
    setLegendElements,
    HighlightContext,
    highlightContextData,
  } = useChartHolder();

  if (loading) {
    return <LoadingChart />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <HighlightContext.Provider value={highlightContextData}>
        <StyledChartHolder className="chartHolder">
          <header>{legendElements}</header>
          <Chart
            data={data}
            chartType="PercentChange"
            legendElements={legendElements}
            setLegendElements={setLegendElements}
          />
        </StyledChartHolder>
      </HighlightContext.Provider>
    );
  }
  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
