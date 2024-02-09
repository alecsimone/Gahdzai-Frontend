import StyledChart from '../StyledChart';
import useChartRef from '../useChartRef';
import useMouseCoords from './useMouseCoords';
import useCrosshairs from './useCrosshairs';
import useChartSize from '../ChartShapers/useChartSize';
import type { CoordinatedDataPoint, UsableBoundaries } from '../types';
import showValueAtCursor from './showValueAtCursor';

// * A second chart that displays meta information about the chart. So far that's just the crosshairs.
interface ShadowChartProps {
  usableBoundaries: UsableBoundaries;
  coordinatedData: CoordinatedDataPoint[];
}

const ShadowChart = ({
  usableBoundaries,
  coordinatedData,
}: ShadowChartProps): React.ReactNode => {
  const shadowChartRef = useChartRef();
  useChartSize(shadowChartRef);

  const { mouseCoords } = useMouseCoords(shadowChartRef);
  useCrosshairs({
    usableBoundaries,
    shadowChartRef,
    mouseCoords,
  });

  if (shadowChartRef.current) {
    showValueAtCursor({
      mouseCoords,
      coordinatedData,
      usableBoundaries,
      shadowChart: shadowChartRef.current,
    });
  }
  return (
    <StyledChart ref={shadowChartRef} className="shadow">
      A shadow chart for annotating the main chart
    </StyledChart>
  );
};

export default ShadowChart;
