import { useEffect, useRef, useState } from 'react';
import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import type { Period } from '../ChartHolder/PeriodButtons/ChartPeriodContextTypes';
import StyledChart from './StyledChart';
import useChartSize from './ChartShapers/useChartSize';
import useChartLabels from './ChartLabelers.ts/useChartLabels';
import cookRawData from './DataWranglers/cookRawData';
import getChartDataRange from './ChartShapers/getChartDataRange';
import type { ChartTypes } from '../ChartHolder/types';

// * Handles the main chart, which is responsible for actually presenting the data
interface MainChartProps {
  rawData: Get_Candles_For_Symbols_QueryQuery;
  period: Period;
  chartType: ChartTypes;
}

const MainChart = ({
  rawData,
  period,
  chartType,
}: MainChartProps): React.ReactNode => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartState, setChartState] = useState(false);
  const chartSizeRef = useChartSize(chartRef);

  const data = cookRawData(rawData, period, chartType);
  const chartDataRange = getChartDataRange(data);

  useEffect(() => {
    if (!chartState) {
      setChartState(chartRef.current != null);
    }
  }, [chartState]);

  useChartLabels({
    chartDataRange,
    chartSizeRef,
    chartRef,
    chartType,
    data,
  });

  return <StyledChart ref={chartRef}>The Main Chart</StyledChart>;
};

export default MainChart;
