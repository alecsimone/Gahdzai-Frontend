import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";
import storybook, {
  Basic,
  DuplicateSignUp,
  ValidSignUp,
} from "./SignUp.stories";
import userEvent from "@testing-library/user-event";
import waitForQuery from "@/utils/testing/waitForQuery";
import mockRouter from "next-router-mock";

const necessaryFormFields = [
  "Display Name",
  "Email",
  "Password",
  "Confirm Password",
];

const user = userEvent.setup();

describe("SignUp", () => {
  it("renders all the necessary form fields and lets the user type in them", async () => {
    const ComposedSignUp = composeStory(Basic, storybook);
    const { getByPlaceholderText } = render(<ComposedSignUp />);

    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => getByPlaceholderText(field));

    await user.type(displayNameInput, "test string");
    await user.type(emailInput, "test string");
    await user.type(passwordInput, "test string");
    await user.type(confirmPasswordInput, "test string");

    necessaryFormFields.forEach(async (field) => {
      const input = getByPlaceholderText(field);
      expect(input).toBeInTheDocument();

      expect(input).toHaveValue("test string");
    });

    cleanup();
  });

  it("disables the submit button if all inputs are not valid and tells the user why", async () => {
    const ComposedSignUp = composeStory(Basic, storybook);
    const { getByText, getByPlaceholderText } = render(<ComposedSignUp />);

    const submitButton = getByText("Sign Up", { selector: "button" });
    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => getByPlaceholderText(field));

    await user.type(displayNameInput, "ab");
    expect(displayNameInput).toHaveValue("ab");

    const badDisplayNameWarning = getByText(
      "Display Name must be at least 3 characters long"
    );
    expect(badDisplayNameWarning).toBeInTheDocument();

    await user.type(emailInput, "ab");
    expect(emailInput).toHaveValue("ab");

    const badEmailWarning = getByText("Must be a valid email address");
    expect(badEmailWarning).toBeInTheDocument();

    await user.type(passwordInput, "ab");
    expect(passwordInput).toHaveValue("ab");

    const badPasswordWarning = getByText(
      "Password must be at least 8 characters long"
    );
    expect(badPasswordWarning).toBeInTheDocument();

    await user.type(confirmPasswordInput, "abc");
    expect(confirmPasswordInput).toHaveValue("abc");

    const badConfirmPasswordWarning = getByText("Passwords must match");
    expect(badConfirmPasswordWarning).toBeInTheDocument();

    expect(submitButton).toHaveAttribute("aria-disabled", "true");

    await user.clear(displayNameInput);
    await user.type(displayNameInput, "Alec");
    expect(badDisplayNameWarning).not.toBeInTheDocument();

    await user.clear(emailInput);
    await user.type(emailInput, "test@example.com");
    expect(badEmailWarning).not.toBeInTheDocument();

    await user.clear(passwordInput);
    await user.type(passwordInput, "123456789");
    expect(badPasswordWarning).not.toBeInTheDocument();

    await user.clear(confirmPasswordInput);
    await user.type(confirmPasswordInput, "123456789");
    expect(badConfirmPasswordWarning).not.toBeInTheDocument();

    expect(submitButton).toHaveAttribute("aria-disabled", "false");
  });

  it("creates a new member with valid inputs", async () => {
    const ComposedSignUp = composeStory(ValidSignUp, storybook);
    const { getByText, getByPlaceholderText } = render(<ComposedSignUp />);

    const submitButton = getByText("Sign Up", { selector: "button" });

    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => getByPlaceholderText(field));

    await user.type(displayNameInput, "Example Name");

    await user.type(emailInput, "test@example.com");

    await user.type(passwordInput, "123456789");

    await user.type(confirmPasswordInput, "123456789");

    await user.click(submitButton);
    await waitForQuery();

    expect(mockRouter.pathname).toBe("/verification");
  });

  it("shows an error message when sign up fails", async () => {
    const ComposedSignUp = composeStory(DuplicateSignUp, storybook);
    const { getByText, getByPlaceholderText } = render(<ComposedSignUp />);

    const submitButton = getByText("Sign Up", { selector: "button" });

    const [displayNameInput, emailInput, passwordInput, confirmPasswordInput] =
      necessaryFormFields.map((field) => getByPlaceholderText(field));

    await user.type(displayNameInput, "Example Name");

    await user.type(emailInput, "test@example.com");

    await user.type(passwordInput, "123456789");

    await user.type(confirmPasswordInput, "123456789");

    await user.click(submitButton);
    await waitForQuery();

    const error = getByText(
      "An account already exists for that email. If you've forgotten your password, please try resetting it."
    );
    expect(error).toBeInTheDocument();
  });
});
