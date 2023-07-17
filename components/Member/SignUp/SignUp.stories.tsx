import type { Meta, StoryObj } from "@storybook/react";

import SignUp from "./SignUp";
import { MockedProvider } from "@apollo/client/testing";
import { userEvent, within } from "@storybook/testing-library";
import { duplicateSignUpMock, validSignUpMock } from "./mutationMocks";
import { RouterContext } from "next/dist/shared/lib/router-context";
import mockRouter from "next-router-mock";

const storybook: Meta<typeof SignUp> = {
  component: SignUp,
  args: {
    closeModal: () => console.log("closin that modal, boss!"),
  },
  decorators: [
    (Story) => (
      <MockedProvider>
        <RouterContext.Provider value={mockRouter}>
          <Story />
        </RouterContext.Provider>
      </MockedProvider>
    ),
  ],
};

export default storybook;

type Story = StoryObj<typeof SignUp>;

const necessaryFormFields = [
  "Display Name",
  "Email",
  "Password",
  "Confirm Password",
];

export const Basic: Story = {};

export const WithValidInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => canvas.getByPlaceholderText(field));

    await userEvent.type(displayNameInput, "Example Name");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123456789");
    await userEvent.type(confirmPasswordInput, "123456789");

    confirmPasswordInput.blur();
  },
};

export const WithInValidInputs: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => canvas.getByPlaceholderText(field));

    await userEvent.type(displayNameInput, "Ab");
    await userEvent.type(emailInput, "invalid");
    await userEvent.type(passwordInput, "1234");
    await userEvent.type(confirmPasswordInput, "123");

    confirmPasswordInput.blur();
  },
};

export const ValidSignUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => canvas.getByPlaceholderText(field));

    await userEvent.type(displayNameInput, "Example Name");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123456789");
    await userEvent.type(confirmPasswordInput, "123456789");

    confirmPasswordInput.blur();
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MockedProvider mocks={validSignUpMock}>
          <RouterContext.Provider value={mockRouter}>
            <Story />
          </RouterContext.Provider>
        </MockedProvider>
      </div>
    ),
  ],
};

export const DuplicateSignUp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // We want to map over our necessary form fields and use getByPlaceholderText to grab the inputs for each of them and put them in a variable
    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => canvas.getByPlaceholderText(field));

    await userEvent.type(displayNameInput, "Example Name");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "123456789");
    await userEvent.type(confirmPasswordInput, "123456789");

    confirmPasswordInput.blur();
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MockedProvider mocks={duplicateSignUpMock}>
          <RouterContext.Provider value={mockRouter}>
            <Story />
          </RouterContext.Provider>
        </MockedProvider>
      </div>
    ),
  ],
};
