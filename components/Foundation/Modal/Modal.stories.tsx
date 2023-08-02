/* eslint-disable react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';

const storybook: Meta<typeof Modal> = {
  component: Modal,
  args: {
    children: <div>The Modal Component</div>,
  },
};

export default storybook;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: (args) => {
    const { children } = args;

    return <Modal {...args}>{children}</Modal>;
  },
};
