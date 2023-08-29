import { render, fireEvent } from '@testing-library/react';
import Radio from './Radio';

describe('Radio component', () => {
  const mockOnChange = vi.fn();

  test('Renders radio with correct label', () => {
    const { getByText } = render(
      <Radio label="Option 1" checked={false} value="option1" onChange={mockOnChange} />
    );
    const radioLabel = getByText('Option 1');
    expect(radioLabel).toBeInTheDocument();
  });

  test('Renders checked radio when checked is true', () => {
    const { container } = render(
      <Radio label="Option 2" checked={true} value="option2" onChange={mockOnChange} />
    );
    const radioInput = container.querySelector('input');
    expect(radioInput).toBeChecked();
  });

  test('Calls onChange with correct value when radio label is clicked', () => {
    const { getByText } = render(
      <Radio label="Option 3" checked={false} value="option3" onChange={mockOnChange} />
    );

    const radioLabel = getByText('Option 3');
    fireEvent.click(radioLabel);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });

  test('Passes className prop to the radio element', () => {
    const { container } = render(
      <Radio label="Option 4" checked={false} value="option4" onChange={mockOnChange} className="my-radio" />
    );
    const radioLabel = container.querySelector('.my-radio');
    expect(radioLabel).toBeInTheDocument();
  });
});
