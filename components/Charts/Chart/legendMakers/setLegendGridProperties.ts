import getOneRem from '@/styles/functions/getOneRem';
import { minimumLegendElementRemSize } from '../../ChartHolder/StyledChartHolder';

const legendElementMinimumWidth =
  (minimumLegendElementRemSize + 2) * getOneRem(); // The +2 is to account for the gap

const setLegendGridProperties = (chartEl: HTMLCanvasElement) => {
  const holder = chartEl.closest('section.chartHolder');
  if (holder == null) return;
  const legend = holder.querySelector('header');
  if (legend == null) return;
  const legendElements = legend.querySelectorAll('h6');
  if (legendElements == null) return;
  const legendElementsCount = legendElements.length;
  const legendWidth = legend.clientWidth;

  const minimumLegendColumns = Math.floor(
    legendWidth / legendElementMinimumWidth
  );
  const betterLegendColumnsCount = Math.ceil(
    legendElementsCount / minimumLegendColumns
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
