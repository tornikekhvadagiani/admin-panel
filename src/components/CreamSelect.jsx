import { forwardRef } from "react";
import { CreamsAPI } from "../API/CreamsAPI";
import styles from "./Components.module.css";
import randn from "randn";
const CreamSelect = forwardRef((props, ref) => {
  return (
    <select name="coffee_ingredient" className={styles.priced_options}>
      {CreamsAPI.map((e) => (
        <option value={e.title} key={randn()}>
          {e.title} - {e.price}$
        </option>
      ))}
    </select>
  );
});

export default CreamSelect;
