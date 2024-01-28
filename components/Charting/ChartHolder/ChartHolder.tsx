import { PeriodContext } from './PeriodButtons/ChartPeriodContextTypes';
import type { ChartDataProps } from './types';
import useChartPeriodContext from './PeriodButtons/usePeriodButtonsContext';
import PeriodButtons from './PeriodButtons/PeriodButtons';
import useLegendElements from './LegendElements/useLegendElements';
import StyledChartHolder from './StyledChartHolder';
import { HighlightContext } from './LegendElements/HighlightContextTypes';
import useQueryBuilder from './DataFetchers/useQueryBuilder';

// * The container for our charts along with their accompanying buttons and legend. It has the following responsibilities:
// - Handles data fetching for the chart and displays the loading and error states
// - Renders the LegendItems in the header and the PeriodButtons in the footer
// - Handles the Context required for the LegendItems and the PeriodButtons

const ChartHolder = (dataObj: ChartDataProps): React.ReactNode => {
  const { chartType, symbols, symbolType } = dataObj;
  const chartPeriodContextData = useChartPeriodContext();
  const { legendElements, setLegendElements, highlightContextData } =
    useLegendElements();
  const { data, loading, error } = useQueryBuilder(
    dataObj,
    chartPeriodContextData.activePeriod
  );

  console.log(data);

  return (
    <HighlightContext.Provider value={highlightContextData}>
      <PeriodContext.Provider value={chartPeriodContextData}>
        <StyledChartHolder className="chartHolder">
          <header>
            {loading ? (
              <h6 className="chartLabel">Loading...</h6>
            ) : (
              legendElements
            )}
          </header>
          <div className="chartContainer">
            <p>
              A{chartType === 'Comparison' ? '' : 'n'} {chartType} chart for the{' '}
              {symbolType}{' '}
              {chartType === 'Comparison'
                ? symbols.map((symbol) => ` ${symbol}`)
                : ` ${symbols}`}
            </p>
            <p>
              with period
              {chartPeriodContextData.activePeriod}
            </p>
            {data && (
              <p>
                Received
                {data.getCandlesForSymbols.length} candle sets!
              </p>
            )}
          </div>
          <PeriodButtons />
        </StyledChartHolder>
      </PeriodContext.Provider>
    </HighlightContext.Provider>
  );
};

export default ChartHolder;
