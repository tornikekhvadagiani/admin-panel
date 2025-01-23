import React, { forwardRef } from "react";
import { FlavorAPI } from "../API/FlavorAPI";

const FlavorSelect = forwardRef((props, ref) => {
  return (
    <select name="coffee_flavor" id="coffee_flavor" ref={ref}>
      {FlavorAPI.map((e) => (
        <option value={e.title}>
          <p>{e.title}</p>
          <p> = {e.price}$</p>
        </option>
      ))}
    </select>
  );
});

export default FlavorSelect;
