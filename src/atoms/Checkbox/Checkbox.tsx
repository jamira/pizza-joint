import { FC, ChangeEvent } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  className,
  onChange
}) => {
  
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const checkboxClass = `${styles.chkbox} ${styles.chkbox__label} ${className}`;

  return (
    <label className={checkboxClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={`${styles.chkbox__checkmark}`}></span>
      {label}
    </label>
    
  );
};

export default Checkbox;
