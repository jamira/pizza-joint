import { FC } from "react";
import Button from "../../atoms/Button/Button";
import Image from "../../atoms/Image/Image";
import { formatCurrency } from "../../helpers/currency";
import { PizzaCardProps } from "../../types";
import styles from "./styles.module.scss";

const PizzaCard: FC<PizzaCardProps> = ({
  pizza,
  buttonText,
  onButtonClick,
}) => {
  const formattedPrice = formatCurrency(pizza.price, "HKD");

  return (
    <div className={styles.pizza__card}>
      <div className={styles.pizza__card__image}>
        <Image
          src={pizza.id}
          alt={pizza.name}
          className={styles["pizza__card__image-content"]}
        />
      </div>
      <div className={styles.pizza__card__description}>
        <h2 className={styles.pizza__card__title}>{pizza.name}</h2>
        <span className={styles.pizza__card__price}>{formattedPrice}</span>
      </div>
      <Button
        className={styles.pizza__card__button}
        variant="primary"
        label={buttonText}
        onClick={onButtonClick}
      />
    </div>
  );
};

export default PizzaCard;
