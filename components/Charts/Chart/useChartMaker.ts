import { useEffect, useRef } from 'react';
import chartMaker, { ChartMakerInterface, ChartSize } from './chartMaker';

const useChartMaker = (chartMakerDataObj: ChartMakerInterface) => {
  const sizeRef = useRef<ChartSize>(false);
  useEffect(() => {
    sizeRef.current = chartMaker(chartMakerDataObj);

    const chartMakerHandler = () => {
      chartMaker(chartMakerDataObj);
    };

    window.addEventListener('resize', chartMakerHandler);

    return () => {
      window.removeEventListener('resize', chartMakerHandler);
    };
  }, [chartMakerDataObj]);

  return sizeRef;
};

export default useChartMaker;
