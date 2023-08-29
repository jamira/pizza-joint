import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import Button from "./Button";
import styles from "./Button.module.scss";

describe("Button component", () => {
  test("Button component renders correctly", () => {
    const { getByText } = render(<Button label="Click me" variant="primary" />);
    const buttonElement = getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("Button onClick event is triggered", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button label="Click me" onClick={handleClick} variant="primary" />
    );
    const buttonElement = getByText("Click me");

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Button is disabled when disabled prop is true", () => {
    const { getByText } = render(
      <Button label="Click me" variant="primary" disabled={true} />
    );
    
    const buttonTextSpan = getByText('Click me');
    const button = buttonTextSpan.closest('button');

    expect(button).toBeDisabled();
    expect(buttonTextSpan).toContainHTML(`<span class="${styles.button__name}">Click me</span>`);
  });

  test("Button is not disabled when disabled prop is false", () => {
    const { getByText } = render(
      <Button label="Click me" variant="primary" disabled={false} />
    );
    const button = getByText("Click me");
    expect(button).not.toBeDisabled();
  });

  test('Button variant is set correctly to "primary"', () => {
    const { getByText } = render(<Button label="Click me" variant="primary" />);
    const buttonTextSpan = getByText('Click me');
    const button = buttonTextSpan.closest('button');

    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles["button--primary"]);
  });

  test("Renders a button with label when isIcon is false", () => {
    const { getByText, queryByTestId } = render(
      <Button label="Click me" variant="primary" />
    );
    const buttonLabel = getByText("Click me");
    const iconElement = queryByTestId("icon");

    expect(buttonLabel).toBeInTheDocument();
    expect(iconElement).not.toBeInTheDocument();
  });

  test("Renders an icon button when isIcon is true", () => {
    const { getByText } = render(
      <Button label="Click me" isIcon variant="primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.47222 0L9.36113 0.888875H12.4722V2.66667H0.0278015V0.888875H3.13888L4.0278 0H8.47222ZM2.69447 16C1.71222 16 0.916677 15.2045 0.916677 14.2222V3.55554H11.5833V14.2222C11.5833 15.2045 10.7878 16 9.80559 16H2.69447Z"
            fill="#888EB0"
          />
        </svg>
      </Button>
    );

    const buttonLabel = getByText("Click me");
    expect(buttonLabel).not.toBeInvalid();
  });
});
