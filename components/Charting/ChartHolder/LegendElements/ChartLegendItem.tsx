import useChartLegendItem from './useChartLegendItem';

interface ChartLegendItemProps {
  children: React.ReactNode[];
  symbol: string;
  isComparison: boolean;
}

const ChartLegendItem = ({
  symbol,
  children,
  isComparison,
}: ChartLegendItemProps): JSX.Element => {
  const [legendItem, isHighlighted] = useChartLegendItem(symbol, isComparison);

  const className = `chartLabel${isHighlighted ? ' highlighted' : ''}`;

  return (
    <h6 className={className} key={symbol} ref={legendItem}>
      {children}
    </h6>
  );
};

export default ChartLegendItem;
