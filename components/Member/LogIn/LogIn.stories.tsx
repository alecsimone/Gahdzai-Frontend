/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';

import { MockedProvider } from '@apollo/client/testing';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import mockRouter from 'next-router-mock';
import { within, userEvent } from '@storybook/testing-library';
import LogIn from './LogIn';
import { invalidLogInMock, validLogInMock } from './mutationMocks';

const storybook: Meta<typeof LogIn> = {
  component: LogIn,
  args: {
    closeModal: () => console.log('closin that modal, boss!'),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MockedProvider>
          <RouterContext.Provider value={mockRouter}>
            <Story />
          </RouterContext.Provider>
        </MockedProvider>
      </div>
    ),
  ],
};

export default storybook;

type Story = StoryObj<typeof LogIn>;

const necessaryFormFields = ['Email', 'Password'];

export const Basic: Story = {};

export const WithValidInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      canvas.getByPlaceholderText(field)
    );

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123456789');

    passwordInput.blur();
  },
};

export const WithInValidInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      canvas.getByPlaceholderText(field)
    );

    await userEvent.type(emailInput, 'invalid');
    await userEvent.type(passwordInput, '123');

    passwordInput.blur();
  },
};

export const ValidLogIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      canvas.getByPlaceholderText(field)
    );

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123456789');

    passwordInput.blur();
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={validLogInMock}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </MockedProvider>
    ),
  ],
};

export const InValidLogIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      canvas.getByPlaceholderText(field)
    );

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '123456789');

    passwordInput.blur();
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={invalidLogInMock}>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </MockedProvider>
    ),
  ],
};
