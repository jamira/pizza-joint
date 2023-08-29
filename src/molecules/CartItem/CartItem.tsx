import { FC, useState } from "react";
import Button from "../../atoms/Button/Button";
import { formatCurrency } from "../../helpers/currency";
import { CartItemProps } from "../../types";
import styles from "./CartItem.module.scss";

const CartItem: FC<CartItemProps> = ({ cart, onRemove }) => {
  const [showToppings, setShowToppings] = useState(false);
  const formattedPrice = formatCurrency(cart.price, "HKD");

  return (
    <div className={styles.cart__item} id="cart-item" data-testid="cart-item">
      <div className={styles["cart__item-detail"]}>
        <div className={styles["cart__item-name"]}>{cart.name}</div>
        <div className={styles["cart__item-qty"]}>{`${cart.qty}x`}</div>
        <div className={styles["cart__item-price"]}>{formattedPrice}</div>
        <div className={styles["cart__item-delete"]}>
          <Button              
            label="Remove"
            onClick={onRemove}
            variant="danger"
            isIcon={true}
            id="remove-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.47222 0L9.36113 0.888875H12.4722V2.66667H0.0278015V0.888875H3.13888L4.0278 0H8.47222ZM2.69447 16C1.71222 16 0.916677 15.2045 0.916677 14.2222V3.55554H11.5833V14.2222C11.5833 15.2045 10.7878 16 9.80559 16H2.69447Z"
                fill="#dc3545"
              />
            </svg>
          </Button>
        </div>
      </div>
      <div className={styles.toppings_size}>
        <a
          className={styles["cart__item-label"]}
          onClick={() => setShowToppings(!showToppings)}
        >
          Show Details
        </a>
        <div
          className={`${styles.toppings_size__cart} ${
            showToppings
              ? `${styles["toppings_size__cart-show"]}`
              : `${styles["toppings_size__cart-hide"]}`
          }`}
        >
          <span style={{ display: "block", fontWeight: 700 }}>Toppings:</span>
          {cart.toppings.map((topping, index) => (
            <span key={index} className={styles["cart__item-topping"]}>
              {topping.name}
            </span>
          ))}
          <div style={{ display: "flex", gap: 5, marginTop: '5px' }}>
            <span style={{ display: "block", fontWeight: 700 }}>Size:</span>
            <span>{cart.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
