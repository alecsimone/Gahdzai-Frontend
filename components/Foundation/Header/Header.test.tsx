import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";
import storybook, { Basic } from "./Header.stories";

describe("Header", () => {
  it("TestDescription", () => {
    const ComposedHeader = composeStory(Basic, storybook);
    const { getByTitle, getByText } = render(<ComposedHeader />);

    const logo = getByTitle("Gahdzai");
    expect(logo).toBeInTheDocument();

    const signUp = getByText("Sign Up", { exact: false });
    expect(signUp).toBeInTheDocument();

    const logIn = getByText("Log In", { exact: false });
    expect(logIn).toBeInTheDocument();
  });
});
