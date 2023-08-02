import type { Meta, StoryObj } from '@storybook/react';

import { MockedProvider } from '@apollo/client/testing';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import mockRouter from 'next-router-mock';
import { loggedInMock, loggedOutMock } from './queryMocks';
import MemberBox from './MemberBox';

const storybook: Meta<typeof MemberBox> = {
  component: MemberBox,
};

export default storybook;

type Story = StoryObj<typeof MemberBox>;

export const LoggedOut: Story = {
  render: () => <MemberBox />,
  decorators: [
    (Story) => (
      <MockedProvider mocks={loggedOutMock}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </MockedProvider>
    ),
  ],
};

export const LoggedIn: Story = {
  render: () => <MemberBox />,
  decorators: [
    (Story) => (
      <MockedProvider mocks={loggedInMock}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </MockedProvider>
    ),
  ],
};
