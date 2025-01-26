import styles from "./Components.module.css";
import BlueButton from "./BlueButton";
const SingleIngredient = ({
  ingredientCountry,
  ingredientCream,
  ingredientDescription,
  ingredientFlavor,
  ingredientGelPrice,
  ingredientName,
  ingredientPrice,
  ingredientStrength,
  addFunction,
  addedIngredients,
  uuid,
}) => {
  console.log(addedIngredients);

  return (
    <div className={styles.single_ingredient}>
      <h2>{ingredientName}</h2>
      <p>
        <strong>Country:</strong> {ingredientCountry}
      </p>
      <p>
        <strong>Cream:</strong> {ingredientCream}
      </p>
      <p>
        <strong>Description:</strong> {ingredientDescription}
      </p>
      <p>
        <strong>Flavor:</strong> {ingredientFlavor}
      </p>

      <p>
        <strong>Strength:</strong> {ingredientStrength}
      </p>
      <p style={{ color: "limegreen" }}>
        <strong style={{ color: "black" }}>Gel Price:</strong> $
        {ingredientGelPrice}
      </p>
      <p style={{ color: "limegreen" }}>
        <strong style={{ color: "black" }}>Price:</strong> ${ingredientPrice}
      </p>
      <BlueButton
        title={
          addedIngredients?.filter((e) => e.uuid === uuid).length
            ? "Remove Ingredient"
            : "Add Ingredient"
        }
        func={addFunction}
      />
    </div>
  );
};

export default SingleIngredient;
