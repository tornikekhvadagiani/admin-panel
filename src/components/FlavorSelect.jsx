import { forwardRef, useState, useEffect } from "react";
import { FlavorAPI } from "../API/FlavorAPI";
import randn from "randn";
const FlavorSelect = forwardRef(
  ({ changeFlavor, isEditing, editFlavorValue }, ref) => {
    const [selectedValue, setSelectedValue] = useState(
      FlavorAPI[0]?.title || ""
    );

    const handleChange = (e) => {
      const selectedOption = FlavorAPI.find(
        (flavor) => flavor.title === e.target.value
      );

      if (selectedOption) {
        selectedOption.type = "createFlavor";
        changeFlavor(selectedOption);
        setSelectedValue(selectedOption.title);
      }
    };

    useEffect(() => {
      if (isEditing) {
        setSelectedValue(editFlavorValue);
        return;
      }
      if (FlavorAPI.length > 0) {
        setSelectedValue(FlavorAPI[0].title);
      }
    }, [editFlavorValue]);

    return (
      <select
        name="coffee_flavor"
        id="coffee_flavor"
        ref={ref}
        value={selectedValue}
        onChange={handleChange}
      >
        {FlavorAPI.map((e) => (
          <option value={e.title} key={randn()}>
            {e.title} - {e.price}$
          </option>
        ))}
      </select>
    );
  }
);

export default FlavorSelect;
