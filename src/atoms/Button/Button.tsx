import React, { FC, MouseEventHandler } from "react";
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
  variant: "primary" | "secondary" | "danger" | "outline-primary" | "outline-secondary" | "outline-danger";
  children?: React.ReactNode; 
  isIcon?: boolean; 
}

const Button: FC<ButtonProps> = ({ label, className, id, isIcon = false, onClick, disabled, variant, children }) => {
  const buttonClass = `${styles.button} ${styles[`button--${variant}`]} ${className} ${isIcon ? styles.hasIcon : ""}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} id={id} data-testid={id}>
      {isIcon ? <span className={styles.icon}>{children}</span> : null}
     <span className={styles.button__name}>{label}</span>
    </button>
  );
};

export default Button;
