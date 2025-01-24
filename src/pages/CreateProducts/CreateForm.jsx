import styles from "./CreateProducts.module.css";
import CountrySelect from "../../components/CountrySelect";
import FlavorSelect from "../../components/FlavorSelect";
import BlueButton from "../../components/BlueButton";
const CreateForm = ({
  addCoffe,
  openIngredients,
  typeRef,
  coffePrice,
  setCoffePrice,
  coffeineRef,
  sugarRef,
  countryRef,
  flavorRef,
  descriptionRef,
  total_price,
  changeFlavor,
  addMoreIngredient,
}) => {
  return (
    <form className={styles.create_form}>
      <div className={styles.inputs_flex}>
        <div className={styles.flex_div}>
          <label>
            <h2>Coffe Type</h2>
            <select name="coffee" ref={typeRef}>
              <option value="Espresso">Espresso</option>
              <option value="Americano">Americano</option>
              <option value="Latte">Latte</option>
              <option value="Cappuccino">Cappuccino</option>
              <option value="Mocha">Mocha</option>
              <option value="Macchiato">Macchiato</option>
              <option value="Flat_White">Flat White</option>
              <option value="Irish">Irish Coffee</option>
              <option value="Affogato">Affogato</option>
              <option value="Turkish">Turkish Coffee</option>
            </select>
          </label>
          <label>
            <h2>Coffe Price</h2>
            <input
              type="number"
              value={coffePrice || ""}
              onChange={(e) => setCoffePrice(e.target.value)}
              min={0}
            />
          </label>
          <label>
            <h2>Coffeine</h2>
            <input type="text" ref={coffeineRef} />
          </label>
        </div>
        <div className={styles.flex_div}>
          <label>
            <h2>Sugar (gr) </h2>
            <input type="number" min={0} ref={sugarRef} />
          </label>
          <label className={styles.textarea_label}>
            <h2>Description </h2>
            <textarea ref={descriptionRef} />
          </label>
        </div>
      </div>

      <div className={styles.info_bottom_flex}>
        <label>
          <h2>Select Country</h2>
          <CountrySelect ref={countryRef} />
        </label>
        <label>
          <h2>Select Flavor</h2>
          <FlavorSelect ref={flavorRef} changeFlavor={changeFlavor} />
        </label>
      </div>
      <div className={styles.total_price}>
        <p>Total Price :</p>
        <p className={styles.price}>{total_price}$</p>
      </div>

      <div className={styles.add_button}>
        <BlueButton title={"Add Ingredients"} func={openIngredients} />
        <BlueButton title={"Add Coffe"} func={addCoffe} />
      </div>
    </form>
  );
};

export default CreateForm;
