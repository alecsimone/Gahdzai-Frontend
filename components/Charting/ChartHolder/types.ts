export type SymbolTypes = 'stock' | 'option' | 'index' | 'bond';

export type ChartTypes = 'Comparison' | 'Individual';

interface ComparisonChartPropsInterface {
  chartType: 'Comparison';
  symbols: string[];
  symbolType: SymbolTypes;
  defaultToHeatmap: boolean;
  index: number;
}
interface IndividualChartPropsInterface {
  chartType: 'Individual';
  symbols: string;
  symbolType: SymbolTypes;
  defaultToHeatmap?: false;
  index: number;
}
export type ChartDataProps =
  | ComparisonChartPropsInterface
  | IndividualChartPropsInterface;
