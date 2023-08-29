import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import CartItem from "./CartItem";
import { formatCurrency } from "../../helpers/currency";

const mockCartItem = {
  id: 1,
  name: "Vegetaria",
  size: "Small",
  toppings: [
    {
      "name": "Tomato Sauce",
      "price": 0
    },
    {
      "name": "Mozzarella Cheese",
      "price": 0
    },
    {
      "name": "Mushrooms",
      "price": 0
    },
    {
      "name": "Bell Peppers",
      "price": 0
    },
    {
      "name": "Red Onions",
      "price": 0
    },
    {
      "name": "Black Olives",
      "price": 0
    }
  ],
  qty: 2,
  price: 15.99,
};

describe("CartItem Component", () => {
  test("CartItem component renders with correct details and shows details on click", () => {
    const { getByText, queryByText } = render(
      <CartItem cart={mockCartItem} />
    );
    
    const formattedPrice = formatCurrency(mockCartItem.price, "HKD")

    const itemName = getByText(mockCartItem.name);
    const itemQty = getByText(`${mockCartItem.qty}x`);
    const itemPrice = getByText(formattedPrice);
    const showDetailsLink = getByText("Show Details");

    expect(itemName).toBeInTheDocument();
    expect(itemQty).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
    expect(showDetailsLink).toBeInTheDocument();

    fireEvent.click(showDetailsLink);

    mockCartItem.toppings.forEach(topping => {
      const toppingElement = queryByText(topping.name);
      expect(toppingElement).toBeInTheDocument();
    });

    const sizeElement = getByText(`${mockCartItem.size}`);
    expect(sizeElement).toBeInTheDocument();
  });

  test("CartItem component invokes onRemove callback when Remove button is clicked", () => {
    const mockOnRemove = vi.fn();
    const { getByText } = render(
      <CartItem cart={mockCartItem} onRemove={mockOnRemove} />
    );

    const removeButton = getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalled();
  });
});
