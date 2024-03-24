import { ApolloError } from '@apollo/client';
import type {
  Get_Candles_For_Symbols_QueryQuery,
  Get_Data_For_Symbols_QueryQuery,
} from '@/__generated__/graphql';
import type { ChartDataProps } from '../types';
import type { Period } from '../PeriodButtons/ChartPeriodContextTypes';
import getQueryTimeBoundaries from './TimeHandlers/getQueryTimeBoundaries';
import getQueryResolution from './TimeHandlers/getQueryResolution';
import useMarketQuery from './Queries/useMarketQuery';

// * Determines which query to run based on the data requested
type Signature = (
  dataObj: ChartDataProps,
  period: Period
) => {
  data:
    | Get_Candles_For_Symbols_QueryQuery
    | Get_Data_For_Symbols_QueryQuery
    | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const useQueryBuilder: Signature = ({ symbolType, symbols }, period) => {
  const [previousClose, nextClose] = getQueryTimeBoundaries(period);
  const { timespan, timespanMultiplier } = getQueryResolution(period);

  const queryResult = useMarketQuery({
    symbols,
    symbolType,
    from: `${previousClose}`,
    to: `${nextClose}`,
    timespan,
    timespanMultiplier,
  });

  return queryResult;
};

export default useQueryBuilder;
