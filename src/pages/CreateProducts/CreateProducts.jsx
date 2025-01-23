import React, { useRef } from "react";
import styles from "./CreateProducts.module.css";
import BlueButton from "../../components/BlueButton";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../../components/CountrySelect";
import FlavorSelect from "../../components/FlavorSelect";
import AddIngredients from "../../components/AddIngredients";
import { useMyContext } from "../../context/Context";

const CreateProducts = () => {
  const typeRef = useRef(null);
  const priceRef = useRef(null);
  const sugarRef = useRef(null);
  const coffeineRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const flavorRef = useRef(null);
  const navigate = useNavigate();
  const context = useMyContext();
  const addCoffe = (e) => {
    e.preventDefault();

    if (
      !typeRef.current.value.trim() ||
      !priceRef.current.value.trim() ||
      !sugarRef.current.value.trim() ||
      !coffeineRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !flavorRef.current.value.trim() ||
      !countryRef.current.value.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const newTask = {
      coffeType: typeRef.current.value,
      coffePrice: priceRef.current.value, // დოლარი //
      coffeSugar: sugarRef.current.value, // გრამობითაა //
      coffeine: coffeineRef.current.value,
      coffeDescription: descriptionRef.current.value,
      coffeCountry: countryRef.current.value,
      coffeFlavor: flavorRef.current.value,
    };
    fetch(`${API_URL}/coffe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newTask]), // Ensure correct JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Return JSON data
      })
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };
  const openIngredients = (e) => {
    e.preventDefault();
    context.setIngredientsPopup(true);
  };

  return (
    <div className={styles.create_main}>
      <AddIngredients />
      <div className={styles.add_product_main}>
        <h1>Add Product</h1>
        <div className={styles.create_div_container}>
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
                  <input type="number" ref={priceRef} />
                </label>
                <label>
                  <h2>Coffeine</h2>
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
                <h2>Select Flavor</h2>
                <FlavorSelect ref={flavorRef} />
              </label>
            </div>

            <div className={styles.add_button}>
              <BlueButton title={"Add Ingredients"} func={openIngredients} />
              <BlueButton title={"Add Coffe"} func={addCoffe} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
