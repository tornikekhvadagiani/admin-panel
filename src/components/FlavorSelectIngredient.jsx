import React, { forwardRef, useState, useEffect } from "react";
import { FlavorAPI } from "../API/FlavorAPI";

const FlavorSelectIngredient = forwardRef(
  ({ changeFlavor, isEditing, editFlavorValue }, ref) => {
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
      if (isEditing) {
        setSelectedValue(editFlavorValue);
        return;
      }
      if (FlavorAPI.length > 0) {
        setSelectedValue(FlavorAPI[0].title);
      }
    }, [editFlavorValue]);

    const handleChange = (e) => {
      const selectedOption = FlavorAPI.find(
        (flavor) => flavor.title === e.target.value
      );

      if (selectedOption) {
        const updatedFlavor = { ...selectedOption, type: "Flavor" };
        setSelectedValue(selectedOption.title);
        changeFlavor(updatedFlavor);
      }
    };

    return (
      <select
        name="coffee_flavor"
        id="coffee_flavor"
        ref={ref}
        value={selectedValue}
        onChange={handleChange}
      >
        {FlavorAPI.map((e) => (
          <option value={e.title} key={e.title}>
            {e.title} - {e.price}$
          </option>
        ))}
      </select>
    );
  }
);

export default FlavorSelectIngredient;
