import { useRef, useState, type RefObject, useEffect } from 'react';

// * Handles the chartRef, including keeping track of a hasMounted state so that we can re-render after the chart mounts and properly draw our chart
type Signature = () => RefObject<HTMLCanvasElement>;

const useChartRef: Signature = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartHasMounted, setChartHasMounted] = useState(false);

  useEffect(() => {
    // Our chartRef won't trigger a re-render after it finds the chart, so we pop it in state to make sure it does
    if (!chartHasMounted) {
      setChartHasMounted(chartRef.current != null);
    }
  }, [chartHasMounted]);

  return chartRef;
};

export default useChartRef;
