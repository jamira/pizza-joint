import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux"; 
import configureStore from "redux-mock-store"; 
import PizzaCustomizationModal from "./PizzaCustomizationModal";
import { addToCart } from "../../features/cart/cartSlice";
import { CartItem } from "../../types";

const mockStore = configureStore([]);
const store = mockStore({});
const onClose = vi.fn();
const pizza = {
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

describe("PizzaCustomizationModal component", () => {
  test("Renders and interacts with the modal", () => {
    const { getByText } = render(
      <Provider store={store}>
        <PizzaCustomizationModal
          show={true}
          title="Margherita"
          pizza={pizza}
          onClose={onClose}
        />
      </Provider>
    );

    const modalTitle = getByText("Margherita");
    expect(modalTitle).toBeInTheDocument();

    const addToCartButton = getByText("Add to Basket");
    fireEvent.click(addToCartButton);

    const actions = store.getActions();

    const payload = {
      ...pizza,
      size: "Small",
      toppings: pizza.ingredients,
    };

    const { ingredients, ...newPayload } = payload;
    
    expect(actions).toContainEqual(
      addToCart(newPayload as CartItem)
    );

    fireEvent.click(getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
