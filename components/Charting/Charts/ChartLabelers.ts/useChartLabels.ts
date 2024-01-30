import {
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
} from 'react';
import type {
  CandleSet,
  ChartDataRange,
  ChartSize,
  PercentageChangeSet,
} from '../types';
import getYLabels from './getYLabels';
import setBasicStyling from '../ChartStylers.ts/setBasicStyling';
import type { ChartTypes } from '../../ChartHolder/types';
import defineUsableBoundaries from './defineUsableBoundaries';
import labelXAxis from './labelXAxis';
import getYCoordByValue from '../DataPlotters/getYCoordByValue';
import { gutterPadding } from '../constants';

// * Applies the labels to our chart
type Signature = (dataObj: {
  chartDataRange: ChartDataRange;
  chartSizeRef: MutableRefObject<ChartSize>;
  chartRef: RefObject<HTMLCanvasElement>;
  chartType: ChartTypes;
  data: CandleSet | PercentageChangeSet[];
}) => {
  usableHeight: MutableRefObject<number>;
  usableWidth: MutableRefObject<number>;
};

const useChartLabels: Signature = ({
  chartDataRange: { chartBottom, chartTop, chartStart, chartEnd },
  chartSizeRef: {
    current: { chartHeight, chartWidth },
  },
  chartRef,
  chartType,
  data,
}) => {
  const yAxisLabels = getYLabels(chartBottom, chartTop, chartHeight);

  const usableHeight = useRef(0);
  const usableWidth = useRef(0);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      setBasicStyling(ctx);

      const { newUsableWidth, newUsableHeight } = defineUsableBoundaries({
        ctx,
        yAxisLabels,
        chartType,
        usableWidth,
        usableHeight,
        chartWidth,
        chartHeight,
      });
      usableWidth.current = newUsableWidth;
      usableHeight.current = newUsableHeight;

      labelXAxis({
        chartStart,
        chartEnd,
        chartWidth,
        data,
        usableWidth,
        usableHeight,
        ctx,
      });

      const yAxisLabelObjectsArray = yAxisLabels.map((labelText) => {
        const value = Number(labelText);
        const yCoord = getYCoordByValue({
          chartBottom,
          chartTop,
          usableHeight: usableHeight.current,
          value,
        });
        return { labelText, yCoord };
      });

      yAxisLabelObjectsArray.forEach((labelObject, index) => {
        if (index === 0) {
          ctx.textBaseline = 'top';
        }
        if (index === yAxisLabelObjectsArray.length - 1) {
          ctx.textBaseline = 'bottom';
        }
        ctx.fillText(
          labelObject.labelText,
          usableWidth.current + gutterPadding,
          labelObject.yCoord
        );
      });
    }
  });

  return { usableHeight, usableWidth };
};

export default useChartLabels;
