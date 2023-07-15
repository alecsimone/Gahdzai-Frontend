import type { Meta, StoryObj } from "@storybook/react";

import SignUp from "./SignUp";
import { MockedProvider } from "@apollo/client/testing";

const storybook: Meta<typeof SignUp> = {
  component: SignUp,
  args: {
    closeModal: () => console.log("closin that modal, boss!"),
  },
};

export default storybook;

type Story = StoryObj<typeof SignUp>;

export const Basic: Story = {
  decorators: [
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
};
