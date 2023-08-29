import { render, fireEvent } from "@testing-library/react";
import Pizzas from "./Pizzas";
import mockPizza from "../../data.json";
// import { formatCurrency } from "../../helpers/currency";
vi.mock(
  "../../molecules/PizzaCustomizationModal/PizzaCustomizationModal",
  () => {
    return {
      __esModule: true,
      default: function MockPizzaCustomizationModal() {
        return (
          <div data-testid="mock-modal">
            <p>Mock Pizza Customization Modal</p>
          </div>
        );
      },
    };
  }
);

describe("Pizzas component", () => {
  test("Opens PizzaCustomizationModal when 'Choose' button is clicked", () => {
    const { getAllByRole, getByTestId, getByText } = render(
      <Pizzas pizzas={mockPizza.pizzas} />
    );

    const chooseButtons = getAllByRole("button", { name: "Choose" });
    chooseButtons.forEach((chooseButton, index) => {
      fireEvent.click(chooseButton);

      const modalContent = getByTestId("mock-modal");
      expect(modalContent).toBeInTheDocument();

      // Get the pizza name and price
      const pizzaName = mockPizza.pizzas[index].name;
      // const pizzaPrice = mockPizza.pizzas[index].price;

      // Check if the pizza name and price are rendered in the modal content
      expect(getByText(pizzaName)).toBeInTheDocument();
      // expect(getByText(formatCurrency(pizzaPrice, "HKD"))).toBeInTheDocument()
    });
  });
});
