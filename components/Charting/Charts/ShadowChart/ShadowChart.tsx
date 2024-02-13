// @refresh reset

import clearCanvas from '@/utils/canvas/clearCanvas';
import StyledChart from '../StyledChart';
import useChartRef from '../useChartRef';
import useMouseCoords from './useMouseCoords';
import useCrosshairs from './useCrosshairs';
import useChartSize from '../ChartShapers/useChartSize';
import type {
  ChartDataRange,
  CoordinatedDataPoint,
  UsableBoundaries,
} from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import showValueAtCursor from './showValueAtCursor';
import showCursorValueOnAxes from './showCursorValueOnAxes';

// * A second chart that displays meta information about the chart. So far that's just the crosshairs.
interface ShadowChartProps {
  usableBoundaries: UsableBoundaries;
  coordinatedData: CoordinatedDataPoint[];
  chartDataRange: ChartDataRange | undefined;
  chartType: ChartTypes;
}

const ShadowChart = ({
  usableBoundaries,
  coordinatedData,
  chartDataRange,
  chartType,
}: ShadowChartProps): React.ReactNode => {
  const shadowChartRef = useChartRef();
  useChartSize(shadowChartRef);

  clearCanvas(shadowChartRef.current);

  const { mouseCoords } = useMouseCoords(shadowChartRef);
  useCrosshairs({
    usableBoundaries,
    shadowChartRef,
    mouseCoords,
  });

  if (shadowChartRef.current && mouseCoords) {
    const timeAtCursor = showValueAtCursor({
      mouseCoords,
      coordinatedData,
      usableBoundaries,
      shadowChart: shadowChartRef.current,
      chartType,
    });
    if (timeAtCursor && chartDataRange) {
      const ctx = shadowChartRef.current.getContext('2d');
      if (ctx) {
        showCursorValueOnAxes({
          ctx,
          mouseCoords,
          timeAtCursor,
          usableBoundaries,
          chartDataRange,
          decorator: chartType === 'Comparison' ? '%' : '',
        });
      }
    }
  }
  return (
    <StyledChart ref={shadowChartRef} className="shadow">
      A shadow chart for annotating the main chart
    </StyledChart>
  );
};

export default ShadowChart;
