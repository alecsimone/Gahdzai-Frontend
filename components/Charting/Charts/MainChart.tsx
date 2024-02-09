import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import StyledChart from './StyledChart';
import useChartSize from './ChartShapers/useChartSize';
import useChartLabels from './ChartLabelers.ts/useChartLabels';
import cookRawData from './DataWranglers/cookRawData';
import getChartDataRange from './ChartShapers/getChartDataRange';
import type { ChartTypes } from '../ChartHolder/types';
import useChartRef from './useChartRef';
import type { CoordinatedDataPoint, UsableBoundaries } from './types';
import drawChart from './ChartMakers/drawChart';
import makeLegendForPercentageChart from '../ChartHolder/LegendElements/makeLegendForPercentageChart';
import { HighlightContext } from '../ChartHolder/LegendElements/HighlightContextTypes';
import makeLegendForCandlestickChart from '../ChartHolder/LegendElements/makeLegendForCandlestickChart';

// * Handles the main chart, which is responsible for actually presenting the data
interface MainChartProps {
  rawData: Get_Candles_For_Symbols_QueryQuery;
  period: Period;
  chartType: ChartTypes;
  usableBoundaries: UsableBoundaries;
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>;
  coordinatedData: CoordinatedDataPoint[];
}

const MainChart = ({
  rawData,
  period,
  chartType,
  usableBoundaries,
  setLegendElements,
  coordinatedData,
}: MainChartProps): React.ReactNode => {
  const chartRef = useChartRef();
  const chartSizeRef = useChartSize(chartRef);

  const data = cookRawData(rawData, period, chartType);
  const chartDataRange = getChartDataRange(data);

  const ctx = chartRef.current?.getContext('2d');

  useChartLabels({
    chartDataRange,
    chartSizeRef,
    ctx,
    chartType,
    data,
    usableBoundaries,
  });

  const { highlightedSymbols } = useContext(HighlightContext);
  if (
    ctx &&
    usableBoundaries.usableHeight.current > 0 &&
    usableBoundaries.usableWidth.current > 0
  ) {
    drawChart({
      data,
      usableBoundaries,
      chartType,
      ctx,
      chartDataRange,
      highlightedSymbols,
      coordinatedData,
    });
  }

  useEffect(() => {
    if (Array.isArray(data)) {
      makeLegendForPercentageChart(setLegendElements, data);
    } else {
      makeLegendForCandlestickChart(setLegendElements, data);
    }
  }, [setLegendElements, data]);

  if (chartRef.current) {
    // setLegendGridProperties(chartRef.current);
  }

  return <StyledChart ref={chartRef}>The Main Chart</StyledChart>;
};

export default MainChart;
