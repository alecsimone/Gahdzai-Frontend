import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";
import storybook, { LoggedOut, LoggedIn } from "./Header.stories";
import waitForQuery from "@/utils/testing/waitForQuery";

describe("Header", () => {
  it("Renders the authenticating state when the query is loading", () => {
    const ComposedHeader = composeStory(LoggedOut, storybook);
    const { getByText } = render(<ComposedHeader />);

    const authenticating = getByText("Authenticating...");
    expect(authenticating).toBeInTheDocument();
  });

  it("Renders the logo box and sign up and log in links when logged out", async () => {
    const ComposedHeader = composeStory(LoggedOut, storybook);
    const { getByTitle, getByText } = render(<ComposedHeader />);

    await waitForQuery();

    const logo = getByTitle("Gahdzai");
    expect(logo).toBeInTheDocument();

    const signUp = getByText("Sign up", { exact: false });
    expect(signUp).toBeInTheDocument();

    const logIn = getByText("Log in", { exact: false });
    expect(logIn).toBeInTheDocument();
  });
});

describe("Header", () => {
  it("Renders the logo box and the displayName Test when logged in", async () => {
    const ComposedHeader = composeStory(LoggedIn, storybook);
    const { getByTitle, getByText } = render(<ComposedHeader />);

    await waitForQuery();

    const logo = getByTitle("Gahdzai");
    expect(logo).toBeInTheDocument();

    const displayName = getByText("Test");
    expect(displayName).toBeInTheDocument();
  });
});
