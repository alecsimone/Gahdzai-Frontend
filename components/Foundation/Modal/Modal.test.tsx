import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { composeStory } from '@storybook/react';
import storybook, { Basic } from './Modal.stories';

const modalText = 'The Modal Component';
describe('Modal', () => {
  const close = jest.fn(() => {});
  const user = userEvent.setup();

  it('exists and calls close with the button', async () => {
    const ComposedModal = composeStory(Basic, storybook);
    const { getByText, getByTitle } = render(<ComposedModal close={close} />);

    const modal = getByText(modalText);
    expect(modal).toBeInTheDocument();

    const closeButton = getByTitle('Close');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(close).toBeCalledTimes(1);

    const icon = closeButton.closest('svg');
    icon?.focus();

    await user.keyboard('{Enter}');
    expect(close).toBeCalledTimes(2);

    await user.keyboard(' ');
    expect(close).toBeCalledTimes(3);
  });

  it('exists and calls close with the escape key', async () => {
    const ComposedModal = composeStory(Basic, storybook);
    const { getByText } = render(<ComposedModal close={close} />);

    const modal = getByText(modalText);
    expect(modal).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(close).toBeCalledTimes(4);
  });
});
