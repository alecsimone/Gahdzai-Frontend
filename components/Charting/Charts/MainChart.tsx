// @refresh reset

import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';
import StyledChart from './StyledChart';
import useChartSize from './ChartShapers/useChartSize';
import type { ChartTypes } from '../ChartHolder/types';
import useChartRef from './useChartRef';
import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  PercentageChangeSet,
  UsableBoundaries,
} from './types';
import makeLegendForCandlestickChart from '../ChartHolder/LegendElements/makeLegendForCandlestickChart';
import { HighlightContext } from '../ChartHolder/LegendElements/HighlightContextTypes';
import useChartLabels from './ChartLabelers.ts/useChartLabels';
import makeLegendForPercentageChart from '../ChartHolder/LegendElements/makeLegendForPercentageChart';
import setLegendGridProperties from '../ChartHolder/LegendElements/setLegendGridProperties';
import useChartDrawer from './ChartMakers/useChartDrawer';

// * Handles the main chart, which is responsible for actually presenting the data
interface MainChartProps {
  data: CandleSet | PercentageChangeSet[];
  chartType: ChartTypes;
  usableBoundaries: UsableBoundaries;
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>;
  coordinatedData: CoordinatedDataPoint[];
  chartDataRange: ChartDataRange;
}

const MainChart = ({
  data,
  chartType,
  usableBoundaries,
  setLegendElements,
  coordinatedData,
  chartDataRange,
}: MainChartProps): React.ReactNode => {
  const chartRef = useChartRef();
  const chartSize = useChartSize(chartRef);

  const ctx = chartRef.current?.getContext('2d');

  useChartLabels({
    chartDataRange,
    chartSize,
    ctx,
    chartType,
    data,
    usableBoundaries,
  });

  const { highlightedSymbols } = useContext(HighlightContext);

  useChartDrawer({
    data,
    usableBoundaries,
    chartType,
    ctx,
    chartDataRange,
    highlightedSymbols,
    coordinatedData,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      makeLegendForPercentageChart(setLegendElements, data);
    } else {
      makeLegendForCandlestickChart(setLegendElements, data);
    }
  }, [setLegendElements, data]);

  if (chartRef.current) {
    setLegendGridProperties(chartRef.current);
  }

  return <StyledChart ref={chartRef}>The Main Chart</StyledChart>;
};

export default MainChart;
