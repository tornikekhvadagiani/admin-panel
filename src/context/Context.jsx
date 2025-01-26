import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const API_COFFE_KEY = "ZPuxX_W7Yqznq29IU1rmTJ97DDvxJUKEBDYPdEy8gPAGp6A4Ag";
  const API_INGREDIENTS_KEY =
    "pa7mgdUf7LYSHtAsd1XWzhVn13700_re6sLHeJDWB8nLasJfRQ";
  const API_URL = "https://crudapi.co.uk/api/v1";

  const [ingredientsPopup, setIngredientsPopup] = useState(true);

  return (
    <MyContext.Provider
      value={{
        API_COFFE_KEY,
        API_URL,
        API_INGREDIENTS_KEY,
        ingredientsPopup,
        setIngredientsPopup,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
