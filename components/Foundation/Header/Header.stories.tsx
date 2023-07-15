import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const storybook: Meta<typeof Header> = {
  component: Header,
};

export default storybook;

type Story = StoryObj<typeof Header>;

export const Basic: Story = {
  render: () => <Header />,
};
