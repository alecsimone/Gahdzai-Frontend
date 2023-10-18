import Error from '@/components/Foundation/Error/Error';
import useChartHolder from './useChartHolder';
import Chart from '../Chart/Chart';
import StyledChartHolder from './StyledChartHolder';
import LoadingChart from './LoadingChart/LoadingChart';
import { HighlightContext } from './Contexts/HighlightContext';
import PeriodButtons from './PeriodButtons/PeriodButtons';
import { PeriodContext } from './Contexts/ChartPeriodContext';

// * The container for our charts along with their accompanying buttons and legend. It has the following responsibilities:
// - Handles data fetching for the chart and displays the loading and error states
// - Renders the LegendItems in the header and the PeriodButtons in the footer
// - Handles the Context required for the LegendItems and the PeriodButtons

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
