import { gql } from '@/__generated__';

const GET_DATA_FOR_SYMBOLS_QUERY = gql(/* GraphQL */ `
  query GET_DATA_FOR_SYMBOLS_QUERY(
    $symbols: [String!]!
    $from: String!
    $to: String!
  ) {
    getDataForSymbols(symbols: $symbols, from: $from, to: $to) {
      symbol
      dataPoints {
        value
        time
      }
      unit
    }
  }
`);

export default GET_DATA_FOR_SYMBOLS_QUERY;
