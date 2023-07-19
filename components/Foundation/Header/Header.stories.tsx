import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import { MockedProvider } from "@apollo/client/testing";
import { loggedInMock, loggedOutMock } from "./MemberBox/queryMocks";

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
        <Story />
      </MockedProvider>
    ),
  ],
};

export const LoggedIn: Story = {
  render: () => <Header />,
  decorators: [
    (Story) => (
      <MockedProvider mocks={loggedInMock}>
        <Story />
      </MockedProvider>
    ),
  ],
};
