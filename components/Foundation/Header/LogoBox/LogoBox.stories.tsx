import type { Meta, StoryObj } from "@storybook/react";
// import viewports from "@/.storybook/viewports";

import LogoBox from "./LogoBox";

const storybook: Meta<typeof LogoBox> = {
  component: LogoBox,
};

export default storybook;

type Story = StoryObj<typeof LogoBox>;

export const Mobile: Story = {
  render: () => <LogoBox />,
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

export const Desktop: Story = {
  render: () => <LogoBox />,
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
