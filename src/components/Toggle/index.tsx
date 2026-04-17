import { useState, type FC } from "react";
import styles from "./Toggle.module.css";

interface ToggleProps {
  label1: string;
  label2: string;
  onChange: (value: boolean) => void;
  value: boolean;
}

const Toggle: FC<ToggleProps> = ({ label1, label2, onChange, value }) => {
  const [isToggled, setIsToggled] = useState(value);

  const handleChange = () => {
    setIsToggled((prev) => {
      const temp = !prev;
      onChange(temp);
      return temp;
    });
  };

  return (
    <button className={styles.container} onClick={handleChange}>
      <label>{label1}</label>
      <div className={styles.background}>
        <div
          className={`${styles.toggle} ${isToggled ? styles.toggled : ""}`}
        />
      </div>
      <label>{label2}</label>
    </button>
  );
};

export default Toggle;
