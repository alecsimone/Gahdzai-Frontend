import { useEffect, RefObject, MutableRefObject, useRef } from 'react';
import getMousePosOverCanvas, {
  MouseCoords,
} from './utils/getMousePosOverCanvas';

const useMouseCoords = (
  shadowChartRef: RefObject<HTMLCanvasElement>
): {
  mouseCoords: MutableRefObject<MouseCoords>;
} => {
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

  return { mouseCoords };
};

export default useMouseCoords;
