import { useState, type FC } from "react";
import styles from "./Toggle.module.css";

interface ToggleProps {
  label1: string;
  label2: string;
  onChange: (value: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ label1, label2, onChange }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
    onChange(isToggled);
  };

  return (
    <button className={styles.container} onClick={handleChange}>
      <label>{label1}</label>
      <div className={styles.background}>
        <div
          className={`${styles.toggle} ${isToggled ? "" : styles.toggled}`}
        />
      </div>
      <label>{label2}</label>
    </button>
  );
};

export default Toggle;
