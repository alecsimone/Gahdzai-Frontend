import ChartHolder from '../Charting/ChartHolder/ChartHolder';
import StyledMarketsPage from './StyledMarketsPage';

// * Our markets page, home of the God's Eye Dashboard, designed to help keep an eye on all the world's markets as easily as possible.
// interface MarketsProps {};

const Markets = (): React.ReactNode => (
  <StyledMarketsPage>
    <ChartHolder
      chartType="Comparison"
      symbols={['SPX', 'COMP', 'DJI', 'RUT']}
      symbolType="index"
    />
    <ChartHolder chartType="Individual" symbols="SPY" symbolType="stock" />
  </StyledMarketsPage>
);

export default Markets;
