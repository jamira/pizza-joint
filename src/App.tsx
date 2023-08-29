import { FC } from "react";
import "./App.scss";
import api from "./data.json";
import Cart from "./organisms/Cart/Cart";
import Pizzas from "./organisms/Pizzas/Pizzas";
import Banner from "./atoms/Banner/Banner";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { isCheckoutCart, clearCartItems } from "./features/cart/cartSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart.cartItems);
  const isCheckout = useAppSelector((state) => state.cart.isCheckout);
  const pizzas = api.pizzas;

  const handleCheckout = () => {
    dispatch(isCheckoutCart(true));
    dispatch(clearCartItems());
  };

  return (
    <div className="app">
      {isCheckout ? (
        <div id="banner-container" data-testid="banner-container" style={{width: '100%'}}>
        <Banner title="Thank You">
          <p>
            Hold onto your taste buds – your order is locked, loaded, and on its
            way to becoming a culinary masterpiece! Our team is working their
            magic to prepare your delicious delivery. Get those appetites ready!
          </p>
        </Banner>
        </div>

      ) : (
        <>
          <div id="pizza-container" data-testid="pizza-container">
            <Pizzas pizzas={pizzas} />
          </div>
          <div id="cart-container" data-testid="cart-container">
            <Cart cart={cartData} onClickCheckout={handleCheckout} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
