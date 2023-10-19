import { useRef } from 'react';

// * Sets up the Refs for our two chart elements
type Signature = () => void;

const useChartRefs: Signature = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const shadowChartRef = useRef<HTMLCanvasElement>(null);

  return { chartRef, shadowChartRef };
};

export default useChartRefs;
