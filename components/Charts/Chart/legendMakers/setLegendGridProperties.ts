import getOneRem from '@/styles/functions/getOneRem';
import { minimumLegendElementRemSize } from '../../ChartHolder/StyledChartHolder';
import getGridColumnCount from './getGridColumnCount';

const setLegendGridProperties = (chartEl: HTMLCanvasElement) => {
  const legendElementMinimumWidth =
    (minimumLegendElementRemSize + 2) * getOneRem(); // The +2 is to account for the gap
  const holder = chartEl.closest('section.chartHolder');
  if (holder == null) return;
  const legend = holder.querySelector('header');
  if (legend == null) return;
  const legendElements = legend.querySelectorAll('h6');
  if (legendElements == null) return;
  const legendElementsCount = legendElements.length;
  const legendWidth = legend.clientWidth;

  const betterLegendColumnsCount = getGridColumnCount(
    legendWidth,
    legendElementsCount,
    legendElementMinimumWidth
  );

  if (betterLegendColumnsCount === 1) {
    legend.style.gridTemplateColumns = 'repeat(auto-fit, minmax(20rem, 1fr))';
    return;
  }

  let columnsString = '';
  for (let i = 0; i < betterLegendColumnsCount; i += 1) {
    if (i === 0) {
      columnsString += '1fr';
    } else {
      columnsString += ' 1fr';
    }
  }

  legend.style.gridTemplateColumns = columnsString;
};

export default setLegendGridProperties;
