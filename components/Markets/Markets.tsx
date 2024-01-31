import ChartHolder from '../Charting/ChartHolder/ChartHolder';
import StyledMarketsPage from './StyledMarketsPage';

// * Our markets page, home of the God's Eye Dashboard, designed to help keep an eye on all the world's markets as easily as possible.
// interface MarketsProps {};

// const indicesSymbols = ['SPX', 'COMP', 'DJI', 'RUT'];
const indicesSymbols = ['SPX'];

const Markets = (): React.ReactNode => (
  <StyledMarketsPage>
    <ChartHolder
      chartType="Comparison"
      symbols={indicesSymbols}
      symbolType="index"
    />
    <ChartHolder chartType="Individual" symbols="SPY" symbolType="stock" />
  </StyledMarketsPage>
);

export default Markets;
