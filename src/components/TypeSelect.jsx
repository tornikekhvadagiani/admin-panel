import React, { forwardRef, useEffect, useState } from "react";
import { CoffeTypeAPI } from "../API/CoffeTypeAPI";
import randn from "randn";

const TypeSelect = forwardRef(({ isEditing, editTypeValue }, ref) => {
  const [selectedType, setSelectedType] = useState("");
  useEffect(() => {
    if (isEditing) {
      setSelectedType(editTypeValue);
      return;
    }
    if (CoffeTypeAPI.length > 0) {
      setSelectedType(CoffeTypeAPI[0].value);
    }
  }, [editTypeValue]);

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };
  return (
    <select
      name="coffee"
      ref={ref}
      value={selectedType}
      onChange={handleChange}
    >
      {CoffeTypeAPI.map((e) => (
        <option value={e.value} key={randn()}>
          {e.value}
        </option>
      ))}
    </select>
  );
});

export default TypeSelect;
