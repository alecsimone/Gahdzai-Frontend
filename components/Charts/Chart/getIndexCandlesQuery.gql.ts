import { gql } from '@/__generated__';

const GET_INDEX_DATA_QUERY = gql(/* GraphQL */ `
  query GET_INDEX_DATA_QUERY(
    $from: String!
    $to: String!
    $resolution: String!
  ) {
    getAllIndexData(from: $from, to: $to, resolution: $resolution) {
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

export default GET_INDEX_DATA_QUERY;
