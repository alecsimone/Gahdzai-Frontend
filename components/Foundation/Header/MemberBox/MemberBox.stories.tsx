import type { Meta, StoryObj } from "@storybook/react";

import MemberBox from "./MemberBox";

const storybook: Meta<typeof MemberBox> = {
  component: MemberBox,
};

export default storybook;

type Story = StoryObj<typeof MemberBox>;

export const LoggedOut: Story = {
  render: () => <MemberBox />,
};
