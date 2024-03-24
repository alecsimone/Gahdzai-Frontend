import ChartHolder from '../Charting/ChartHolder/ChartHolder';
import StyledMarketsPage from './StyledMarketsPage';

// * Our markets page, home of the God's Eye Dashboard, designed to help keep an eye on all the world's markets as easily as possible.
// interface MarketsProps {};

// const indicesSymbols = ['SPX', 'COMP', 'DJI', 'RUT'];
const indicesSymbols = ['SPX'];

const sectorSymbols = [
  'XLC',
  'XLY',
  'XLP',
  'XLE',
  'XLF',
  'XLV',
  'XLI',
  'XLB',
  'XLRE',
  'XLK',
  'XLU',
  'SPY',
];

const Markets = (): React.ReactNode => (
  <StyledMarketsPage>
    <ChartHolder
      chartType="Comparison"
      symbols={indicesSymbols}
      symbolType="index"
      defaultToHeatmap={false}
      index={1}
    />
    <ChartHolder
      chartType="Comparison"
      symbols={sectorSymbols}
      symbolType="stock"
      defaultToHeatmap
      index={2}
    />
    <ChartHolder
      chartType="Comparison"
      symbols={[
        'DGS3MO',
        'DGS1',
        'DGS2',
        'DGS10',
        'DGS30',
        'BAMLC0A1CAAAEY',
        'BAMLH0A0HYM2EY',
      ]}
      symbolType="bond"
      defaultToHeatmap={false}
      index={3}
    />
    {/* <ChartHolder chartType="Individual" symbols="SPY" symbolType="stock" /> */}
  </StyledMarketsPage>
);

export default Markets;
