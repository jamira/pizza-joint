import { FC, useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import Button from "../../atoms/Button/Button";
import Radio from "../../atoms/Radio/Radio";
import api from "../../data.json";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";
import {
  CartItem,
  Topping,
  Size,
  PizzaCustomizationModalProps,
  ToppingSelection,
} from "../../types";
import styles from "./styles.module.scss";

// Extract Checkbox components
const ToppingCheckbox: FC<{
  topping: Topping;
  selected: boolean;
  onChange: () => void;
}> = ({ topping, selected, onChange }) => (
  <Checkbox
    key={topping.id}
    label={topping.name}
    checked={selected}
    onChange={onChange}
  />
);

const PizzaCustomizationModal: FC<PizzaCustomizationModalProps> = ({
  show,
  title,
  pizza,
  onClose,
}) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("Small");
  const [selectedToppings, setSelectedToppings] = useState<ToppingSelection[]>(
    []
  );

  useEffect(() => {
    setToppings(api.toppings);
    setSizes(api.sizes);

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOnClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setSelectedToppings((prevToppings) => [
      ...prevToppings,
      ...pizza.ingredients,
    ]);
  }, [pizza.ingredients]);

  const dispatch = useAppDispatch();
  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  const handleCheckboxChange = (toppingName: any) => {
    setSelectedToppings((prevToppings) => {
      const newTopping = {
        name: toppingName,
        price: 1.2,
      };
      return prevToppings.some(
        (defaulTopping) => defaulTopping.name === toppingName
      )
        ? prevToppings.filter((item) => item.name !== toppingName)
        : [...prevToppings, newTopping];
    });

    // setSelectedToppings((prevToppings) =>
    //   prevToppings.includes(toppingName)
    //     ? prevToppings.filter((item) => item !== toppingName)
    //     : [...prevToppings, toppingName]
    // );
  };

  const handleRadioChange = (value: string) => {
    setSelectedSize(value);
  };

  const resetSelection = () => {
    const filteredSelectedToppings = selectedToppings.filter((topping) =>
      pizza.ingredients.includes(topping)
    );

    setSelectedSize("Small");
    setSelectedToppings(filteredSelectedToppings);
  };

  const handleOnClose = () => {
    resetSelection();
    onClose();
  };

  const handleAddToCart = () => {
    const payload = {
      ...pizza,
      size: selectedSize,
      toppings: selectedToppings,
    };

    const { ingredients, ...newPayload } = payload;
    memoizedDispatch(addToCart(newPayload as CartItem));
    resetSelection();
    onClose();
  };

  const modalClass = useMemo(
    () => `${styles.modal} ${show ? `${styles.show}` : `${styles.hide}`}`,
    [show]
  );

  const modalContent = (
    <div className={modalClass}>
      <div className={styles.modal__container}>
        {title && <h2 className={styles.modal__title}>{title}</h2>}
        <div className={styles.modal__content}>
          <h4 className={styles.modal__heading}>Sizes</h4>
          <div className={styles["modal__content-sizes"]}>
            {sizes.map((size, index) => (
              <Radio
                key={index}
                label={size.name}
                checked={selectedSize === size.name}
                onChange={() => handleRadioChange(size.name)}
                value={size.name.toString()}
              />
            ))}
          </div>
          <h4 className={styles.modal__heading}>Toppings</h4>
          <div className={styles["modal__content-toppings"]}>
            {toppings.map((topping) => (
              <ToppingCheckbox
                key={topping.id}
                topping={topping}
                selected={selectedToppings.some(
                  (defaultTopping) => defaultTopping.name === topping.name
                )}
                onChange={() => handleCheckboxChange(topping.name)}
              />
            ))}
          </div>
        </div>
        <div className={styles.modal__actions}>
          <Button
            label="Add to Basket"
            onClick={handleAddToCart}
            variant="primary"
            className="w-full"
          />
          <Button
            label="Cancel"
            onClick={handleOnClose}
            variant="outline-secondary"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  return show
    ? ReactDOM.createPortal(
        modalContent,
        document.getElementById("portal-root")!
      )
    : null;
};

export default PizzaCustomizationModal;
