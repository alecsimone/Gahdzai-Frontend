import { type RefObject } from 'react';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import {
  MIN_HEATMAP_GRID_COLUMN_SIZE,
  MIN_HEATMAP_GRID_ROW_SIZE,
} from '../Charting/Charts/constants';

// * Figures out and then applies the optimal size of our heatmap grid
type Signature = (
  gridRef: RefObject<HTMLDivElement>,
  itemCount: number
) => void;

const setHeatmapGridProperties: Signature = (gridRef, itemCount) => {
  const grid = gridRef.current;
  if (grid) {
    const gridHeight = grid.clientHeight;
    const gridWidth = grid.clientWidth;

    // First we want to get the column count that would yield the squarest possible grid items
    let currentSmallestDifference = Infinity;
    let columnsForSmallestDifference = itemCount;
    for (let columnCount = itemCount; columnCount > 0; columnCount -= 1) {
      const columnWidth = gridWidth / columnCount;

      const rowCount = Math.ceil(itemCount / columnCount);
      const columnHeight = gridHeight / rowCount;

      const difference = Math.abs(makeSafeDecimals(columnHeight - columnWidth));
      if (
        difference < currentSmallestDifference &&
        columnWidth > MIN_HEATMAP_GRID_COLUMN_SIZE &&
        columnHeight > MIN_HEATMAP_GRID_ROW_SIZE
      ) {
        currentSmallestDifference = difference;
        columnsForSmallestDifference = columnCount;
      }
    }

    const exactRowCount = itemCount / columnsForSmallestDifference;
    const roundedDownRows = Math.floor(exactRowCount);
    const roundedUpRows = Math.ceil(exactRowCount);

    const remainderDown = itemCount % roundedDownRows;
    const remainderUp = itemCount % roundedUpRows;

    // I'm gonna be real with you, I can't wrap my brain around why this makes the most visually pleasing arrangement to me, but it does.
    let rowCount;
    if (remainderDown > remainderUp) {
      rowCount = roundedDownRows;
    } else {
      rowCount = roundedUpRows;
    }

    const columnCount = Math.ceil(itemCount / rowCount);

    const columnProperty = `repeat(${columnCount}, 1fr)`;
    const rowProperty = `repeat(${rowCount}, 1fr)`;

    grid.style.gridTemplateColumns = columnProperty;
    grid.style.gridTemplateRows = rowProperty;
  }
};

export default setHeatmapGridProperties;
