import CountrySelect from "../../components/CountrySelect";
import CreamSelect from "../../components/CreamSelect";
import BlueButton from "../../components/BlueButton";
import FlavorSelectIngredient from "../../components/FlavorSelectIngredient";
import styles from "../CreateProducts/CreateProducts.module.css";
import { useMyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const IngredientForm = ({
  nameRef,
  countryRef,
  currentData,
  flavorRef,
  changeFlavor,
  id,
  strengthRef,
  ingredientPrice,
  descriptionRef,
  changeCream,
  creamRef,
  totalPrice,
  addIngredient,
  setIngredientPrice,
}) => {
  const navigate = useNavigate();
  const { API_URL, API_INGREDIENTS_KEY } = useMyContext();

  const deleteIngredient = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_INGREDIENTS_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form className={styles.create_form}>
      <div className={styles.inputs_flex}>
        <div className={styles.flex_div}>
          <label>
            <h2>Ingredient Name</h2>
            <input
              type="text"
              ref={nameRef}
              defaultValue={currentData ? currentData.name : ""}
            />
          </label>
          <label>
            <h2>Flvor Type</h2>
            <FlavorSelectIngredient
              ref={flavorRef}
              changeFlavor={changeFlavor}
              isEditing={id ? true : false}
              editFlavorValue={currentData?.flavor}
            />
          </label>

          <label>
            <h2>Strength</h2>
            <input
              type="text"
              ref={strengthRef}
              defaultValue={currentData ? currentData.strength : ""}
            />
          </label>
        </div>
        <div className={styles.flex_div}>
          <label>
            <h2>Ingredient Price </h2>
            <input
              type="number"
              value={ingredientPrice || ""}
              onChange={(e) => setIngredientPrice(e.target.value)}
              min={0}
            />
          </label>
          <label className={styles.textarea_label}>
            <h2>Description </h2>
            <textarea
              ref={descriptionRef}
              defaultValue={currentData ? currentData.description : ""}
            />
          </label>
        </div>
      </div>
      <div className={styles.info_bottom_flex}>
        <label>
          <h2>Select Country</h2>
          <CountrySelect
            ref={countryRef}
            editCountryValue={currentData?.country}
            isEditing={id ? true : false}
          />
        </label>
        <label>
          <h2>Select Creams & Toppings </h2>
          <CreamSelect
            changeCream={changeCream}
            ref={creamRef}
            isEditing={id ? true : false}
            editCreamValue={currentData?.cream}
          />
        </label>
      </div>

      <div className={styles.total_price}>
        <p>Total Price :</p>
        <p className={styles.price}>{totalPrice}$</p>
      </div>

      <div className={styles.add_button}>
        {id ? (
          <>
            <BlueButton title={"Update Ingredient"} func={addIngredient} />
            <BlueButton title={"Delete Ingredient"} func={deleteIngredient} />
          </>
        ) : (
          <BlueButton title={"Add Ingredient"} func={addIngredient} />
        )}
      </div>
    </form>
  );
};

export default IngredientForm;
