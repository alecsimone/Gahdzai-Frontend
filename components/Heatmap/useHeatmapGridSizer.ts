import { useRef, type RefObject, useLayoutEffect } from 'react';
import getOneRem from '@/styles/functions/getOneRem';
import makeSafeDecimals from '@/utils/makeSafeDecimals';

// * Sets the row and column counts of our heatmap grid based on how many items are in it
type Signature = (itemCount: number) => RefObject<HTMLDivElement>;

export const MIN_HEATMAP_GRID_COLUMN_SIZE = 15 * getOneRem();
export const MIN_HEATMAP_GRID_ROW_SIZE = 5 * getOneRem();

const useHeatmapGridSizer: Signature = (itemCount) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      // TODO we want to get the squarest possible elements. So we're going to do a for loop or something to count down from itemCount and check how square the items would be if we had that many rows. When we've found the row count that gets the squarest items, we set the row and column counts accordingly

      const gridHeight = grid.clientHeight;
      const gridWidth = grid.clientWidth;

      let currentSmallestDifference = Infinity;
      let columnsForSmallestDifference = itemCount;
      for (let columnCount = itemCount; columnCount >= 1; columnCount -= 1) {
        const itemWidth = gridWidth / columnCount;

        const rowCount = Math.ceil(itemCount / columnCount);
        const columnHeight = gridHeight / rowCount;

        const difference = Math.abs(makeSafeDecimals(columnHeight - itemWidth));
        if (difference < currentSmallestDifference) {
          currentSmallestDifference = difference;
          columnsForSmallestDifference = columnCount;
        }
      }

      const roundedDownRows = Math.floor(
        itemCount / columnsForSmallestDifference
      );
      const remainderDown = itemCount % roundedDownRows;

      const roundedUpRows = Math.ceil(itemCount / columnsForSmallestDifference);
      const remainderUp = itemCount % roundedUpRows;

      let rowCount;
      if (remainderDown > remainderUp) {
        rowCount = roundedDownRows;
      } else {
        rowCount = roundedUpRows;
      }

      const columnCount = Math.round(itemCount / rowCount);

      const columnProperty = `repeat(${columnCount}, 1fr)`;
      const rowProperty = `repeat(${rowCount}, 1fr)`;

      // To make squares
      // const columnProperty = `repeat(${columnsForSmallestDifference}, 1fr)`;
      // const rowProperty = `repeat(${Math.ceil(
      //   itemCount / columnsForSmallestDifference
      // )}, 1fr)`;

      // const columnProperty = 'repeat(6, 1fr)';
      // const rowProperty = '1fr 1fr';

      grid.style.gridTemplateColumns = columnProperty;
      grid.style.gridTemplateRows = rowProperty;
    }
  }, []);

  return gridRef;
};

export default useHeatmapGridSizer;
