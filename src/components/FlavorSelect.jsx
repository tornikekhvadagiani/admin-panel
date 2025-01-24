import React, { forwardRef, useState, useEffect } from "react";
import { FlavorAPI } from "../API/FlavorAPI";
import randn from "randn";

const FlavorSelect = forwardRef(({ changeFlavor, ...props }, ref) => {
  // Initialize the state with the first item from the API
  const [selectedValue, setSelectedValue] = useState(FlavorAPI[0]?.title || "");

  useEffect(() => {
    // Set initial flavor to parent component
    if (FlavorAPI.length > 0) {
      changeFlavor({ ...FlavorAPI[0], type: "createFlavor" });
    }
  }, []); // Runs only once when component mounts

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

  return (
    <select
      name="coffee_flavor"
      id="coffee_flavor"
      ref={ref}
      value={selectedValue}
      onChange={handleChange}
      {...props}
    >
      {FlavorAPI.map((e) => (
        <option value={e.title} key={randn()}>
          {e.title} - {e.price}$
        </option>
      ))}
    </select>
  );
});

export default FlavorSelect;
