import { render } from "@testing-library/react";
import PizzaCard from "./PizzaCard";
import { formatCurrency } from "../../helpers/currency";
const mockPizza = {
  id: 1,
  name: "Margherita",
  ingredients: [
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
  price: 10.99,
};

const mockButtonText = "Choose";
const mockButtonClickHandler = vi.fn();
const formattedPrice = formatCurrency(mockPizza.price, "HKD");

describe("Pizzard Component", () => {
  test("PizzaCard component renders with correct pizza details", () => {
    const { getByText, getByAltText } = render(
      <PizzaCard
        pizza={mockPizza}
        buttonText={mockButtonText}
        onButtonClick={mockButtonClickHandler}
      />
    );

    const pizzaName = getByText("Margherita");
    const pizzaPrice = getByText(formattedPrice);
    const orderButton = getByText("Choose");
    const pizzaImage = getByAltText("Margherita");

    expect(pizzaName).toBeInTheDocument();
    expect(pizzaPrice).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
    expect(pizzaImage).toBeInTheDocument();
  });

  test("Clicking on the order button triggers the click handler", () => {
    const { getByText } = render(
      <PizzaCard
        pizza={mockPizza}
        buttonText={mockButtonText}
        onButtonClick={mockButtonClickHandler}
      />
    );

    const orderButton = getByText("Choose");
    orderButton.click();

    expect(mockButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
