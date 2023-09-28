import { useEffect, RefObject, MutableRefObject, useRef } from 'react';
import getMousePosOverCanvas, {
  MouseCoords,
} from './utils/getMousePosOverCanvas';

const useMouseCoords = (): {
  shadowChartRef: RefObject<HTMLCanvasElement>;
  mouseCoords: MutableRefObject<MouseCoords>;
} => {
  const shadowChartRef = useRef<HTMLCanvasElement>(null);
  const mouseCoords = useRef<MouseCoords>(false);

  useEffect(() => {
    const canvas = shadowChartRef.current;
    const updateMouseCoords = (event: MouseEvent) => {
      const mousePos = getMousePosOverCanvas(canvas, event);
      // eslint-disable-next-line no-param-reassign
      mouseCoords.current = mousePos;
    };

    window.addEventListener('mousemove', updateMouseCoords);

    return () => {
      window.removeEventListener('mousemove', updateMouseCoords);
    };
  }, [shadowChartRef]);

  return { shadowChartRef, mouseCoords };
};

export default useMouseCoords;
