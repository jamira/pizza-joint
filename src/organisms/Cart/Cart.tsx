import { FC } from "react";
import CartItem from "../../molecules/CartItem/CartItem";
import Button from "../../atoms/Button/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeCartItem } from "../../features/cart/cartSlice";
import { formatCurrency } from "../../helpers/currency";
import { CartProps } from "../../types";
import styles from "./Cart.module.scss"

const Cart: FC<CartProps> = ({ cart, onClickCheckout }) => {
  const dispatch = useAppDispatch();

  const handleRemove = (id: number): void => {
    dispatch(removeCartItem(id));
  };

  const cartTotal = useAppSelector((state) =>
    state.cart.cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    )
  );

  const isCartEmpty = cart.length === 0;
  const formattedPrice = formatCurrency(cartTotal, "HKD");

  return (
    <div className={styles.cart}>
      <section className={styles.cart__content}>
      <div className={styles.cart__title}>
        <h2>Your Basket</h2>
      </div>
      {isCartEmpty && (
        <p>
          Your basket looks a little empty. Why not check out some of our unbeatable deals?
        </p>
      )}
        {cart.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cart={cartItem}
            onRemove={() => handleRemove(cartItem.id)}
          />
        ))}
      </section>
      <footer className={styles.cart__footer}>
        <Button
          label={`Checkout ${formattedPrice}`}
          onClick={onClickCheckout}
          variant="primary"
          disabled={isCartEmpty}
          className="w-full"
          id="checkout-button"
          data-testid="checkout-button"
        />
      </footer>
    </div>
  );
};

export default Cart;
