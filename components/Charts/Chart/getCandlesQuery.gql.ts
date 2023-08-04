import { gql } from '@/__generated__';

const GET_CANDLES_QUERY = gql(/* GraphQL */ `
  query GET_CANDLES_QUERY(
    $symbol: String!
    $from: String!
    $to: String!
    $resolution: String!
  ) {
    getCandles(symbol: $symbol, from: $from, to: $to, resolution: $resolution) {
      open
      close
      high
      low
      volume
      time
    }
  }
`);

export default GET_CANDLES_QUERY;
