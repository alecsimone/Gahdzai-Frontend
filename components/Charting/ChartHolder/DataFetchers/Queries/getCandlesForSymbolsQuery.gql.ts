import { gql } from '@/__generated__';

const GET_CANDLES_FOR_SYMBOLS_QUERY = gql(/* GraphQL */ `
  query GET_CANDLES_FOR_SYMBOLS_QUERY(
    $symbols: [String!]!
    $symbolType: String!
    $from: String!
    $to: String!
    $timespan: Timespan!
    $timespanMultiplier: Int!
  ) {
    getCandlesForSymbols(
      symbols: $symbols
      symbolType: $symbolType
      from: $from
      to: $to
      timespan: $timespan
      timespanMultiplier: $timespanMultiplier
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

export default GET_CANDLES_FOR_SYMBOLS_QUERY;
