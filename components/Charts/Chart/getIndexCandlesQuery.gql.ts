import { gql } from '@/__generated__';

const GET_INDEX_DATA_QUERY_OLD = gql(/* GraphQL */ `
  query GET_INDEX_DATA_QUERY_OLD(
    $symbols: [String!]!
    $from: String!
    $to: String!
    $resolution: String!
  ) {
    getIndexData(
      symbols: $symbols
      from: $from
      to: $to
      resolution: $resolution
    ) {
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

export default GET_INDEX_DATA_QUERY_OLD;
