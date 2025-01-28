import { forwardRef, useState } from "react";
import { CreamsAPI } from "../API/CreamsAPI";
import styles from "./Components.module.css";
import randn from "randn";
import { useEffect } from "react";
const CreamSelect = forwardRef(
  ({ changeCream, isEditing, editCreamValue }, ref) => {
    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (e) => {
      const selectedOption = CreamsAPI.find(
        (cream) => cream.title === e.target.value
      );
      console.log(selectedOption);

      if (selectedOption) {
        const updatedCream = { ...selectedOption, type: "Cream" };
        setSelectedValue(updatedCream.title);
        changeCream(updatedCream);
      }
    };
    useEffect(() => {
      if (isEditing) {
        setSelectedValue(editCreamValue);
      }
    }, [editCreamValue]);

    return (
      <select
        name="coffee_ingredient"
        className={styles.priced_options}
        onChange={handleChange}
        value={selectedValue}
        ref={ref}
      >
        {CreamsAPI.map((e) => (
          <option value={e.title} key={randn()}>
            {e.title} - {e.price}$
          </option>
        ))}
      </select>
    );
  }
);

export default CreamSelect;
