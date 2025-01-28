import styles from "./Components.module.css";

const BlueButton = ({ title, func }) => {
  return (
    <button className={styles.blue_button} onClick={func}>
      {title}
    </button>
  );
};

export default BlueButton;
