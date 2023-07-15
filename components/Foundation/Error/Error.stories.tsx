import type { Meta, StoryObj } from "@storybook/react";

import Error from "./Error";
import errorString from "./errorString";

const storybook: Meta<typeof Error> = {
  component: Error,
};

export default storybook;

type Story = StoryObj<typeof Error>;

export const Basic: Story = {
  args: {
    error: {
      message: errorString,
    },
  },
};

export const FromString: Story = {
  args: {
    error: errorString,
  },
};

export const Blank: Story = {
  args: {},
};
