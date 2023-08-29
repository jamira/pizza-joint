import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox component", () => {
  const onChangeMock = vi.fn();
  test("Checkbox component renders with the provided label", () => {
    const { getByLabelText } = render(
      <Checkbox label="Check me" onChange={onChangeMock} />
    );
    const checkboxLabel = getByLabelText(/Check me/i);
    expect(checkboxLabel).toBeInTheDocument();
  });

  test("Checkbox toggles its state when clicked", () => {
    test("Triggers onChange when clicked", () => {
      const { getByLabelText } = render(
        <Checkbox label="Check me" checked={false} onChange={onChangeMock} />
      );

      const checkbox = getByLabelText(/Check me/i);

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
      expect(onChangeMock).toHaveBeenCalledWith(true);

      fireEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
      expect(onChangeMock).toHaveBeenCalledWith(false);
    });
  });
});
