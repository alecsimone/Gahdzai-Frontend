import { useQuery, ApolloError } from '@apollo/client';

import {
  Timespan,
  type Get_Candles_For_Symbols_QueryQuery,
} from '@/__generated__/graphql';
import type { SymbolTypes } from '../../types';
import GET_CANDLES_FOR_SYMBOLS_QUERY from './getCandlesForSymbolsQuery.gql';

// * Runs a query to get candles for any kind of market data
type Signature = (dataObj: {
  symbols: string | string[];
  symbolType: SymbolTypes;
  from: string;
  to: string;
  timespan: Timespan;
  timespanMultiplier: number;
}) => {
  data: Get_Candles_For_Symbols_QueryQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const useMarketQuery: Signature = ({
  symbols,
  symbolType,
  from,
  to,
  timespan,
  timespanMultiplier,
}) => {
  const { data, loading, error } = useQuery(GET_CANDLES_FOR_SYMBOLS_QUERY, {
    variables: {
      symbols: Array.isArray(symbols) ? symbols : [symbols],
      symbolType,
      from,
      to,
      timespan,
      timespanMultiplier,
    },
  });

  return {
    data,
    loading,
    error,
  };
};

export default useMarketQuery;
