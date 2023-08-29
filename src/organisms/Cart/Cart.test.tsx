import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import CartItem from "../../molecules/CartItem/CartItem";
const mockStore = configureStore([]);
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
      },
    ],
  },
});

const mockCartItem = [
  {
    id: 1,
    name: "Vegetarian",
    price: 11.99,
    size: "Small",
    qty: 1,
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
  },
];



describe("Cart component", () => {
  test("renders CartItem component for each item in cart", () => {
    
    const onClickCheckout = vi.fn();

    const { getAllByTestId } = render(
      <Provider store={store}>
        <Cart cart={mockCartItem} onClickCheckout={onClickCheckout} />
      </Provider>
    );

    // Expect CartItem components to be rendered for each item in cart
    const cartItems = getAllByTestId("cart-item");
    expect(cartItems.length).toBe(mockCartItem.length);
  });

  test("calls the handleRemove function when remove button is clicked", () => {
    const mockHandleRemove = vi.fn();

    const { getByTestId } = render(
      <CartItem cart={mockCartItem[0]} onRemove={mockHandleRemove}/>
    );

    const removeButton = getByTestId("remove-button");
    fireEvent.click(removeButton);

    // Expect the handleRemove function to be called
    expect(mockHandleRemove).toHaveBeenCalled();
  });

  test("disables the checkout button when the cart is empty", () => {

    const { getByTestId } = render(
      <Provider store={store}>
        <Cart cart={[]} />
      </Provider>
    );

    const checkoutButton = getByTestId("checkout-button");
    expect(checkoutButton).toBeDisabled();
  });
});
