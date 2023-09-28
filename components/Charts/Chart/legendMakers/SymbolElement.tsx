import getLineColor from '../utils/getLineColor';

interface SymbolElementProps {
  symbol: string;
  index: number;
}

const SymbolElement = ({ symbol, index }: SymbolElementProps): JSX.Element => {
  const color = getLineColor(symbol, index);

  return (
    <span className="symbol" style={{ color, fontWeight: 'bold' }} key={symbol}>
      {symbol}
    </span>
  );
};

export default SymbolElement;
