import type { Meta, StoryObj } from "@storybook/react";

import MemberBox from "./MemberBox";
import { MockedProvider } from "@apollo/client/testing";
import { loggedInMock, loggedOutMock } from "./queryMocks";

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
        <Story />
      </MockedProvider>
    ),
  ],
};

export const LoggedIn: Story = {
  render: () => <MemberBox />,
  decorators: [
    (Story) => (
      <MockedProvider mocks={loggedInMock}>
        <Story />
      </MockedProvider>
    ),
  ],
};
