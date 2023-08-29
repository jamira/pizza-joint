import React, { FC } from "react";
import PizzaCard from "../../molecules/PizzaCard/PizzaCard";
import PizzaCustomizationModal from "../../molecules/PizzaCustomizationModal/PizzaCustomizationModal";
import useModal from "../../hooks/useModal";
import { Pizza, PizzaProps } from "../../types";
import styles from "./Pizzas.module.scss"

const Pizzas: FC<PizzaProps> = ({ pizzas }) => {
  const { isShowing, handleToggle } = useModal();
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza | null>(null);

  const openModalForPizza = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    handleToggle(true);
  };

  return (
    <div className={styles.pizzas}>
      {pizzas.map((pizza) => (
        <PizzaCard
          key={pizza.id}
          pizza={pizza}
          buttonText="Choose"
          onButtonClick={() => openModalForPizza(pizza)}
        />
      ))}
      {selectedPizza && (
        <PizzaCustomizationModal
          show={isShowing}
          title={selectedPizza.name}
          pizza={selectedPizza}
          onClose={() => handleToggle(false)}
        />
      )}
    </div>
  );
};

export default Pizzas;
