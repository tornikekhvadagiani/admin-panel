import { forwardRef } from "react";
import { CountryAPI } from "../API/CountryAPI";
const CountrySelect = forwardRef((props, ref) => {
  return (
    <select name="country" id="country" ref={ref}>
      {CountryAPI.map((e) => (
        <option value={e.title}>{e.title}</option>
      ))}
    </select>
  );
});

export default CountrySelect;
