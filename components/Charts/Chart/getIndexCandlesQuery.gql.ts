import { gql } from '@/__generated__';

const GET_INDEX_CANDLES_QUERY = gql(/* GraphQL */ `
  query GET_INDEX_CANDLES_QUERY(
    $from: String!
    $to: String!
    $resolution: String!
  ) {
    getAllIndexCandles(from: $from, to: $to, resolution: $resolution) {
      symbol
      candles {
        open
        close
        high
        low
        volume
        time
      }
    }
  }
`);

export default GET_INDEX_CANDLES_QUERY;
