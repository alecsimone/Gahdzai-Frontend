/* eslint-disable react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/react';
import PeriodButtons from './PeriodButtons';
import { PeriodContext } from './ChartPeriodContextTypes';

const storybook: Meta<typeof PeriodButtons> = {
  component: PeriodButtons,
};

export default storybook;

type Story = StoryObj<typeof PeriodButtons>;

export const Basic: Story = {
  render: () => <PeriodButtons />,
};

export const WeekPeriod: Story = {
  render: () => <PeriodButtons />,
  decorators: [
    (Story) => (
      <PeriodContext.Provider
        value={{
          activePeriod: 'W',
          setActivePeriod: () => {},
        }}
      >
        <Story />
      </PeriodContext.Provider>
    ),
  ],
};
