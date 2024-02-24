import { useState } from 'react';
import Error from '@/components/Foundation/Error/Error';
import Heatmap from '@/components/Heatmap/Heatmap';
import { PeriodContext } from './PeriodButtons/ChartPeriodContextTypes';
import type { ChartDataProps } from './types';
import useChartPeriodContext from './PeriodButtons/usePeriodButtonsContext';
import PeriodButtons from './PeriodButtons/PeriodButtons';
import useLegendElements from './LegendElements/useLegendElements';
import StyledChartHolder from './StyledChartHolder';
import { HighlightContext } from './LegendElements/HighlightContextTypes';
import LoadingChart from './LoadingChart/LoadingChart';
import useQueryBuilder from './DataFetchers/useQueryBuilder';
import ChartBase from '../Charts/ChartBase';
import HeatmapToggler from './HeatmapToggler';

// * The container for our charts along with their accompanying buttons and legend. It has the following responsibilities:
// - Handles data fetching for the chart and displays the loading and error states
// - Renders the LegendItems in the header and the PeriodButtons in the footer
// - Handles the Context required for the LegendItems and the PeriodButtons

const ChartHolder = (dataObj: ChartDataProps): React.ReactNode => {
  let defaultHeatmap = false;
  const { chartType, defaultToHeatmap, index } = dataObj;
  if (chartType === 'Comparison' && defaultToHeatmap) {
    defaultHeatmap = true;
  }
  const [showAsHeatmap, setShowAsHeatmap] = useState(defaultHeatmap);

  const chartPeriodContextData = useChartPeriodContext();
  const { legendElements, setLegendElements, highlightContextData } =
    useLegendElements();
  const { data, loading, error } = useQueryBuilder(
    dataObj,
    chartPeriodContextData.activePeriod
  );

  if (loading) {
    return <LoadingChart />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (data) {
    const chartEl = showAsHeatmap ? (
      <Heatmap
        rawData={data}
        isDailyPeriod={chartPeriodContextData.activePeriod === 'D'}
      />
    ) : (
      <ChartBase
        rawData={data}
        chartType={chartType}
        setLegendElements={setLegendElements}
        period={chartPeriodContextData.activePeriod}
      />
    );

    return (
      <HighlightContext.Provider value={highlightContextData}>
        <PeriodContext.Provider value={chartPeriodContextData}>
          <StyledChartHolder className="chartHolder" key={index}>
            {!showAsHeatmap && <header>{legendElements}</header>}
            {chartEl}
            <footer>
              {chartType === 'Comparison' && (
                <HeatmapToggler
                  showAsHeatmap={showAsHeatmap}
                  setShowAsHeatmap={setShowAsHeatmap}
                />
              )}
              <PeriodButtons />
            </footer>
          </StyledChartHolder>
        </PeriodContext.Provider>
      </HighlightContext.Provider>
    );
  }

  return <Error error="Something has gone terribly wrong." />;
};

export default ChartHolder;
