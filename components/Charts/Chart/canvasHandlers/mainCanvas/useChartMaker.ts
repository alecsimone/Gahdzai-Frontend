import { type MutableRefObject, useEffect, useRef } from 'react';
import chartMaker from '../../chartMaker';
import { type ChartMakerInterface, type ChartSize } from '../../types';

// * Our parent function for chartMaker, which makes the charts. This function handles assigning it to a resize listener so that the chart will be remade for the new window size whenever it needs to.
type Signature = (
  chartMakerDataObj: ChartMakerInterface
) => MutableRefObject<ChartSize>;

const useChartMaker: Signature = (chartMakerDataObj) => {
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
