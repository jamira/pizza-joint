import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

describe("App component", () => {
  test("Renders Pizzas and Cart components", () => {
    const store = mockStore({
      cart: {
        cartItems: [
          {
            id: 1,
            name: "Vegetarian",
            price: 11.99,
            size: "Small",
            qty: 1,
            toppings: [
              "Tomato Sauce",
              "Mozzarella Cheese",
              "Mushrooms",
              "Bell Peppers",
              "Red Onions",
              "Black Olives",
            ],
          },
        ]
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const pizzasContainer = getByTestId("pizza-container");
    const cartContainer = getByTestId("cart-container");

    expect(pizzasContainer).toBeInTheDocument();
    expect(cartContainer).toBeInTheDocument();
  });
  test("Renders Banner when isCheckout is true", () => {
    const store = mockStore({
      cart: {
        isCheckout: true,
      },
    });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const bannerContainer = getByTestId("banner-container");
    expect(bannerContainer).toBeInTheDocument();

    const bannerTitle = getByText("Thank You");
    expect(bannerTitle).toBeInTheDocument();
  });
});
