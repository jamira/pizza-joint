import React, { ChangeEvent } from "react";
import styles from "./Radio.module.scss";

interface RadioProps {
  label: string;
  checked: boolean;
  value: string;
  selectedValue?: string;
  className?: string;
  onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  checked,
  value,
  className,
  onChange,
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const radioClass = `${styles.radio} ${styles.radio__label} ${className}`;
  
  return (
    <label className={radioClass}>
      <input
        type="radio"
        checked={checked}
        onChange={handleRadioChange}
        value={value}
      />
      <span className={`${styles.radio__checkmark}`}></span>
      {label}
    </label>
  );
};

export default Radio;
