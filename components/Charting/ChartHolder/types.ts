export type SymbolTypes = 'stock' | 'option' | 'index';

interface ComparisonChartPropsInterface {
  chartType: 'Comparison';
  symbols: string[];
  symbolType: SymbolTypes;
}
interface IndividualChartPropsInterface {
  chartType: 'Individual';
  symbols: string;
  symbolType: SymbolTypes;
}
export type ChartDataProps =
  | ComparisonChartPropsInterface
  | IndividualChartPropsInterface;
