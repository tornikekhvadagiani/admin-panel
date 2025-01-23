import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const API_KEY = "ZPuxX_W7Yqznq29IU1rmTJ97DDvxJUKEBDYPdEy8gPAGp6A4Ag";
  const URL = "https://crudapi.co.uk/api/v1";
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsPopup, setIngredientsPopup] = useState(false);

  return (
    <MyContext.Provider
      value={{
        API_KEY,
        URL,
        isLoaded,
        setIsLoaded,
        ingredients,
        setIngredients,
        ingredientsPopup,
        setIngredientsPopup,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext); // Access the context here
};
