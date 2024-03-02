import { useEffect, useRef } from 'react';
import StyledChart from '../../Charts/StyledChart';
import StyledChartHolder from '../StyledChartHolder';
import setChartSize from '../../Charts/ChartShapers/setChartSize';
import animateLoadingSpinner from './animateLoadingSpinner';
import PeriodButtons from '../PeriodButtons/PeriodButtons';

const LoadingChart = ({
  loadingElements,
}: {
  loadingElements: JSX.Element[];
}): JSX.Element => {
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
      <footer>
        <PeriodButtons />
      </footer>
      <StyledChart className="chartContainer" ref={loadingChartRef}>
        Loading...
      </StyledChart>
      <header>{loadingElements}</header>
    </StyledChartHolder>
  );
};

export default LoadingChart;
