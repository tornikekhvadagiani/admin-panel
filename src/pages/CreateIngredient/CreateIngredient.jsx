import { useRef } from "react";
import styles from "../CreateProducts/CreateProducts.module.css";
import FlavorSelect from "../../components/FlavorSelect";
import CountrySelect from "../../components/CountrySelect";
import CreamSelect from "../../components/CreamSelect";
const CreateIngredient = () => {
  const priceRef = useRef(null);
  const sugarRef = useRef(null);
  const coffeineRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const flavorRef = useRef(null);
  const creamRef = useRef(null);

  return (
    <div className={styles.create_main}>
      <div className={styles.add_product_main}>
        <h1>Create Ingredient</h1>
        <div className={styles.create_div_container}>
          <form className={styles.create_form}>
            <div className={styles.inputs_flex}>
              <div className={styles.flex_div}>
                <label>
                  <h2>Ingredient Name</h2>
                  <input type="text" ref={priceRef} />
                </label>
                <label>
                  <h2>Flvor Type</h2>
                  <FlavorSelect ref={flavorRef} />
                </label>

                <label>
                  <h2>Strength</h2>
                  <input type="text" ref={coffeineRef} />
                </label>
              </div>
              <div className={styles.flex_div}>
                <label>
                  <h2>Sugar (gr) </h2>
                  <input type="number" ref={sugarRef} />
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
                <h2>Select Creams & Toppings </h2>
                <CreamSelect ref={creamRef} />
              </label>
            </div>

            <div className={styles.add_button}></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIngredient;
