import { useQuery, ApolloError } from '@apollo/client';

import {
  Timespan,
  type Get_Candles_For_Symbols_QueryQuery,
  type Get_Data_For_Symbols_QueryQuery,
} from '@/__generated__/graphql';
import type { SymbolTypes } from '../../types';
import GET_CANDLES_FOR_SYMBOLS_QUERY from './getCandlesForSymbolsQuery.gql';
import GET_DATA_FOR_SYMBOLS_QUERY from './getDataForSymbolsQuery.gql';

// * Runs a query to get candles for any kind of market data
type Signature = (dataObj: {
  symbols: string | string[];
  symbolType: SymbolTypes;
  from: string;
  to: string;
  timespan: Timespan;
  timespanMultiplier: number;
}) => {
  data:
    | Get_Candles_For_Symbols_QueryQuery
    | Get_Data_For_Symbols_QueryQuery
    | undefined;
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
  const {
    data: candleData,
    loading: candleLoading,
    error: candleError,
  } = useQuery(GET_CANDLES_FOR_SYMBOLS_QUERY, {
    variables: {
      symbols: Array.isArray(symbols) ? symbols : [symbols],
      symbolType,
      from,
      to,
      timespan,
      timespanMultiplier,
    },
    skip: symbolType === 'bond',
  });

  const {
    data: dataData,
    loading: dataLoading,
    error: dataError,
  } = useQuery(GET_DATA_FOR_SYMBOLS_QUERY, {
    variables: {
      symbols: Array.isArray(symbols) ? symbols : [symbols],
      from,
      to,
    },
    skip: symbolType !== 'bond',
  });

  if (symbolType === 'bond') {
    return {
      data: dataData,
      loading: dataLoading,
      error: dataError,
    };
  }

  return {
    data: candleData,
    loading: candleLoading,
    error: candleError,
  };
};

export default useMarketQuery;
