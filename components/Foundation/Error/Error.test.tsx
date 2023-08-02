/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStory } from '@storybook/react';
import storybook, { Basic, FromString, Blank } from './Error.stories';
import errorString from './errorString';

describe('Error', () => {
  it('renders the error message when passed an object with a message property as a prop', () => {
    const ComposedBasicError = composeStory(Basic, storybook);
    const { getByText } = render(<ComposedBasicError {...Basic.args} />);

    const error = getByText(errorString);
    expect(error).toBeInTheDocument();
  });

  it('renders the error message when passed a string as a prop', () => {
    const ComposedStringError = composeStory(FromString, storybook);
    const { getByText } = render(<ComposedStringError {...FromString.args} />);

    const error = getByText(errorString);
    expect(error).toBeInTheDocument();
  });

  it('renders nothing when not passed a string or an object with a message property', () => {
    const ComposedBlankError = composeStory(Blank, storybook);
    const { queryByText } = render(<ComposedBlankError {...Blank.args} />);

    const error = queryByText(errorString);
    expect(error).not.toBeInTheDocument();
  });
});
