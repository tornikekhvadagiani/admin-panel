import { forwardRef } from "react";
import { CreamsAPI } from "../API/CreamsAPI";
import styles from "./Components.module.css";
const CreamSelect = forwardRef((props, ref) => {
  return (
    <select name="coffee_ingredient" className={styles.priced_options}>
      {CreamsAPI.map((e) => (
        <option value={e.title}>
          <p> {e.title}</p>
          <p className={styles.price}> = {e.price}$</p>
        </option>
      ))}
    </select>
  );
});

export default CreamSelect;
