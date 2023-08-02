import type { Meta, StoryObj } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import mockRouter from 'next-router-mock';
import { loggedInMock, loggedOutMock } from './MemberBox/queryMocks';
import Header from './Header';

const storybook: Meta<typeof Header> = {
  component: Header,
};

export default storybook;

type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  render: () => <Header />,
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
  render: () => <Header />,
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
