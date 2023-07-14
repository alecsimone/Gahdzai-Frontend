import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";
import meta, { Primary } from "./Header.stories";

describe("Header", () => {
  it("Says Header", () => {
    const ComposedHeader = composeStory(Primary, meta);
    const { getByText } = render(<ComposedHeader />);

    const headerText = getByText("Header");
    expect(headerText).toBeInTheDocument();
  });
});
