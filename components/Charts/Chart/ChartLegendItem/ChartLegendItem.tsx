import useChartLegendItem from './useChartLegendItem';

interface ChartLegendItemProps {
  children: JSX.Element[];
  symbol: string;
}

const ChartLegendItem = ({
  symbol,
  children,
}: ChartLegendItemProps): JSX.Element => {
  const [legendItem, isHighlighted] = useChartLegendItem(symbol);

  const className = `chartLabel${isHighlighted ? ' highlighted' : ''}`;

  return (
    <h6 className={className} key={symbol} ref={legendItem}>
      {children}
    </h6>
  );
};

export default ChartLegendItem;
