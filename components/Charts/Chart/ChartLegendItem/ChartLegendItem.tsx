import { Dispatch, SetStateAction } from 'react';
import useChartLegendItem from './useChartLegendItem';

interface ChartLegendItemProps {
  children: JSX.Element[];
  symbol: string;
  highlightedSymbols: string[];
  setHighlightedSymbols: Dispatch<SetStateAction<string[]>>;
}

const ChartLegendItem = ({
  symbol,
  children,
  highlightedSymbols,
  setHighlightedSymbols,
}: ChartLegendItemProps): JSX.Element => {
  console.log(highlightedSymbols, setHighlightedSymbols);
  useChartLegendItem();
  return (
    <h6 className="chartLabel" key={symbol}>
      {children}
    </h6>
  );
};

export default ChartLegendItem;
