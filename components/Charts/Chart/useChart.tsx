import { useEffect, useRef } from 'react';
import getOneRem from '@/styles/functions/getOneRem';
import { coolGrey } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const useChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current == null) return;

    const parent = chartRef.current.parentElement;
    if (parent != null) {
      const oneRem = getOneRem();
      chartRef.current.width = parent.clientWidth - 4 * oneRem;
      chartRef.current.height = parent.clientHeight - 4 * oneRem;
    }

    const ctx = chartRef.current.getContext('2d');
    if (ctx == null) return;

    const { width, height } = chartRef.current;

    ctx.strokeStyle = setAlpha(coolGrey, 0.8);
    for (let i = 1; i < 10; i += 1) {
      ctx.beginPath();
      const thisLineY = (height * i) / 10;
      ctx.moveTo(0, thisLineY);
      ctx.lineTo(width, thisLineY);
      ctx.stroke();
    }

    ctx.strokeStyle = setAlpha(coolGrey, 0.4);
    for (let i = 1; i < 10; i += 1) {
      ctx.beginPath();
      const thisLineX = (width * i) / 10;
      ctx.moveTo(thisLineX, 0);
      ctx.lineTo(thisLineX, height);
      ctx.stroke();
    }
  }, []);

  return chartRef;
};

export default useChart;
