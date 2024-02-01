import StyledChart from '../StyledChart';
import useChartRef from '../useChartRef';
import useMouseCoords from './useMouseCoords';
import useCrosshairs from './useCrosshairs';
import useChartSize from '../ChartShapers/useChartSize';
import type { UsableBoundaries } from '../types';

// * A second chart that displays meta information about the chart. So far that's just the crosshairs.
interface ShadowChartProps {
  usableBoundaries: UsableBoundaries;
}

const ShadowChart = ({
  usableBoundaries,
}: ShadowChartProps): React.ReactNode => {
  const shadowChartRef = useChartRef();
  useChartSize(shadowChartRef);

  const { mouseCoords } = useMouseCoords(shadowChartRef);
  useCrosshairs({
    usableBoundaries,
    shadowChartRef,
    mouseCoords,
  });
  return (
    <StyledChart ref={shadowChartRef} className="shadow">
      A shadow chart for annotating the main chart
    </StyledChart>
  );
};

export default ShadowChart;
