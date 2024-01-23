import { useQuery, ApolloError } from '@apollo/client';
import { type Get_Index_Data_QueryQuery } from '@/__generated__/graphql';
import getQueryTimeBoundaries from '../Chart/utils/getQueryTimeBoundaries';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import getQueryResolution from '../Chart/utils/getQueryResolution';
import { type Period } from './Contexts/ChartPeriodContext';

// * Handles data fetching for the indices chart. That query takes three variables, which we also need to figure out: the start and end of the data we're requesting and the resolution of the data. These are both determined based on the period currently selected for the chart
type Signature = (period: Period) => {
  data: Get_Index_Data_QueryQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const useIndicesQuery: Signature = (period) => {
  const [previousClose, nextClose] = getQueryTimeBoundaries(period);
  const resolution = getQueryResolution(period);

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });

  return { data, loading, error };
};

export default useIndicesQuery;
