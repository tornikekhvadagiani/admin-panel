import { forwardRef, useEffect, useState } from "react";
import { CountryAPI } from "../API/CountryAPI";
import randn from "randn";

const CountrySelect = forwardRef(({ editCountryValue, isEditing }, ref) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (isEditing && editCountryValue) {
      setSelectedValue(editCountryValue);
    } else if (CountryAPI.length > 0) {
      setSelectedValue(CountryAPI[0].title);
    }
  }, [editCountryValue, isEditing]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <select
      name="country"
      id="country"
      ref={ref}
      value={selectedValue}
      onChange={handleChange}
    >
      {CountryAPI.map((e) => (
        <option value={e.title} key={randn()}>
          {e.title}
        </option>
      ))}
    </select>
  );
});

export default CountrySelect;
