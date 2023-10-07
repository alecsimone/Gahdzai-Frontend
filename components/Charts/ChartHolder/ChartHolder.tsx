import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';
import Chart from '../Chart/Chart';
import StyledChartHolder from './StyledChartHolder';
import LoadingChart from './LoadingChart/LoadingChart';
import { HighlightContext } from './HighlightContext';
import PeriodButtons from './PeriodButtons/PeriodButtons';
import { PeriodContext } from './ChartPeriodContext';

// interface ChartHolderProps {}

const ChartHolder = (): JSX.Element => {
  const {
    data,
    loading,
    error,
    legendElements,
    setLegendElements,
    highlightContextData,
    chartPeriodContextData,
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
        <PeriodContext.Provider value={chartPeriodContextData}>
          <StyledChartHolder className="chartHolder">
            <header>{legendElements}</header>
            <Chart
              data={data}
              chartType="PercentChange"
              legendElements={legendElements}
              setLegendElements={setLegendElements}
            />
            <PeriodButtons />
          </StyledChartHolder>
        </PeriodContext.Provider>
      </HighlightContext.Provider>
    );
  }
  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
