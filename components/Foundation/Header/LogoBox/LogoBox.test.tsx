import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStory } from '@storybook/react';
import storybook, { Desktop } from './LogoBox.stories';

describe('LogoBox', () => {
  it('Shows just the logo on mobile', () => {
    const ComposedLogoBox = composeStory(Desktop, storybook);
    const { queryAllByText, getByTitle } = render(<ComposedLogoBox />);

    // We want the logo to be in there, and to have the title Gahdzai
    const logo = getByTitle('Gahdzai');
    expect(logo).toBeInTheDocument();

    // We also want the name to show up. queryByText will also find the title text in the logo, so we have to check that we get two elements
    const name = queryAllByText('Gahdzai');
    expect(name).toHaveLength(2);
  });
});
