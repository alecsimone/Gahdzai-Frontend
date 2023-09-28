import { useEffect, useRef } from 'react';
import StyledChart from '../../Chart/StyledChart';
import StyledChartHolder from '../StyledChartHolder';
import setChartSize from '../../Chart/chartShapers/setChartSize';
import animateLoadingSpinner from './animateLoadingSpinner';
import LoadingHeaderButton from './LoadingHeaderButton';

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
      <StyledChart ref={loadingChartRef}>Loading...</StyledChart>
    </StyledChartHolder>
  );
};

export default LoadingChart;
