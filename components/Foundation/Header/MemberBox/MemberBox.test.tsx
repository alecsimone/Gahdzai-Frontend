import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { composeStory } from '@storybook/react';
import waitForQuery from '@/utils/testing/waitForQuery';
import storybook, { LoggedOut, LoggedIn } from './MemberBox.stories';

describe('MemberBox', () => {
  it('Renders the authenticating state when the query is loading', async () => {
    const ComposedMemberBox = composeStory(LoggedOut, storybook);
    const { getByText } = render(<ComposedMemberBox />);

    const authenticating = getByText('Authenticating...');
    expect(authenticating).toBeInTheDocument();
  });

  it('Renders sign up and log in links when logged out', async () => {
    const ComposedMemberBox = composeStory(LoggedOut, storybook);
    const { getByText } = render(<ComposedMemberBox />);

    await waitForQuery();

    const signUp = getByText('Sign up');
    expect(signUp).toBeInTheDocument();
  });

  it("Renders the displayName 'Test' and a log out button when logged in", async () => {
    const ComposedMemberBox = composeStory(LoggedIn, storybook);
    const { getByText } = render(<ComposedMemberBox />);

    await waitForQuery();

    const displayName = getByText('Test');
    expect(displayName).toBeInTheDocument();

    const logOut = getByText('(Log out)');
    expect(logOut).toBeInTheDocument();
  });
});
