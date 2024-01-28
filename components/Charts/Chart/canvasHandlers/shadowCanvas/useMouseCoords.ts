import {
  useEffect,
  type RefObject,
  type MutableRefObject,
  useRef,
} from 'react';
import getMousePosOverCanvas, {
  type MouseCoords,
} from '../../utils/getMousePosOverCanvas';

// * Creates a ref that will contain the position of the mouse relative to the canvas, and then adds a mousemove listener that will update those coordinates as the mouse moves
type Signature = (shadowChartRef: RefObject<HTMLCanvasElement>) => {
  mouseCoords: MutableRefObject<MouseCoords>;
};

const useMouseCoords: Signature = (shadowChartRef) => {
  const mouseCoords = useRef<MouseCoords>(false);

  useEffect(() => {
    const canvas = shadowChartRef.current;
    const updateMouseCoords = (event: MouseEvent) => {
      const mousePos = getMousePosOverCanvas(canvas, event);
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
