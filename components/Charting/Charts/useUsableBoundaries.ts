import { useRef } from 'react';
import type { UsableBoundaries } from './types';

// * Creates refs for the usable height and usable width of the chart
type Signature = () => UsableBoundaries;

const useUsableBoundaries: Signature = () => {
  const usableHeight = useRef(0);
  const usableWidth = useRef(0);
  const usableBoundaries = { usableHeight, usableWidth };

  return usableBoundaries;
};

export default useUsableBoundaries;
