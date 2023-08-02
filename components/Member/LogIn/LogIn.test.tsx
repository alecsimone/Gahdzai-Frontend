import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStory } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import storybook, { Basic } from './LogIn.stories';

const necessaryFormFields = ['Email', 'Password'];

const user = userEvent.setup();

describe('LogIn', () => {
  it('renders all the necessary form fields and lets the user type in them', async () => {
    const ComposedLogIn = composeStory(Basic, storybook);
    const { getByPlaceholderText } = render(<ComposedLogIn />);

    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      getByPlaceholderText(field)
    );

    await user.type(emailInput, 'test string');
    await user.type(passwordInput, 'test string');

    necessaryFormFields.forEach(async (field) => {
      const input = getByPlaceholderText(field);
      expect(input).toBeInTheDocument();

      expect(input).toHaveValue('test string');
    });

    cleanup();
  });

  it('disables the submit button if all inputs are not valid and tells the user why', async () => {
    const ComposedLogIn = composeStory(Basic, storybook);
    const { getByText, getByPlaceholderText } = render(<ComposedLogIn />);

    const submitButton = getByText('Log In', { selector: 'button' });
    expect(submitButton).toHaveAttribute('aria-disabled', 'true');

    const [emailInput, passwordInput] = necessaryFormFields.map((field) =>
      getByPlaceholderText(field)
    );

    await user.type(emailInput, 'ab');
    expect(emailInput).toHaveValue('ab');

    const badEmailWarning = getByText('Must be a valid email address');
    expect(badEmailWarning).toBeInTheDocument();

    await user.type(passwordInput, 'ab');
    expect(passwordInput).toHaveValue('ab');

    const badPasswordWarning = getByText(
      'Password must be at least 8 characters long'
    );
    expect(badPasswordWarning).toBeInTheDocument();

    expect(submitButton).toHaveAttribute('aria-disabled', 'true');

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    expect(badEmailWarning).not.toBeInTheDocument();

    await user.clear(passwordInput);
    await user.type(passwordInput, '123456789');
    expect(badPasswordWarning).not.toBeInTheDocument();

    expect(submitButton).toHaveAttribute('aria-disabled', 'false');
  });
});
