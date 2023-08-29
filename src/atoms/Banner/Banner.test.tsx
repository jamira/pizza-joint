import { render } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner component", () => {
  test("Renders title and children correctly", () => {
    const title = "Test Title";
    const children = <p>Test children</p>;

    const { getByText, getByTestId } = render(
      <Banner title={title} children={children} />
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const childrenElement = getByTestId("banner-children");
    expect(childrenElement).toBeInTheDocument();
  });
});
