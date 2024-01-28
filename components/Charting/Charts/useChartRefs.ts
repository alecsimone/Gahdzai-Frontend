import { useRef, type RefObject } from 'react';

// * Sets up the Refs for our two chart elements
type Signature = () => {
  chartRef: RefObject<HTMLCanvasElement>;
  shadowChartRef: RefObject<HTMLCanvasElement>;
};

const useChartRefs: Signature = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const shadowChartRef = useRef<HTMLCanvasElement>(null);

  return { chartRef, shadowChartRef };
};

export default useChartRefs;
