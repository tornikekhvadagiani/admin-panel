import styles from "./Components.module.css";
import { useMyContext } from "../context/Context";
const AddIngredients = () => {
  const context = useMyContext();

  const closeIngredients = () => {
    context.setIngredientsPopup(false);
  };
  console.log(context.ingredientsPopup);

  return (
    <div
      className={`${styles.ingredients_main} ${
        context.ingredientsPopup ? `${styles.active}` : ""
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
