import getLineColor from '../../Charts/ChartMakers/PercentageChange/getLineColor';

interface SymbolElementProps {
  symbol: string;
  lineIndex: number;
}

const SymbolElement = ({
  symbol,
  lineIndex,
}: SymbolElementProps): JSX.Element => {
  const color = getLineColor({ symbol, lineIndex });

  return (
    <span className="symbol" style={{ color, fontWeight: 'bold' }} key={symbol}>
      {symbol}
    </span>
  );
};

export default SymbolElement;
