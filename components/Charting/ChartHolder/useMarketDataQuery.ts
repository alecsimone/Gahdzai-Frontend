import { ApolloError } from '@apollo/client';
import { type Get_Index_Data_QueryQuery } from '@/__generated__/graphql';
import type { ChartDataProps } from './types';

// * Queries our backend for various kinds of market data
type Signature = (props: ChartDataProps) => {
  data: Get_Index_Data_QueryQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const useMarketDataQuery: Signature = () => {};

export default useMarketDataQuery;
