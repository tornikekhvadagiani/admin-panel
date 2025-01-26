import styles from "./Components.module.css";
import { useMyContext } from "../context/Context";
import { useState } from "react";
import { useEffect } from "react";
import SingleIngredient from "./singleIngredient";
const AddIngredients = ({
  addedIngredients,
  setAddedIngredients,
  isEditing,
  currentData,
}) => {
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
        if (isEditing) {
          setIngredientsData(currentData);
        }
        const ingredientInfo = data.items.map(
          ({
            _uuid,
            ingredientName,
            ingredientCountry,
            ingredientCream,
            ingredientDescription,
            ingredientFlavor,
            ingredientPrice,
            ingredientGelPrice,
            ingredientStrength,
          }) => ({
            uuid: _uuid,
            name: ingredientName,
            country: ingredientCountry,
            cream: ingredientCream,
            description: ingredientDescription,
            flavor: ingredientFlavor,
            price: ingredientPrice,
            gelPrice: ingredientGelPrice,
            strength: ingredientStrength,
          })
        );
        setIngredientsData(ingredientInfo);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (ingredientsPopup) {
      getIngredientsInfo();
    }
  }, [ingredientsPopup]);

  const addFunction = (e) => {
    const updatedIngredients = Array.isArray(addedIngredients)
      ? addedIngredients
      : [];

    if (updatedIngredients.find((f) => f.uuid === e.uuid)) {
      const filtered = updatedIngredients.filter((f) => f.uuid !== e.uuid);
      setAddedIngredients(filtered);
      return;
    }

    setAddedIngredients([...updatedIngredients, e]);
  };

  return (
    <div
      className={`${styles.ingredients_main} ${
        ingredientsPopup ? `${styles.active}` : ""
      }`}
    >
      <div className={styles.add_ingredients_box}>
        <div className={styles.add_ingredients_header}>
          <h1>Add Some Ingredients...</h1>
          <div className={styles.close_button} onClick={closeIngredients}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </div>
        </div>
        <div className={styles.ingredients_flex}>
          {ingredientsData?.map((e) => (
            <SingleIngredient
              key={e.uuid}
              ingredientCountry={e.country}
              ingredientCream={e.cream}
              ingredientDescription={e.description}
              ingredientFlavor={e.flavor}
              ingredientGelPrice={e.gelPrice}
              ingredientName={e.name}
              ingredientPrice={e.price}
              ingredientStrength={e.strength}
              addFunction={() => addFunction(e)}
              addedIngredients={addedIngredients}
              uuid={e.uuid}
              isEditing={isEditing}
              currentData={[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddIngredients;
