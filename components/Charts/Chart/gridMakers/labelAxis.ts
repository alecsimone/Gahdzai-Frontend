import { white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { gutterPadding } from '../constants';
import checkForLabelSkip from './checkForLabelSkip';
import type { DirectionalChartData, ChartTypes } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

// * Applies labels the axes of a chart.
// - Meant to be used inside a loop going over the grid lines of a chart
// - Most important bit of logic in here is checking if this label should be skipped because it would overlap with a more important label
type Signature = (dataObj: {
  labelsList: string[];
  i: number;
  thisLineCoord: number;
  directionalChartData: DirectionalChartData;
  chartType: ChartTypes;
}) => void;

const labelAxis: Signature = ({
  labelsList,
  i,
  thisLineCoord,
  directionalChartData,
}) => {
  const {
    lineDirection,
    chartData: { ctx },
  } = directionalChartData;

  const { lineTerminus } = getChartShapeFromChartData(directionalChartData);

  // Technically we've done this styling already, but let's just make sure nothing changed between here and there
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  if (lineDirection === 'horizontal') {
    if (i === 0) {
      ctx.textBaseline = 'top';
    } else if (i === labelsList.length - 1) {
      ctx.textBaseline = 'bottom';
    } else {
      ctx.textBaseline = 'middle';
    }
  }

  if (lineDirection === 'vertical') {
    if (i === 0) {
      ctx.textAlign = 'start';
    } else {
      ctx.textAlign = 'center';
    }
  }

  const labelText = labelsList[i]!;

  const shouldSkipLabel = checkForLabelSkip({
    labelsList,
    i,
    thisLineCoord,
    labelText,
    directionalChartData,
  });

  if (!shouldSkipLabel) {
    if (lineDirection === 'horizontal') {
      ctx.fillText(labelText, lineTerminus + gutterPadding, thisLineCoord);
    } else if (lineDirection === 'vertical') {
      ctx.fillText(labelText, thisLineCoord, lineTerminus + gutterPadding);
    }
  }
};

export default labelAxis;
