import { type ChartMakerInterface, type ChartProps } from '../types';
import setChartSize from '../chartShapers/setChartSize';
import setUpFont from '../gridMakers/setUpFont';
import makeChartProps from './makeChartProps';

// * Sets the basic parameters of our canvases, namely their width and height and their font properties, and then create a discriminated ChartProps, and send all of that back.
type Signature = (dataObj: ChartMakerInterface) =>
  | {
      isChartOK: false;
      ctx: undefined;
      width: undefined;
      height: undefined;
      chartProps: undefined;
    }
  | {
      isChartOK: true;
      ctx: CanvasRenderingContext2D;
      width: number;
      height: number;
      chartProps: ChartProps;
    };

const setChartBasics: Signature = (dataObj) => {
  const { chartRef, shadowChartRef } = dataObj;
  if (chartRef.current == null || shadowChartRef.current == null) {
    return { isChartOK: false };
  }
  setChartSize(chartRef.current);
  setChartSize(shadowChartRef.current);

  const ctx = chartRef.current.getContext('2d');
  if (ctx == null) return { isChartOK: false };
  setUpFont(ctx);

  const { width, height } = chartRef.current;

  const chartProps = makeChartProps(dataObj);

  return { isChartOK: true, ctx, width, height, chartProps };
};

export default setChartBasics;
