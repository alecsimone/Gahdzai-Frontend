import { useEffect, type RefObject, useState } from 'react';
import getMousePosOverCanvas, {
  type MouseCoords,
} from './getMousePosOverCanvas';

// * Creates a ref that will contain the position of the mouse relative to the canvas, and then adds a mousemove listener that will update those coordinates as the mouse moves
type Signature = (shadowChartRef: RefObject<HTMLCanvasElement>) => {
  mouseCoords: MouseCoords;
};

const useMouseCoords: Signature = (shadowChartRef) => {
  // const mouseCoords = useRef<MouseCoords>(false);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>(false);

  useEffect(() => {
    const shadowChart = shadowChartRef.current;
    const updateMouseCoords = (event: MouseEvent) => {
      const mousePos = getMousePosOverCanvas(shadowChart, event);
      setMouseCoords(mousePos);
    };

    window.addEventListener('mousemove', updateMouseCoords);

    return () => {
      window.removeEventListener('mousemove', updateMouseCoords);
    };
  }, [shadowChartRef]);

  return { mouseCoords };
};

export default useMouseCoords;
