import { type Dispatch, type SetStateAction, createContext } from 'react';

export const periods = ['D', 'W', 'M', '6M', 'Y', 'Max'] as const;
export type Period = (typeof periods)[number];

export const defaultPeriod: Period = 'D';

export interface PeriodContextDataInterface {
  activePeriod: Period;
  setActivePeriod: Dispatch<SetStateAction<Period>>;
}

const defaultPeriodContextData: PeriodContextDataInterface = {
  activePeriod: defaultPeriod,
  setActivePeriod: () => {},
};
export const PeriodContext = createContext<PeriodContextDataInterface>(
  defaultPeriodContextData
);
