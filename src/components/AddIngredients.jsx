import styles from "./Components.module.css";
import { useMyContext } from "../context/Context";
import { useState } from "react";
import { useEffect } from "react";
const AddIngredients = () => {
  const {
    API_INGREDIENTS_KEY,
    API_URL,
    ingredientsPopup,
    setIngredientsPopup,
  } = useMyContext();
  const closeIngredients = () => {
    setIngredientsPopup(false);
  };

  const [ingredientsData, setIngredientsData] = useState(null);
  const getIngredientsInfo = () => {
    fetch(`${API_URL}/ingredients`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_INGREDIENTS_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setIngredientsData(data.items);
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    getIngredientsInfo();
  }, []);
  console.log(ingredientsData);

  return (
    <div
      className={`${styles.ingredients_main} ${
        ingredientsPopup ? `${styles.active}` : ""
      }`}
    >
      <div className={styles.add_ingredients_box}>
        <div className={styles.close_button} onClick={closeIngredients}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
        </div>
        <h1>Add Some Ingredients...</h1>
      </div>
    </div>
  );
};

export default AddIngredients;
