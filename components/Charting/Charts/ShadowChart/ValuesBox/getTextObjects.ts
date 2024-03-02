import makeNumberReadable from '@/utils/makeNumberReadable';
import type { CoordinatedDataPoint } from '../../types';

// * Creates the text objects we will need to render our values box from our coordinatedDataPoints
type Signature = (
  coordinatedDatapoints: CoordinatedDataPoint[]
) => ValuesTextObject;

export interface ComparisonTextObject {
  symbol: string;
  value: string;
}
interface ComparisonTextObjects {
  type: 'Comparison';
  textObjects: ComparisonTextObject[];
}

export interface CandleTextObject {
  open: string;
  close: string;
  high: string;
  low: string;
}
interface CandleTextObjects {
  type: 'Individual';
  textObjects: CandleTextObject;
}

export type ValuesTextObject = ComparisonTextObjects | CandleTextObjects;

const getTextObjects: Signature = (coordinatedDataPoints) => {
  let valuesTextObject: ValuesTextObject;
  const textObjects: ComparisonTextObject[] = [];
  coordinatedDataPoints.forEach((point) => {
    if ('change' in point.data) {
      const symbolText = `${point.symbol}:`;
      const valueText = `${makeNumberReadable(point.data.change)}%`;
      textObjects.push({
        symbol: symbolText,
        value: `${point.data.change > 0 ? '+' : ''}${valueText}`,
      });
      valuesTextObject = {
        type: 'Comparison',
        textObjects,
      };
    } else {
      const { open, close, high, low } = point.data;
      const candleTextObject: CandleTextObject = {
        open: makeNumberReadable(open),
        close: makeNumberReadable(close),
        high: makeNumberReadable(high),
        low: makeNumberReadable(low),
      };
      valuesTextObject = {
        type: 'Individual',
        textObjects: candleTextObject,
      };
    }
  });

  return valuesTextObject!;
};

export default getTextObjects;
