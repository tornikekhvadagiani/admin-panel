import React from "react";

const InfoType = ({ fetchType, ingredientValue, coffeValue }) => {
  return <>{fetchType === "ingredients" ? ingredientValue : coffeValue}</>;
};

export default InfoType;
