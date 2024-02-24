import { useEffect, useRef } from 'react';
import StyledChart from '../../Charts/StyledChart';
import StyledChartHolder from '../StyledChartHolder';
import setChartSize from '../../Charts/ChartShapers/setChartSize';
import animateLoadingSpinner from './animateLoadingSpinner';
import LoadingHeaderButton from './LoadingHeaderButton';
import PeriodButtons from '../PeriodButtons/PeriodButtons';

const LoadingChart = (): JSX.Element => {
  const loadingChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (loadingChartRef.current) {
      const loadingChart = loadingChartRef.current;
      setChartSize(loadingChart);

      const ctx = loadingChart.getContext('2d');
      if (ctx) {
        animateLoadingSpinner(ctx);
      }
    }
  });

  return (
    <StyledChartHolder className="chartHolder">
      <header>
        <LoadingHeaderButton />
      </header>
      <StyledChart className="chartContainer" ref={loadingChartRef}>
        Loading...
      </StyledChart>
      <footer>
        <PeriodButtons />
      </footer>
    </StyledChartHolder>
  );
};

export default LoadingChart;
