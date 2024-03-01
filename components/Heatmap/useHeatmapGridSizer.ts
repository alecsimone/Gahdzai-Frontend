import { useRef, type RefObject, useLayoutEffect, useEffect } from 'react';
import setHeatmapGridProperties from './setHeatmapGridProperties';

// * Sets the row and column counts of our heatmap grid based on how many items are in it
type Signature = (itemCount: number) => RefObject<HTMLDivElement>;

const useHeatmapGridSizer: Signature = (itemCount) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setHeatmapGridProperties(gridRef, itemCount);
  }, [itemCount]);

  useEffect(() => {
    const heatmapGridPropertiesHandler = () =>
      setHeatmapGridProperties(gridRef, itemCount);

    window.addEventListener('resize', heatmapGridPropertiesHandler);

    return () => {
      window.removeEventListener('resize', heatmapGridPropertiesHandler);
    };
  }, [itemCount]);

  return gridRef;
};

export default useHeatmapGridSizer;
